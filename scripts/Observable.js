import { Publisher } from "./Publisher.js";

/**
 * @extends {Publisher<[T]>}
 * @template T
 */
export class Observable extends Publisher {
  /*** @type {T} */ value;

  /**
   * @param {() => U} callbackfn
   * @param {Observable<any>[]} deps
   * @template U
   */
  static from(callbackfn, deps) {
    const result = new Observable(callbackfn());
    deps.forEach((dep) => dep.on(() => callbackfn()));
    return result;
  }

  /**
   * @param {T} value
   */
  constructor(value) {
    super();
    this.value = value;
  }

  /**
   * @param {T} value
   */
  set(value) {
    this.value = value;
    this.dispatch(value);
  }

  /**
   * @param {((value: T) => U)} callbackfn 
   * @returns {Observable<U>}
   * @template U
   */
  map(callbackfn) {
    const result = new Observable(callbackfn(this.value));
    this.on((value) => result.set(callbackfn(value)));
    return result;
  }
}
