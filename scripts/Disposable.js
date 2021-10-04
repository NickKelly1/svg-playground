/**
 * @typedef {() => void} Cleanup
 */

export class Disposable {
  /** @protected @readonly @type {Set<Cleanup>} */ _onCleanup;

  constructor() {
    this._onCleanup = new Set();
  }

  /**
   * Register a new cleanup function
   *
   * @param {Cleanup} onCleanup
   */
  register(onCleanup) {
    this._onCleanup.add(onCleanup);
  }

  /**
   * Dispose of the object
   */
  dispose() {
    this._onCleanup.forEach((cleanup) => cleanup());
  }
}