import { Command } from "./commands/Command.js";
import { Queue } from "./Queue.js";
import { a } from "./utils.js";


/**
 * @class
 * {string[]} stack
 */
export class History {
  /** @protected @readonly @type {Command[]} */ _stack = [];
  /** @protected @type {number} */ _pointer = this._stack.length - 1;

  /** @type {boolean} */ isActing;
  /** @type {Queue<(() => void)>} */ queue;

  constructor() {
    this.queue = new Queue();
  }

  /**
   * Enqueue something to run after the current action is completed
   * @param {(() => void)} action
   */
  dispatch(action) {
    if (this.isActing) this.queue.enqueue(action);
    else action();
  }

  /**
   * @param {Command} command
   */
  commit(command) {
    if (this.isActing) {
      const self = this;
      this.queue.enqueue(function commitAfter() { self.commit(command) });
      return;
    }

    console.debug(`[History::commit]`);
    this.isActing = true;
    command.beforeApply();
    command.apply();
    this._stack.push(command);
    this._stack.length = (this._pointer += 1) + 1;
    command.afterCommit();

    this.isActing = false;

    this.queue.flush().forEach((action) => action());
  }

  /**
   * Undo the last command
   *
   * @returns
   */
  undo() {
    if (this.isActing) {
      const self = this;
      this.queue.enqueue(function undoAfter() { self.undo() });
      return;
    }

    this.isActing = true;
    console.debug(`[History::undo]`);

    const command = this._stack[this._pointer];
    if (!command) return;
    this._pointer -= 1;
    command.unapply();

    this.isActing = false;
    this.queue.flush().forEach((action) => action());
  }

  /**
   * Redo the last action
   *
   * @returns
   */
  redo() {
    if (this.isActing) {
      const self = this;
      this.queue.enqueue(function redoAfter() { self.undo() });
      return;
    }

    this.isActing = true;
    console.debug(`[History::redo]`);

    if (this._pointer === this._stack.length - 1) return;
    this._pointer += 1;
    const command = this._stack[this._pointer];
    command.beforeApply();
    command.apply();
    command.afterCommit();

    this.isActing = false;
    this.queue.flush().forEach((action) => action());
  }
}
