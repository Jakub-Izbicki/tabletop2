import viewport from "get-viewport-size";

export default class GameDimensionsUtil {
  getPxLeftAndTop = /(-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/g;

  getVwLeftAndTop = /(-?\d+(?:\.\d+)?)vw, (-?\d+(?:\.\d+)?)vw/g;

  getTranslateFromPxToVw(transform) {
    // eslint-disable-next-line no-unused-vars
    const [both, left, top] = this.getPxLeftAndTop.exec(transform);
    const vw = viewport().width;
    const leftVwPercentage = (left / vw) * 100;
    const topVwPercentage = (top / vw) * 100;

    return `translate(${leftVwPercentage}vw, ${topVwPercentage}vw)`;
  }

  getVwFromTransform(transform) {
    // eslint-disable-next-line no-unused-vars
    const [both, left, top] = this.getVwLeftAndTop.exec(transform);
    return {left, top};
  }
}
