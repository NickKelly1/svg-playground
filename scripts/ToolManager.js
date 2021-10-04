import { MoveTool } from "./tools/MoveTool";
import { Tool } from "./tools/Tool";

export class ToolManager {
  /** @protected @readonly @type {MoveTool} */ _move;
  /** @protected @type {?Tool} */ _selected;

  /**
   * @param {MoveTool} move
   */
  constructor(move) {
    this._move = move;
  }
}