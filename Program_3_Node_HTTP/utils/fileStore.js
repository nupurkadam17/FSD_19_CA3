/**
 * CLOSETÉ - Program 3 File Store Utility
 * Employs built-in Node.js 'fs' (fs.promises) and 'path' modules
 * for asynchronous, non-blocking file I/O operations.
 * Zero external libraries.
 */

const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'inventory.json');

/**
 * Asynchronously reads inventory records from data/inventory.json
 * @returns {Promise<Array>} Array of inventory items
 */
async function readInventory() {
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file does not exist, initialize empty array
      await writeInventory([]);
      return [];
    }
    throw new Error(`File System Read Failure: ${error.message}`);
  }
}

/**
 * Asynchronously writes inventory records to data/inventory.json
 * @param {Array} inventory - Updated records array
 * @returns {Promise<void>}
 */
async function writeInventory(inventory) {
  try {
    const serialized = JSON.stringify(inventory, null, 2);
    await fs.writeFile(DATA_FILE, serialized, 'utf8');
  } catch (error) {
    throw new Error(`File System Write Failure: ${error.message}`);
  }
}

/**
 * Finds an inventory item by ID
 */
async function findById(id) {
  const items = await readInventory();
  return items.find(item => item.id === id) || null;
}

/**
 * Appends a new inventory item
 */
async function insertItem(item) {
  const items = await readInventory();
  items.unshift(item);
  await writeInventory(items);
  return item;
}

/**
 * Updates an existing inventory item
 */
async function updateItem(id, updateData) {
  const items = await readInventory();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updateData,
    lastUpdated: new Date().toISOString()
  };

  await writeInventory(items);
  return items[index];
}

/**
 * Deletes an inventory item by ID
 */
async function deleteItem(id) {
  const items = await readInventory();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;

  const [removed] = items.splice(index, 1);
  await writeInventory(items);
  return removed;
}

module.exports = {
  readInventory,
  writeInventory,
  findById,
  insertItem,
  updateItem,
  deleteItem,
  DATA_FILE
};
