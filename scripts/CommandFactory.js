import { EventBus } from "./EventBus.js";
import { Item } from "./items/Item.js";
import { AddItemCommand } from "./commands/AddItemCommand.js";
import { RemoveItemCommand } from "./commands/RemoveItemCommand.js";
import { Canvas } from "./Canvas.js";
import { CustomCommand } from "./commands/CustomCommand.js";

/** @typedef {import('./commands/CustomCommand').CustomCommandOptions} CustomCommandOptions */

export class CommandFactory {
  /** @protected @readonly @type {Canvas} */ _canvas;
  /** @protected @readonly @type {EventBus} */ _bus;

  /**
   * @param {Canvas} canvas
   * @param {EventBus} bus
   */
  constructor(canvas, bus) {
    this._canvas = canvas;
    this._bus = bus;
  }

  /**
   * @param {Item} item
   * @returns {AddItemCommand}
   */
  addItem(item) {
    return new AddItemCommand(this._canvas, this._bus, item);
  }

  /**
   * @param {Item} item
   * @returns {RemoveItemCommand}
   */
  removeItem(item) {
    return new RemoveItemCommand(this._canvas, this._bus, item);
  }

  /**
   * @param {CustomCommandOptions} options
   */
  custom(options) {
    return new CustomCommand(options);
  }
}