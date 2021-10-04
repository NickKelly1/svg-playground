
export class Style {
  /** @type {?string} */ fill;
  /** @type {?string} */ stroke;
  /** @type {?number} */ strokeWidth;

  /**
   * @param {?StyleProperties} [properties]
   * 
   * @typedef StyleProperties
   * @property {?string} [fill]
   * @property {?string} [stroke]
   * @property {?number} [strokeWidth]
   */
  constructor(properties) {
    const {
      fill,
      stroke,
      strokeWidth,
    } = properties || {};

    this.fill = fill || null;
    this.stroke = stroke || null;
    this.strokeWidth = strokeWidth || null;
  }
}
