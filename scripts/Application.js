import { Store } from "./Store.js";
import { DrawingContext } from "./Context.js";
import { EventBus } from "./EventBus.js";
import { Canvas } from "./Canvas.js";
import { $, a } from "./utils.js";
import { CommandFactory } from "./CommandFactory.js";
import { HistoryManager } from "./HistoryManager.js";
import { ItemFactory } from "./ItemFactory.js";
import { ToolColor } from "./Color.js";

export class Application {
  /** @type {Store} */ store;
  /** @type {DrawingContext} */ context;
  /** @type {HistoryManager} */ history;
  /** @type {EventBus} */ bus;
  /** @type {Canvas} */ canvas;
  /** @type {ToolColor} */ color;
  /** @type {CommandFactory} */ commands;
  /** @type {ItemFactory} */ items;

  constructor() {
    this.store = new Store();
    this.context = new DrawingContext();
    this.history = new HistoryManager();
    this.bus = new EventBus();
    this.color = new ToolColor();

    const canvasElem = a($('canvas'));
    const ctx = a(canvasElem.getContext('2d'));
    this.canvas = new Canvas(this.bus, this.store, canvasElem, ctx);
    this.canvas.watch();

    this.commands = new CommandFactory(this.canvas, this.bus);
    this.items = new ItemFactory(this.color, this.history, this.canvas, this.commands);
  }
}
