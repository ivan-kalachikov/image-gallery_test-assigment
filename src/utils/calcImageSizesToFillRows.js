import _ from 'lodash';

const defaultOptions = {
  maxImageHeight: 200,
  minImagesInRow: 1,
  imagesGap: 10,
};

const calcImageSizesToFillRows = (
  images,
  containerWidth,
  options = defaultOptions,
) => {
  const calculatedImages = [];
  let notCalculatedImages = images;
  const { maxImageHeight, minImagesInRow, imagesGap } = options;

  const getMinHeight = (items) => _.minBy([...items, { height: maxImageHeight }], 'height').height;

  const normalizeHeight = (items, minHeight) => items.map(({ id, height, width }) => {
    const multiplier = minHeight / height;
    return {
      id, height: minHeight, width: width * multiplier,
    };
  });

  const fittingRow = (n) => {
    const imagesForCalculation = _.take(notCalculatedImages, n);
    const minHeight = getMinHeight(imagesForCalculation);
    const itemsWithNormalizedHeight = normalizeHeight(imagesForCalculation, minHeight);
    if (n > notCalculatedImages.length) {
      return itemsWithNormalizedHeight;
    }
    const totalWidth = _.sumBy(itemsWithNormalizedHeight, 'width');
    if (totalWidth < containerWidth) {
      return fittingRow(n + 1);
    }
    const multiplier = (containerWidth - ((n - 1) * imagesGap)) / totalWidth;
    return itemsWithNormalizedHeight.map(({ id, height, width }) => ({
      id,
      height: height * multiplier,
      width: width * multiplier,
    }));
  };

  while (notCalculatedImages.length !== 0) {
    const rowResult = fittingRow(minImagesInRow);
    const n = rowResult.length;
    calculatedImages.push(...rowResult);
    notCalculatedImages = _.drop(notCalculatedImages, n);
  }
  return calculatedImages;
};

export default calcImageSizesToFillRows;
