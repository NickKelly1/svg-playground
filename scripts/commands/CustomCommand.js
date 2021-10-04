import { Command } from "./Command.js";


  /**
  * @typedef CustomCommandOptions
  * @property {(() => void)} apply
  * @property {(() => void)} unapply
  * @property {?(() => void)} [beforeApply]
  * @property {?(() => void)} [afterCommit]
  * @exports
  */

export class CustomCommand extends Command {
  /** @protected @readonly @type {(() => void)} */ _apply;
  /** @protected @readonly @type {(() => void)} */ _unapply;
  /** @protected @readonly @type {?(() => void)} */ _afterCommit;
  /** @protected @readonly @type {?(() => void)} */ _beforeApply;

  /**
   * @param {CustomCommandOptions} options
   */
  constructor(options) {
    super();
    const {
      apply,
      afterCommit,
      beforeApply,
    } = options;
    this._apply = apply;
    this._unapply = apply;
    this._afterCommit = afterCommit || null;
    this._beforeApply = beforeApply || null;
  }

  /**
   * Runs before apply is called
   * @override
   */
  beforeApply() {
    if (this._beforeApply) this._beforeApply();
  }

  /**
   * Runs after the command is committed
   * @override
   */
  afterCommit() {
    if (this._afterCommit) this._afterCommit();
  }

  /**
   * Applies the commands effect
   * @override
   * @abstract
   */
  apply() {
    this._apply();
  }

  /**
   * Reverses the commands effect
   * @override
   */
  unapply() {
    this._unapply();
  }
}