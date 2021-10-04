import { Canvas } from "../Canvas.js";
import { EventBus } from "../EventBus.js";
import { Item } from "../items/Item.js";
import { Store } from "../Store.js";
import { Command } from "./Command.js";

export class AddItemCommand extends Command {
  /** @protected @readonly @type {Canvas} */ _canvas;
  /** @protected @readonly @type {EventBus} */ _bus;
  /** @protected @readonly @type {Item} */ _item;

  /**
   * @param {Canvas} canvas
   * @param {EventBus} bus
   * @param {Item} item
   */
  constructor(canvas, bus, item) {
    super();
    this._canvas = canvas;
    this._bus = bus;
    this._item = item;
  }

  /**
   * @override
   * @inheritdoc
   */
  apply() {
    this._canvas.add(this._item);
  }

  /**
   * @override
   * @inheritdoc
   */
  unapply() {
    this._canvas.remove(this._item.id);
  }

  /**
   * @override
   * @inheritdoc
   */
  afterCommit() {
    this._bus.itemAdded$.dispatch(this._item);
  }
}
