/**
 * @typedef {((...values: [...T]) => void)} Subscriber
 * @template {[...any]} T
 */

/**
 * @typedef {() => void} Unsubscribe
 */


/**
 * @template {[...any]} T
 */
export class Publisher {
  /** @protected @readonly @type {Set<(Subscriber<T>)>} */
  _subscribers = new Set();

  /** @protected @readonly @type {Map<Subscriber<T>, Subscriber<T>>} */
  _onceMap = new Map();

  /**
   * @param {[...T]} values
   * @returns {void}
   */
  dispatch(...values) {
    for (const subscriber of this._subscribers) {
      subscriber(...values);
    }
  }

  /**
   * @param {Subscriber<T>} subscriber 
   * @returns {() => void}
   */
  on(subscriber) {
    this._subscribers.add(subscriber);
    const self = this;
    function off() { return self.off(subscriber) };
    return off;
  }

  /**
   * @param {Subscriber<T>} subscriber 
   * @returns {Unsubscribe}
   */
  once(subscriber) {
    this._subscribers.add(subscriber);
    const self = this;
    function off() { return self.off(once) };
    /** @type {Subscriber<T>} */
    function once(...values) {
      off();
      subscriber(...values);
    }
    this._onceMap.set(subscriber, once);
    return off;
  }

  /**
   * @param {Subscriber<T>} listener 
   * @returns {void}
   */
  off(listener) {
    this._subscribers.delete(listener);
    if (this._onceMap.has(listener)) {
      /** @type {*} */
      const once = this._onceMap.get(listener);
      this._subscribers.delete(once);
      this._onceMap.delete(listener);
    }
  }
}
