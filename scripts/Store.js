import { Item } from "./items/Item.js";

export class Store {
  /** @protected @readonly @type {Map<string, Item>} */ _items = new Map();
  /** @protected @readonly @type {Set<string>} */ _ids = new Set();

  /**
   * @returns {IterableIterator<Item>}
   */
  iterator() {
    return this._items.values();
  }

  /**
   * Add an item
   *
   * @param {Item} item
   */
  add(item) {
    this._items.set(item.id, item);
    this._ids.add(item.id);
  }

  /**
   * Remove all items
   */
  clear() {
    this._items.clear();
    this._ids.clear();
  }

  /**
   * Remove an item
   *
   * @param {string} id
   */
  remove(id) {
    this._items.delete(id);
    this._ids.delete(id);
  }
}
