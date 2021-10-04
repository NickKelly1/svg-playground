import { Vec2 } from "./Vec2.js";

export class DragHandler {
   /** @type {?((position: Vec2, evt: PointerEvent) => void)} */ onDrag;
   /** @type {?((position: Vec2, evt: PointerEvent) => void)} */ onStop;

  /**
   * @param {DragHandlerOptions} options
   *
   * @typedef DragHandlerOptions
   * @property {?((position: Vec2, evt: PointerEvent) => void)} [onDrag]
   * @property {?((position: Vec2, evt: PointerEvent) => void)} [onStop]
   */
  constructor(options) {
    const {
      onDrag,
      onStop,
    } = options;

    this.onDrag = onDrag || null;
    this.onStop = onDrag || null;
  }
}