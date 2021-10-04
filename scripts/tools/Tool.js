import { DrawingContext } from "../Context";
import { Vec2 } from "../Vec2";

export class Tool {
  /**
   * Fired when the tool opens
   */
  open() {
    //
  }

  /**
   * Fired when the tool closes
   */
  close() {
    //
  }

  /**
   * @param {Vec2} position
   * @param {PointerEvent} evt
   */
  onPointerDown(position, evt) {
    //
  }

  /**
   * 
   * @param {Vec2} position 
   * @param {PointerEvent} evt 
   */
  onPointerUp(position, evt) {
    //
  }

  /**
   * @param {Vec2} position 
   * @param {PointerEvent} evt 
   */
  onPointerMove(position, evt) {
    //
  }
}