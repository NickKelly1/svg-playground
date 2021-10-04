import { CanvasContext } from "./CanvasContext.js";
import { EventBus } from "./EventBus.js";
import { Item } from "./items/Item.js";
import { Store } from "./Store.js";
import { a, $ } from "./utils.js";
import { Vec2 } from "./Vec2.js";

export class Canvas {
  /**
   * Resize the canvas width and height to fix dpi issues
   *
   * @see https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
   *
   * @param {HTMLCanvasElement} element
   * @protected
   */
  static _resizeCanvas(element) {
    const dpi = globalThis.devicePixelRatio;
    const nextHeight = dpi * Number(globalThis
      .getComputedStyle(element)
      .getPropertyValue('height')
      // remove ending px
      .slice(0, -2));
    const nextWidth = dpi * Number(globalThis
      .getComputedStyle(element)
      .getPropertyValue('width')
      // remove ending px
      .slice(0, -2));
    element.setAttribute('height', nextHeight.toString());
    element.setAttribute('width', nextWidth.toString());
    console.debug(`[${this.constructor.name}::_resize] resizing to ${nextWidth}, ${nextHeight}`);
  }

  /** @readonly @protected @type {EventBus} */ _bus;
  /** @protected @type {?ResizeObserver} */ _resizeObserver;
  /** @readonly @type {Store} */ _store;
  /** @type {?number} */ _animationFrame;
  /** @readonly @type {HTMLCanvasElement} */ elem;
  /** @protected @type {number} */ _relToAbsHeight;
  /** @protected @type {number} */ _relToAbsWidth;
  /** @readonly @type {CanvasContext} */ ctx;

  /**
   * @param {EventBus} bus
   * @param {Store} store
   * @param {HTMLCanvasElement} element
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(bus, store, element, ctx) {
    this._bus = bus;
    this._store = store;
    this._resizeObserver = null;
    this._animationFrame = null;
    this.elem = element;
    this.ctx = new CanvasContext(this, ctx);
    this._recache();
    this._draw = this._draw.bind(this);
  }

  /**
   * Watch for changes
   */
  watch() {
    // watch for resizes
    this._resizeObserver = new ResizeObserver(() => {
      console.debug(`[${this.constructor.name}::watch::ResizeObserver] resizing`);
      Canvas._resizeCanvas(this.elem);
      this._recache();
      this.draw();
    });
    Canvas._resizeCanvas(this.elem);
    this._resizeObserver.observe(this.elem);

    // watch for pointer downs
    this.elem.addEventListener('pointerdown', handleDown);

    const self = this;
    /** @param {PointerEvent} eDown */
    function handleDown(eDown) {
      const pDown = Vec2.onCanvas(eDown, self.elem);
      self._bus.pointerDown$.dispatch(pDown, eDown);
      const body = a($('body'));
      body.addEventListener('pointermove', handleMove);
      body.addEventListener('pointerleave', handleLeave);
      body.addEventListener('pointerup', handleUp);

      function stop() {
        body.removeEventListener('pointermove', handleMove);
        body.removeEventListener('pointerleave', handleLeave);
        body.removeEventListener('pointerup', handleUp);
      }

      /** @param {PointerEvent} eMove */
      function handleMove(eMove) {
        const pMove = Vec2.onCanvas(eMove, self.elem);
        self._bus.pointerDrag$.dispatch(pMove, eMove);
      }

      /** @param {PointerEvent} eUp */
      function handleUp(eUp) {
        stop();
        const pUp = Vec2.onCanvas(eUp, self.elem);
        self._bus.pointerUp$.dispatch(pUp, eUp);
      }

      /** @param {PointerEvent} eLeave */
      function handleLeave(eLeave) {
        stop();
        const pLeave = Vec2.onCanvas(eLeave, self.elem);
        self._bus.pointerUp$.dispatch(pLeave, eLeave);
      }
    }
  }

  /**
   * Refresh width and height modifiers
   */
  _recache() {
    this._relToAbsWidth = this.elem.width / 100;
    this._relToAbsHeight = this.elem.height / 100;
  }

  /**
   * Convert a relative radius to an absolute radius
   *
   * @param {number} rin 
   * @returns {number}
   */
  absR(rin) {
    return rin * (this._relToAbsHeight + this._relToAbsHeight) / 2
  }

  /**
   * Convert a relative radius to an absolute radius
   *
   * @param {*} rin 
   */
  relR(rin) {
    return rin * 2 / (this._relToAbsHeight + this._relToAbsHeight);
  }

  /**
   * Convert a relative x position to an absolute x position
   *
   * @param {number} xin
   * @returns {number}
   */
  absX(xin) {
    return xin * this._relToAbsWidth;
  }

  /**
   * Convert an absolute x position to an relative x position
   *
   * @param {number} xin
   * @returns {number}
   */
  relX(xin) {
    return xin / this._relToAbsWidth;
  }

  /**
   * Convert a relative y position to an absolute y position
   *
   * @param {number} yin
   * @returns {number}
   */
  absY(yin) {
    return yin * this._relToAbsHeight;
  }

  /**
   * Convert a absolute y position to an relative y position
   *
   * @param {number} yin
   * @returns {number}
   */
  relY(yin) {
    return yin / this._relToAbsHeight;
  }

  /**
   * Add an item to the canvas
   * 
   * @param {Item} item
   */
  add(item) {
    this._store.add(item);
    this.draw();
  }

  /**
   * Remove an item from the canvas
   * 
   * @param {string} id
   */
  remove(id) {
    this._store.remove(id);
    this.draw();
  }

  /**
   * Remove all items from the canvas
   */
  clear() {
    this._store.clear();
    this.draw();
  }

  /**
   * Stop drawing
   *
   * @returns
   */
  stop() {
    // nothing to stop?
    if (this._animationFrame === null) return;
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = null;
  }

  /**
   * Request to draw everything to the canvas
   *
   * @returns
   */
  draw() {
    console.log('called draw()', this._animationFrame);
    // already drawing?
    if (this._animationFrame !== null) return;
    // do draw
    this._animationFrame = requestAnimationFrame(this._draw);
  }

  /**
   * Get items on the canvas
   *
   * @returns {IterableIterator<Item>}
   */
  items() {
    return this._store.iterator();
  }

  /**
   * Draw everything to the canvas
   *
   * @protected
   */
  _draw() {
    const start = performance.now();
    this._animationFrame = null;
    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
    for (const item of this._store.iterator()) {
      item.draw(this.ctx);
    }
    const end = performance.now();
    console.debug(`[${Canvas.name}::_draw] took ${(end - start).toFixed(2)}ms`)
  }

  /**
   * Create a Vec2
   *
   * @param {number} x
   * @param {number} y
   */
  vec2(x, y) {
    return new Vec2(x, y);
  }
}
