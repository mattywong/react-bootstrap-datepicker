import { css } from "styled-components";

interface GenerateBaseLineProps {
  baseFontSize: number;
  defaultLineHeight: number;
  // Works best when it divides evenly into (baseFontSize * lineHeight)
  rhythmHeight: number;
  // Object of <font name>: scale (0-1)
  // Calculate with a tool like https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
  capHeights: Record<string, number>;
  debug: boolean;
}

export const generateBaseLine = ({
  baseFontSize,
  defaultLineHeight,
  rhythmHeight,
  capHeights,
  debug = false,
}: GenerateBaseLineProps) => {
  function rhythmShift(
    font: string,
    lineHeightRem: number,
    fontSizeRem = baseFontSize
  ) {
    const capHeightFraction = capHeights[font];
    const capHeight = fontSizeRem * capHeightFraction;

    return (lineHeightRem - capHeight) / 2;
  }

  function roundToMultiple(
    value: number,
    multiple: number,
    direction = "nearest"
  ) {
    const valueRoundedDown = Math.floor(value / multiple) * multiple;

    // purposely avoiding floating point and division
    const isHalfOrOver = (value - valueRoundedDown) * 2 >= multiple;

    if (direction === "up" || (direction == "nearest" && isHalfOrOver)) {
      // force rounding up
      return valueRoundedDown + multiple;
    } else {
      // force rounding down
      return valueRoundedDown;
    }
  }

  function rhythmLineHeight(
    font: string,
    fontSizeRem: number,
    desiredLineHeight = defaultLineHeight
  ) {
    const capHeight = capHeights[font];

    const baseFontSizePx = baseFontSize * 16;
    const fontSizePx = fontSizeRem * baseFontSizePx;
    const desiredHeightPx = desiredLineHeight * fontSizePx;
    const capHeightPx = capHeight * fontSizePx;
    const rhythmHeightPx = rhythmHeight * baseFontSizePx;

    // Rounded to the nearest rhythm line
    let roundedHeightPx = roundToMultiple(desiredHeightPx, rhythmHeightPx);

    // Disallow line heights below the cap height
    if (roundedHeightPx < capHeightPx) {
      roundedHeightPx = roundToMultiple(capHeightPx, rhythmHeightPx, "up");
    }

    // convert back to a value relative to the font size rem
    return roundedHeightPx / baseFontSizePx;
  }

  return {
    theme: {
      rhythmHeight,
      setFontWithRhythm(
        fontName: string,
        fontSizeRem: number,
        desiredLineHeight: number
      ) {
        const lineHeight = rhythmLineHeight(
          fontName,
          fontSizeRem,
          desiredLineHeight
        );
        const shift = rhythmShift(
          fontName,
          lineHeight,
          fontSizeRem * baseFontSize
        );

        return `
          font-family: ${fontName};
          font-size: ${fontSizeRem}rem;
          padding-top: ${shift}rem;
          margin-bottom: -${shift}rem;
          line-height: ${lineHeight}rem;
        `;
      },

      rhythmSizing(multiple: number) {
        return rhythmHeight * multiple;
      },
      displayBaseline() {
        return css`
          background: linear-gradient(
            rgba(255, 0, 0, 0.1),
            rgba(255, 0, 0, 0.1) 1px,
            transparent 1px
          );
          background-size: 1px ${rhythmHeight}rem;
        `;
      },
    },
    global: `

      /* Specify our global font size */
      body {
        font-size: ${baseFontSize * 100}%;
      }
    `,
  };
};
