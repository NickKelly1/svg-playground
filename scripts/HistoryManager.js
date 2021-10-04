import { Command } from "./commands/Command.js";
import { History } from "./History.js";

export class HistoryManager {
  /** @protected @readonly @type {History[]} */ _stack = [];

  constructor() {
    //
  }

  /**
   * Dispatch an action after the current history action completes
   *
   * @param {() => void} action
   */
  dispatch(action) {
    const history = this._last();
    history.dispatch(action);
  }

  /**
   * @protected
   * @returns {History}
   */
  _last() {
    if (this._stack.length !== 0) {
      return this._stack[this._stack.length - 1];
    }
    const last = new History();
    this._stack.push(last);
    return last;
  }

  /**
   * Commit an action
   * @param {Command} command
   */
  commit(command) {
    console.debug(`[HistoryManager::commit]`);
    const history = this._last();
    history.commit(command);
  }

  /**
   * Undo the last action
   */
  undo() {
    console.debug(`[HistoryManager::undo]`);
    const history = this._last();
    history.undo();
  }

  /**
   * Redo the last undone action
   */
  redo() {
    console.debug(`[HistoryManager::redo]`);
    const history = this._last();
    history.redo();
  }
}