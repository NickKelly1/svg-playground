import { a } from "./utils.js";

/**
 * @template T
 */
export class DoublyLinkedList {
  /** @protected @type {?LinkedListRef<T>} */ _ref;
  /** @type {number} */ size;

  constructor() {
    this._ref = null;
    this.size = 0;
  }

  /**
   * @param {T} value
   */
  push(value) {
    this.size += 1;
    const next = new DoublyLinkedListItem(value);
    if (!this._ref) {
      this._ref = {
        head: next,
        tail: next,
      };
      return;
    }
    this._ref.tail.next = next;
    next.prev = this._ref.tail;
  }

  /**
   * @returns {?T}
   */
  shift() {
    switch (this.size) {
      case 0: {
        return null;
      }
      case 1: {
        this.size -= 1;
        const head = a(this._ref).head;
        this._ref = null;
        return head.value;
      }
      default: {
        this.size -= 1;
        const head = a(this._ref).head;
        const nextHead = a(head.prev);
        nextHead.next = null;
        this._ref = {
          head: nextHead,
          tail: a(this._ref).tail,
        }
        return head.value;
      }
    }
  }

  /**
   * @returns {?T}
   */
  pop() {
    switch (this.size) {
      case 0: {
        return null;
      }
      case 1: {
        this.size -= 1;
        const tail = a(this._ref).tail;
        this._ref = null;
        return tail.value;
      }
      default: {
        this.size -= 1;
        const tail = a(this._ref).tail;
        const nextTail = a(tail.next);
        nextTail.next = null;
        this._ref = {
          head: a(this._ref).head,
          tail: nextTail,
        }
        return tail.value;
      }
    }
  }
}

/**
 * @typedef LinkedListRef
 * @property {DoublyLinkedListItem<T>} head
 * @property {DoublyLinkedListItem<T>} tail
 * 
 * @template T
 */

/**
 * @template T
 */
class DoublyLinkedListItem {
  /** @type {T} */ value;
  /** @type {?DoublyLinkedListItem<T>} */ next;
  /** @type {?DoublyLinkedListItem<T>} */ prev;

  /**
   * @param {T} value
   * @param {?DoublyLinkedListItem<T>} [next]
   * @param {?DoublyLinkedListItem<T>} [prev]
   */
  constructor(value, next, prev) {
    this.value = value;
    this.next = next || null;
    this.prev = prev || null;
  }
}