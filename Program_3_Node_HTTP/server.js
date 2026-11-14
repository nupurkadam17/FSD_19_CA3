/**
 * CLOSETÉ - Program 3 Native Node.js Inventory Management Server
 * Academic concepts: Pure built-in modules ('http', 'fs', 'path', 'events', 'stream'). Zero Express.
 */
const http = require('http');
const { readInventory, findById, insertItem, updateItem, deleteItem } = require('./utils/fileStore');
const { inventoryEvents } = require('./utils/inventoryEvents');

const PORT = process.env.PORT || 5001;

// Standard JSON response helper
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Request stream buffer parser
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body.trim() ? JSON.parse(body) : {}); }
      catch (e) { reject(new Error('Malformed JSON')); }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const { pathname } = url;
  const method = req.method;

  console.log(`[HTTP INVENTORY ROUTER] ${method} ${pathname}`);

  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  try {
    // 0. Root Dashboard
    if (pathname === '/' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      return res.end(`
        <body style="font-family:sans-serif; background:#0A0A0A; color:#FFF; text-align:center; padding:60px;">
          <div style="max-width:540px; margin:0 auto; background:#1C1C1C; padding:32px; border:1px solid #333;">
            <h1 style="letter-spacing:0.15em;">CLOSETÉ</h1>
            <p style="color:#888;">Program 3: Node.js Inventory Utility (Built-in HTTP, fs, events, stream)</p>
            <div style="margin:24px 0;">
              <a href="/api/inventory" style="color:#C5A880; margin:0 8px;">GET /api/inventory</a> |
              <a href="/api/inventory/low-stock" style="color:#C5A880; margin:0 8px;">GET /api/inventory/low-stock</a>
            </div>
          </div>
        </body>
      `);
    }

    // 1. GET /api/inventory
    if (pathname === '/api/inventory' && method === 'GET') {
      const items = await readInventory();
      const cat = url.searchParams.get('category');
      const filtered = cat ? items.filter(i => i.category.toLowerCase() === cat.toLowerCase()) : items;
      return sendJson(res, 200, { status: 'success', total: filtered.length, data: filtered });
    }

    // 2. GET /api/inventory/low-stock
    if (pathname === '/api/inventory/low-stock' && method === 'GET') {
      const items = await readInventory();
      const lowStock = items.filter(i => i.stock <= (i.reorderLevel || 5));
      return sendJson(res, 200, {
        status: 'success',
        alert: lowStock.length ? 'ATTENTION: Items require replenishment.' : 'Stock healthy.',
        count: lowStock.length,
        data: lowStock
      });
    }

    // Match item routes /api/inventory/:id
    const idMatch = pathname.match(/^\/api\/inventory\/([A-Za-z0-9_-]+)$/);
    const stockMatch = pathname.match(/^\/api\/inventory\/([A-Za-z0-9_-]+)\/stock$/);

    // 3. GET /api/inventory/:id
    if (idMatch && method === 'GET') {
      const item = await findById(idMatch[1]);
      if (!item) return sendJson(res, 404, { status: 'error', message: 'Item not found.' });
      return sendJson(res, 200, { status: 'success', data: item });
    }

    // 4. POST /api/inventory (Add garment)
    if (pathname === '/api/inventory' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.category || body.stock === undefined) {
        return sendJson(res, 400, { status: 'error', message: 'name, category, and stock are required.' });
      }
      const newItem = {
        id: `INV-${Date.now().toString().slice(-4)}`,
        sku: `CLO-${body.category.slice(0,3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
        name: body.name,
        category: body.category,
        price: Number(body.price) || 4990,
        stock: Number(body.stock),
        reorderLevel: Number(body.reorderLevel) || 5,
        sizes: body.sizes || ['S', 'M', 'L'],
        updatedAt: new Date().toISOString()
      };
      await insertItem(newItem);
      inventoryEvents.emit('itemCreated', newItem);
      return sendJson(res, 201, { status: 'success', message: 'Garment added to inventory.', data: newItem });
    }

    // 5. PUT /api/inventory/:id/stock (Adjust stock level)
    if (stockMatch && method === 'PUT') {
      const id = stockMatch[1];
      const body = await parseBody(req);
      if (body.adjustment === undefined && body.newStock === undefined) {
        return sendJson(res, 400, { status: 'error', message: 'Specify adjustment or newStock.' });
      }
      const existing = await findById(id);
      if (!existing) return sendJson(res, 404, { status: 'error', message: 'Item not found.' });

      const oldStock = existing.stock;
      const updatedStock = body.newStock !== undefined ? Number(body.newStock) : existing.stock + Number(body.adjustment);
      if (updatedStock < 0) return sendJson(res, 400, { status: 'error', message: 'Stock cannot be negative.' });

      const updated = await updateItem(id, { stock: updatedStock, updatedAt: new Date().toISOString() });
      inventoryEvents.emit('stockUpdate', updated, updatedStock - oldStock);
      return sendJson(res, 200, { status: 'success', data: updated });
    }

    // 6. DELETE /api/inventory/:id
    if (idMatch && method === 'DELETE') {
      const removed = await deleteItem(idMatch[1]);
      if (!removed) return sendJson(res, 404, { status: 'error', message: 'Item not found.' });
      inventoryEvents.emit('itemDeleted', removed);
      return sendJson(res, 200, { status: 'success', message: 'Item deleted.', data: removed });
    }

    // 404 fallback
    sendJson(res, 404, { status: 'error', message: `Cannot ${method} ${pathname}` });
  } catch (err) {
    sendJson(res, 500, { status: 'error', message: err.message });
  }
});

if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`CLOSETÉ - Program 3 Native HTTP Server running on http://127.0.0.1:${PORT}`);
  });
}

module.exports = server;
