import { DoublyLinkedList } from "./DoublyLinkedList.js";
import { a } from "./utils.js";

/**
 * @template T
 */
export class Queue {
  /** @type {DoublyLinkedList<T>} */ list;

  constructor() {
    this.list = new DoublyLinkedList();
  }

  /**
   * @param {T} item
   */
  enqueue(item) {
    this.list.push(item);
  }

  /**
   * @returns {?T}
   */
  dequeue() {
    const item = this.list.shift();
    return item;
  }

  /**
   * @returns {T[]}
   */
  flush() {
    /** @type {T[]} */
    const items = [];
    while (this.list.size > 0) {
      items.push(a(this.list.shift()));
    }
    return items;
  }
}