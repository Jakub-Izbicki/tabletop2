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

  getVwBetween(fromTransform, fromId, toId) {
    const slotEl = document.getElementById(toId);
    const slotElLeft = slotEl.offsetLeft + slotEl.offsetWidth / 2;
    const slotElTop = slotEl.offsetTop + slotEl.offsetHeight / 2;
    const slotElVw = this.getVwFromPx(slotElLeft, slotElTop);

    const cardEl = document.getElementById(fromId).children[0];
    const cardElLeft = cardEl.offsetLeft + cardEl.offsetWidth / 2;
    const cardElTop = cardEl.offsetTop + cardEl.offsetHeight / 2;
    const cardElVw = this.getVwFromPx(cardElLeft, cardElTop);

    return {
      x: slotElVw.left - fromTransform.left - cardElVw.left,
      y: slotElVw.top - fromTransform.top - cardElVw.top
    }
  }
}
