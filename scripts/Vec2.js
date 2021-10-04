import { Canvas } from "./Canvas.js";
import { EventBus } from "./EventBus.js";

export class Vec2 {
  /**
   * Get the position on the canvas
   *
   * @param {MouseEvent | PointerEvent} evt
   * @param {HTMLCanvasElement} canvas
   * @returns {Vec2}
   */
  static onCanvas(evt, canvas) {
    const x = evt.pageX - canvas.offsetLeft;
    const y = evt.pageY - canvas.offsetTop;
    const vec = Vec2.xy(x, y);
    return vec;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {Vec2}
   */
  static xy(x, y) {
    return new Vec2(x, y);
  }

  /** @type {number} */ x;
  /** @type {number} */ y;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  /**
   * @param {Vec2} position 
   * @returns {boolean}
   */
  eq(position) {
    return this.x === position.x
      && this.y === position.y;
  }
}
