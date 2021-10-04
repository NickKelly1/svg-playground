import { CanvasContext } from "../CanvasContext.js";
import { DragHandler } from "../DragHandler.js";
import { Vec2 } from "../Vec2.js";

/**
 * @abstract
 */
export class Item {
  /** @readonly @type {string} */ id = Math.random().toString();

  /**
   * Draw the item
   * @abstract
   *
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    //
  }

  /**
   * @param {Vec2} position
   * @param {PointerEvent} evt
   * @returns {boolean|DragHandler}
   */
  onPointerDown(position, evt) {
    return false;
  }

  /**
   * Fired when this item is added to the canvas
   */
  onAdd() {
    //
  }

  /**
   * Fired when this tiem is removed from the canvas
   */
  onRemove() {
    //
  }
}

