const { EventBus } = require("../EventBus");
const { Command } = require("./Command");

class BatchCommand extends Command {
  /** @protected @readonly @type {Store} */ _store;
  /** @protected @readonly @type {EventBus} */ _bus;

  /**
   * @param {Store} store
   * @param {EventBus} bus
   */
  constructor(store, bus) {
    super();
    this._history = history;
    this._store = store;
    this._bus = bus;
  }
}
