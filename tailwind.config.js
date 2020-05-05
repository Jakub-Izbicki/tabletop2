module.exports = {
  theme: {
    extend: {
      colors: {
        cardPlaceholder: "rgb(102,180,146)",
        cardPrompt: "rgba(170,180,179,0.75)",
      },
      height: {
        gridCard: `${10 * 0.88}em`,
        gridSlot: `${2}em`,
        gridSlotEdge: `${6}em`,
      },
      width: {
        gridCard: `${10 * 0.63}em`,
        gridSlot: `${2}em`,
      },
      fontSize: {
        vw: '1vw',
      },
      transitionDuration: {
        1: '1ms',
      },
      translate: {
        gridTranslateBottom: '-2em',
        gridTranslateTop: '2em',
        gridTranslateLeft: '1em',
        gridTranslateRight: '-1em',
      },
    },
  },
  variants: {},
  plugins: [],
}
