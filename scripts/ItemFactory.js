import { Canvas } from "./Canvas.js";
import { CanvasContext } from "./CanvasContext.js";
import { ToolColor } from "./Color.js";
import { CommandFactory } from "./CommandFactory.js";
import { HistoryManager } from "./HistoryManager.js";
import { BezierCurve } from "./items/BezierCurve.js";
import { CustomItem } from "./items/CustomItem.js";
import { Style } from "./Stype.js";
import { Vec2 } from "./Vec2.js";

export class ItemFactory {
  /** @protected @readonly @type {ToolColor} */ _color;
  /** @protected @readonly @type {HistoryManager} */ _history;
  /** @protected @readonly @type {Canvas} */ _canvas;
  /** @protected @readonly @type {CommandFactory} */ _commands;

  /**
   * @param {ToolColor} color
   * @param {HistoryManager} history
   * @param {Canvas} canvas
   * @param {CommandFactory} commands
   */
  constructor(color, history, canvas, commands) {
    this._color = color;
    this._history = history;
    this._canvas = canvas;
    this._commands = commands;
  }

  /**
   * @param {((ctx: CanvasContext) => void)} _draw 
   * @returns 
   */
  custom(_draw) {
    return new CustomItem(_draw);
  }

  /**
   * @param {Vec2} from
   * @param {Vec2} cp1
   * @param {Vec2} cp2
   * @param {Vec2} to
   * @param {?Style} [style]
   */
  bezierCurve(from, cp1, cp2, to, style) {
    const _style = style || new Style();
    if (!_style.stroke) _style.stroke = this._color.primary;
    if (!_style.fill) _style.fill = this._color.secondary;
    return new BezierCurve(
      this._history,
      this._canvas,
      this._commands,
      from,
      cp1,
      cp2,
      to,
      _style
    );
  }
}