import viewport from "get-viewport-size";

export default class GameDimensionsUtil {
  getTranslateFromPxToVw(transform) {
    // eslint-disable-next-line no-unused-vars
    const [both, left, top] = /(-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/g.exec(
        transform);
    const vw = viewport().width;
    const leftVwPercentage = (left / vw) * 100;
    const topVwPercentage = (top / vw) * 100;

    return `translate(${leftVwPercentage}vw, ${topVwPercentage}vw)`;
  }
}
