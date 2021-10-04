import { Publisher } from "./Publisher";
import { HistoryManager } from './HistoryManager';

/**
 * @extends {Publisher<T>}
 * @template T
 */
export class HistoryPublisher extends Publisher {
  /** @protected @readonly @type {HistoryManager} */ _historyManager;

  /**
   * @param {HistoryManager} historyManager 
   */
  constructor(historyManager) {
    super();
    this._historyManager = historyManager;
  }


  /**
   * @override
   * @param {T} value
   * @returns {void}
   */
  dispatch(value) {
    this._historyManager.dispatch(() => {
      super.dispatch(value);
    });
  }
}
