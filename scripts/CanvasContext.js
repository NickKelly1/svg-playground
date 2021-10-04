import { Canvas } from "./Canvas.js";

/**
 * Converts absolute coordinates to relative (%100) coordinates
 */
export class CanvasContext {
  /** @protected @readonly @type {Canvas} */ _canvas;
  /** @protected @readonly @type {CanvasRenderingContext2D} */ _value;

  /**
   * @param {Canvas} canvas
   * @param {CanvasRenderingContext2D} value
   */
  constructor(canvas, value) {
    this._canvas = canvas;
    this._value = value;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {void}
   */
  moveTo(x, y) {
    this._value.moveTo(this._canvas.absX(x), this._canvas.absX(y));
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {void}
   */
  lineTo(x, y) {
    return this._value.lineTo(this._canvas.absX(x), this._canvas.absX(y));
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} radius 
   * @param {number} startAngle 
   * @param {number} endAngle 
   * @param {boolean} [counterclockwise] 
   * @returns {void}
   */
  arc(x, y, radius, startAngle, endAngle, counterclockwise) {
    return this._value.arc(
      this._canvas.absX(x),
      this._canvas.absX(y),
      this._canvas.absR(radius),
      startAngle,
      endAngle,
      counterclockwise,
    );
  }

  /**
   * 
   * @param {number} x1 
   * @param {number} y1 
   * @param {number} x2 
   * @param {number} y2 
   * @param {number} radius 
   * @returns {void}
   */
  arcTo(x1, y1, x2, y2, radius) {
    return this._value.arcTo(
      this._canvas.absX(x1),
      this._canvas.absY(y1),
      this._canvas.absX(x2),
      this._canvas.absY(y2),
      this._canvas.absR(radius),
    );
  }

  /**
   * 
   * @param {number} cp1x 
   * @param {number} cp1y 
   * @param {number} cp2x 
   * @param {number} cp2y 
   * @param {number} x 
   * @param {number} y 
   * @returns {void}
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    return this._value.bezierCurveTo(
      this._canvas.absX(cp1x),
      this._canvas.absY(cp1y),
      this._canvas.absX(cp2x),
      this._canvas.absY(cp2y),
      this._canvas.absX(x),
      this._canvas.absY(y),
    );
  }

  /**
   * @returns {void}
   */
  closePath() {
    return this._value.closePath();
  }

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} radiusX 
   * @param {number} radiusY 
   * @param {number} rotation 
   * @param {number} startAngle 
   * @param {number} endAngle 
   * @param {boolean} [counterclockwise] 
   */
  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise) {
    return this._value.ellipse(
      this._canvas.absX(x),
      this._canvas.absY(y),
      this._canvas.absX(radiusX),
      this._canvas.absY(radiusY),
      rotation,
      startAngle,
      endAngle,
      counterclockwise,
    );
  }

  /**
   * @param {number} cpx 
   * @param {number} cpy 
   * @param {number} x 
   * @param {number} y 
   * @returns {void}
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    return this._value.quadraticCurveTo(
      this._canvas.absX(cpx),
      this._canvas.absY(cpy),
      this._canvas.absX(x),
      this._canvas.absY(y),
    )
  }

  /**
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   * @returns {void}
   */
  rect(x, y, w, h) {
    return this._value.rect(
      this._canvas.absX(x),
      this._canvas.absY(y),
      this._canvas.absX(w),
      this._canvas.absY(h),
    )
  }

  /**
   * @returns {void}
   */
  beginPath() {
    return this._value.beginPath();
  }

  /**
   * @returns {void}
   */
  stroke() {
    return this._value.stroke();
  }

  /** @type {string | CanvasGradient | CanvasPattern} */
  get fillStyle() { return this._value.fillStyle; }

  /** @type {string | CanvasGradient | CanvasPattern} */
  set fillStyle(value) { this._value.fillStyle = value; }

  /** @type {string | CanvasGradient | CanvasPattern} */
  get strokeStyle() { return this._value.strokeStyle; }

  /** @type {string | CanvasGradient | CanvasPattern} */
  set strokeStyle(value) { this._value.strokeStyle = value; }

  /**
   * @param {number} x0 
   * @param {number} y0 
   * @param {number} x1 
   * @param {number} y1 
   * @returns {CanvasGradient}
   */
  createLinearGradient(x0, y0, x1, y1) {
    return this._value.createLinearGradient(
      this._canvas.absX(x0),
      this._canvas.absY(y0),
      this._canvas.absX(x1),
      this._canvas.absY(y1),
    );
  }

  /**
   * @param {number} x0
   * @param {number} y0
   * @param {number} r0
   * @param {number} x1
   * @param {number} y1
   * @param {number} r1
   * @returns {CanvasGradient}
   */
  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return this._value.createRadialGradient(
      this._canvas.absX(x0),
      this._canvas.absY(y0),
      this._canvas.absR(r0),
      this._canvas.absX(x1),
      this._canvas.absY(y1),
      this._canvas.absR(r1),
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @returns {void}
   */
  clearRect(x, y, w, h) {
    return this._value.clearRect(
      this._canvas.absX(x),
      this._canvas.absY(y),
      this._canvas.absX(w),
      this._canvas.absY(h),
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @returns {void}
   */
  fillRect(x, y, w, h) {
    return this._value.fillRect(
      this._canvas.absX(x),
      this._canvas.absY(y),
      this._canvas.absX(w),
      this._canvas.absY(h),
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @returns {void}
   */
  strokeRect(x, y, w, h) {
    return this._value.strokeRect(
      this._canvas.absX(x),
      this._canvas.absY(y),
      this._canvas.absX(w),
      this._canvas.absY(h),
    );
  }
}