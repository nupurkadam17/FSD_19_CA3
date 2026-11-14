/**
 * CLOSETÉ - Program 3 Inventory Events & Stream Audit Utility
 * Demonstrates Node.js built-in EventEmitter and Writable Streams
 * to broadcast real-time stock notifications and append audit logs.
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs', 'inventory_audit.log');

// Create persistent append-only writable stream using built-in fs
const auditStream = fs.createWriteStream(LOG_FILE, { flags: 'a', encoding: 'utf8' });

class InventoryEventManager extends EventEmitter {
  constructor() {
    super();

    // Listener 1: Audit stream logger for every inventory mutation
    this.on('audit', (action, details) => {
      const timestamp = new Date().toISOString();
      const logLine = `[${timestamp}] [AUDIT] [${action.toUpperCase()}] ${JSON.stringify(details)}\n`;
      auditStream.write(logLine);
      console.log(`[StreamLogger] Logged to audit stream: ${action}`);
    });

    // Listener 2: Low-stock notification alert
    this.on('lowStockAlert', (item) => {
      const timestamp = new Date().toISOString();
      const alertLine = `[${timestamp}] [ALERT: LOW STOCK] SKU: ${item.sku} | "${item.name}" | Current: ${item.stock} | Threshold: ${item.reorderLevel}\n`;
      auditStream.write(alertLine);
      console.warn(`\x1b[33m[LOW STOCK WARNING]\x1b[0m ${item.name} (${item.sku}) is at ${item.stock} units! (Reorder level: ${item.reorderLevel})`);
    });

    // Listener 3: Stock update event
    this.on('stockUpdate', (item, delta) => {
      this.emit('audit', 'STOCK_ADJUSTMENT', {
        id: item.id,
        sku: item.sku,
        name: item.name,
        adjustment: delta,
        newStock: item.stock
      });

      if (item.stock <= item.reorderLevel) {
        this.emit('lowStockAlert', item);
      }
    });

    // Listener 4: Item creation event
    this.on('itemCreated', (item) => {
      this.emit('audit', 'ITEM_CREATED', {
        id: item.id,
        sku: item.sku,
        name: item.name,
        price: item.price,
        stock: item.stock
      });
    });

    // Listener 5: Item deletion event
    this.on('itemDeleted', (item) => {
      this.emit('audit', 'ITEM_DELETED', {
        id: item.id,
        sku: item.sku,
        name: item.name
      });
    });
  }
}

const inventoryEvents = new InventoryEventManager();

module.exports = {
  inventoryEvents,
  auditStream,
  LOG_FILE
};
