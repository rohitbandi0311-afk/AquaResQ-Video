// Screenshots are ~1535x775 (the real app at desktop width). All source coordinates in the scenes use these pixels.
export const IMG_W = 1535;
export const IMG_H = 775;

/** Browser frame sized to fit a screenshot at a given content width. */
export const frameDims = (contentWidth: number) => ({
  width: contentWidth,
  height: Math.round((contentWidth * IMG_H) / IMG_W),
});

export const CENTER = {cx: IMG_W / 2, cy: IMG_H / 2};
