import { Canvas } from '../Canvas.js';
import { Disposable } from '../Disposable.js';
import { DragHandler } from '../DragHandler.js';
import { EventBus } from '../EventBus.js';
import { Vec2 } from '../Vec2.js';
import { Tool } from './Tool.js';

export class MoveTool extends Tool {
  /** @protected @type {Canvas} */ _canvas;
  /** @protected @type {EventBus} */ _bus;
  /** @protected @type {?DragHandler} */ _handler;
  /** @protected @readonly {Disposable} */ _disposable;

  /**
   * @param {Canvas} canvas
   * @param {EventBus} bus
   */
  constructor(canvas, bus) {
    super();
    this._canvas = canvas;
    this._disposable = new Disposable();
    this._bus = bus;
  }

  /**
   * @override
   * @inheritdoc
   */
  open() {
    this._disposable.register(() => this
      ._bus
      .pointerDown$
      .on((position, evt) => this.onPointerDown(position, evt)));

    this._disposable.register(() => this
      ._bus
      .pointerDrag$
      .on((position, evt) => this.onPointerMove(position, evt)));

    this._disposable.register(() => this
      ._bus
      .pointerUp$
      .on((position, evt) => this.onPointerUp(position, evt)));
  }

  /**
   * @override
   * @inheritdoc
   */
  close() {
    this._disposable.dispose();
  }

  /**
   * @override
   * @param {Vec2} position
   * @param {PointerEvent} evt
   */
  onPointerDown(position, evt) {
    for (const item of this._canvas.items()) {
      // find the first item that grabs the handler
      const handler = item.onPointerDown(position, evt);
      if (handler === false) continue;
      if (handler === true) return;
      this._handler = handler;
      return;
    }
  }

  /**
   * @override
   * @param {Vec2} position 
   * @param {PointerEvent} evt 
   */
  onPointerUp(position, evt) {
    if (this._handler && this._handler.onStop) {
      this._handler.onStop(position, evt);
    }
    this._handler = null;
  }

  /**
   * @override
   * @param {Vec2} position 
   * @param {PointerEvent} evt 
   */
  onPointerMove(position, evt) {
    if (this._handler && this._handler.onDrag) {
      this._handler.onDrag(position, evt);
    }
  }
}