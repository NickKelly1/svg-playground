import { Canvas } from "../Canvas.js";
import { CanvasContext } from "../CanvasContext.js";
import { CommandFactory } from "../CommandFactory.js";
import { DragHandler } from "../DragHandler.js";
import { HistoryManager } from "../HistoryManager.js";
import { Observable } from "../Observable.js";
import { Style } from "../Stype.js";
import { Vec2 } from "../Vec2.js";
import { Item } from "./Item.js";

export class BezierCurve extends Item {
  /** @type {Observable<Vec2>} */ from
  /** @type {Observable<Vec2>} */ cp1
  /** @type {Observable<Vec2>} */ cp2
  /** @type {Observable<Vec2>} */ to
  /** @type {Style} */ style

  /** @protected @readonly @type {HistoryManager} */ _history;
  /** @protected @readonly @type {Canvas} */ _canvas;
  /** @protected @readonly @type {CommandFactory} */ _commands;
  /** @protected @type {Observable<Handle>} */ _fromGrab;
  /** @protected @type {Observable<HandleBar>} */ _cp1Grab;
  /** @protected @type {Observable<HandleBar>} */ _cp2Grab;
  /** @protected @type {Observable<Handle>} */ _toGrab;

  /**
   * @param {HistoryManager} history 
   * @param {Canvas} canvas 
   * @param {CommandFactory} commands 
   * @param {Vec2} from 
   * @param {Vec2} cp1 
   * @param {Vec2} cp2 
   * @param {Vec2} to 
   * @param {Style} style 
   */
  constructor(
    history,
    canvas,
    commands,
    from,
    cp1,
    cp2,
    to,
    style,
  ) {
    super();
    this._history = history;
    this._canvas = canvas;
    this._commands = commands;
    this.from = new Observable(from);
    this.cp1 = new Observable(cp1);
    this.cp2 = new Observable(cp2);
    this.to = new Observable(to);
    this.style = style;

    this._fromGrab = Observable.from(
      () => new Handle(2, this.from.value),
      [this.from, this.cp1],
    );
    this._cp1Grab = Observable.from(
      () => new HandleBar(this.from.value, this.cp1.value, 2),
      [this.from, this.cp1],
    );
    this._cp2Grab = Observable.from(
      () => new HandleBar(this.to.value, this.cp2.value, 2),
      [this.to, this.cp2],
    );
    this._toGrab = Observable.from(
      () => new Handle(2, this.to.value),
      [this.to, this.cp2],
    );
  }


  /**
   * @override
   * @param {Vec2} position
   * @param {PointerEvent} evt
   * @returns {boolean | DragHandler}
   */
  onPointerDown(position, evt) {
    if (this._fromGrab.value.contains(position)) {
      return new DragHandler({
        onDrag: (position) => {
          this.from.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
        onStop: (position) => {
          this.from.set(new Vec2(position.x, position.y));
          this._canvas.draw();
          // this._history.commit()
        },
      });
    }

    if (this._cp1Grab.value.contains(position)) {
      return new DragHandler({
        onDrag: (position) => {
          this.cp1.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
        onStop: (position) => {
          this.cp1.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
      });
    }

    if (this._cp2Grab.value.contains(position)) {
      return new DragHandler({
        onDrag: (position) => {
          this.cp2.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
        onStop: (position) => {
          this.cp2.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
      });
    }

    if (this._toGrab.value.contains(position)) {
      return new DragHandler({
        onDrag: (position) => {
          this.to.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
        onStop: (position) => {
          this.to.set(new Vec2(position.x, position.y));
          this._canvas.draw();
        },
      });
    }

    return false;
  }

  /**
   * @override
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.from.value.x, this.from.value.y);
    ctx.bezierCurveTo(
      this.cp1.value.x,
      this.cp1.value.y,
      this.cp2.value.x,
      this.cp2.value.y,
      this.to.value.x,
      this.to.value.y,
    );
    if (this.style.stroke) ctx.strokeStyle = this.style.stroke;
    if (this.style.fill) ctx.fillStyle = this.style.fill;
    ctx.stroke();

    this._fromGrab.value.draw(ctx);
    this._cp1Grab.value.draw(ctx);
    this._cp2Grab.value.draw(ctx);
    this._toGrab.value.draw(ctx);
  }
}

class HandleBar {
  /** @type {Handle} */ handle;
  /** @type {Bar} */ bar;

  /**
   * 
   * @param {Vec2} from 
   * @param {Vec2} to 
   * @param {number} radius 
   */
  constructor(from, to, radius) {
    this.handle = new Handle(radius, to);

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(dy, dx);
    const cutx = to.x - (radius * Math.cos(angle));
    const cuty = to.y - (radius * Math.sin(angle));
    this.bar = new Bar(from, new Vec2(cutx, cuty));
  }

  /**
   * @param {Vec2} position 
   */
  contains(position) {
    return this.handle.contains(position);
  }

  /**
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    this.handle.draw(ctx);
    this.bar.draw(ctx);
  }
}

class Bar {
  /** @protected @type {Vec2} */ from;
  /** @protected @type {Vec2} */ to;

  /**
   * @param {Vec2} from 
   * @param {Vec2} to 
   */
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  /**
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }
}

class Handle {
  /** @protected @type {number} */ radius;
  /** @protected @type {Vec2} */ center;

  /**
   * @param {number} radius 
   * @param {Vec2} center 
   */
  constructor(radius, center) {
    this.center = center;
    this.radius = radius;
  }

  /**
   * @param {Vec2} position 
   */
  contains(position) {
    return this.radius > Math.sqrt(
      (this.center.x - position.x) ** 2
      + (this.center.y - position.y) ** 2
    );
  }

  /**
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.center.x,
      this.center.y,
      this.radius,
      0,
      2 * Math.PI,
    );
    ctx.stroke();
  }
}
