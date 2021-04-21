import { expect, test } from '@jest/globals';
import _ from 'lodash';
import calcImageSizesToFillRows from './utils/calcImageSizesToFillRows';
import galleryImages from './__fixtures__/gallery-images';

test('calculate images sizes with containerWidth', () => {
  const calcOptions = {
    maxImageHeight: 200,
    minImagesInRow: 2,
    imagesGap: 10,
  };
  const containerWidth = 860;
  const result = calcImageSizesToFillRows(galleryImages, containerWidth, calcOptions);
  console.log(result);
  const calcWidthOfImages = (start, end) => {
    const items = _.slice(result, start, end);
    const width = _.sumBy(items, 'width');
    return Math.ceil(width);
  };
  const expectedWidthByImagesQty = (qty) => containerWidth - ((qty - 1) * calcOptions.imagesGap);

  expect(calcWidthOfImages(0, 3)).toBe(expectedWidthByImagesQty(3));
  expect(calcWidthOfImages(3, 7)).toBe(expectedWidthByImagesQty(4));
  expect(calcWidthOfImages(7, 12)).toBe(expectedWidthByImagesQty(5));
  expect(result).toHaveLength(17);
});
