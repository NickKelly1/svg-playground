import { Canvas } from "./Canvas.js";
import { Item } from "./items/Item.js";
import { Publisher } from "./Publisher.js";
import { Vec2 } from "./Vec2.js";

export class EventBus {
  /** @readonly @type {Publisher<[item: Item]>} */ itemAdded$ = new Publisher();
  /** @readonly @type {Publisher<[item: Item]>} */ itemRemoved$ = new Publisher();
  /** @readonly @type {Publisher<[canvas: Canvas]>} */ canvasResize$ = new Publisher();

  /** @readonly @type {Publisher<[position: Vec2, evt: PointerEvent]>} */ pointerDown$ = new Publisher();
  /** @readonly @type {Publisher<[position: Vec2, evt: PointerEvent]>} */ pointerDrag$ = new Publisher();
  /** @readonly @type {Publisher<[position: Vec2, evt: PointerEvent]>} */ pointerUp$ = new Publisher();
}
