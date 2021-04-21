import _ from 'lodash';

const defaultOptions = {
  maxImageHeight: 200,
  minImagesInRow: 2,
  imagesGap: 10,
};

const calcImageSizesToFillRows = (
  images,
  containerWidth,
  options = defaultOptions,
  result = [],
) => {
  const imagesCount = images.length;
  const { maxImageHeight, minImagesInRow, imagesGap } = options;

  const getMinHeight = (items) => _.minBy([...items, { height: maxImageHeight }], 'height').height;

  const normalizeHeight = (items, minHeight) => items.map(({ id, height, width }) => {
    const multiplier = minHeight / height;
    return {
      id, height: minHeight, width: width * multiplier,
    };
  });

  const fittingRow = (n) => {
    const imagesForCalculation = _.take(images, n);
    const otherImages = _.drop(images, n);
    const minHeight = getMinHeight(imagesForCalculation);
    const itemsWithNormalizedHeight = normalizeHeight(imagesForCalculation, minHeight);
    if (n > imagesCount) {
      return [itemsWithNormalizedHeight, otherImages];
    }
    const totalWidth = _.sumBy(itemsWithNormalizedHeight, 'width');
    if (totalWidth < containerWidth) {
      return fittingRow(n + 1);
    }
    const multiplier = (containerWidth - ((n - 1) * imagesGap)) / totalWidth;
    const calculatedImages = itemsWithNormalizedHeight.map(({ id, height, width }) => ({
      id,
      height: height * multiplier,
      width: width * multiplier,
    }));
    return [calculatedImages, otherImages];
  };

  const [calculatedImages, notCalculatedImages] = fittingRow(minImagesInRow);
  if (notCalculatedImages.length !== 0) {
    return calcImageSizesToFillRows(notCalculatedImages, containerWidth, options,
      [...result, ...calculatedImages]);
  }
  return [...result, ...calculatedImages];
};

export default calcImageSizesToFillRows;
