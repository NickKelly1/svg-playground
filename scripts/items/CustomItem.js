import { CanvasContext } from "../CanvasContext.js";
import { Item } from "./Item.js";

export class CustomItem extends Item {
  /** @type {((ctx: CanvasContext) => void)} */ _draw;

  /**
   * @param {((ctx: CanvasContext) => void)} draw
   */
  constructor(draw) {
    super();
    this._draw = draw;
  }

  /**
   * @override
   * @param {CanvasContext} ctx
   */
  draw(ctx) {
    this._draw(ctx);
  }
}
