import viewport from "get-viewport-size";

export default class GameDimensionsUtil {
  getPxLeftAndTop = /(-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/g;

  getVwLeftAndTop = /(-?\d+(?:\.\d+)?)vw, (-?\d+(?:\.\d+)?)vw/g;

  getTranslateFromPxToVw(transform) {
    // eslint-disable-next-line no-unused-vars
    const [both, left, top] = this.getPxLeftAndTop.exec(transform);
    const vw = this.getVwFromPx(left, top);

    return `translate(${vw.left}vw, ${vw.top}vw)`;
  }

  getVwFromTransform(transform) {
    // eslint-disable-next-line no-unused-vars
    const [both, left, top] = this.getVwLeftAndTop.exec(transform);
    return {left, top};
  }

  getVwFromPx(left, top) {
    const vw = viewport().width;
    const leftVw = (left / vw) * 100;
    const topVw = (top / vw) * 100;

    return {left: leftVw, top: topVw};
  }
}
