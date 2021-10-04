/**
 * @abstract
 */
export class Command {
  /**
   * Runs before apply is called
   */
  beforeApply() {}

  /**
   * Runs after the command is committed
   */
  afterCommit() {}

  /**
   * Applies the commands effect
   * @abstract
   */
  apply() {}

  /**
   * Reverses the commands effect
   */
  unapply() {}
}
