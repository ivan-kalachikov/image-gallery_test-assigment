import _ from 'lodash';
import calcImageSizesToFillRows from '../utils/calcImageSizesToFillRows';

const imageGalleryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'IMAGES_ADD': {
      const imagesWithIds = action.payload.images.map(({ url, width, height }) => ({
        url,
        width,
        height,
        id: _.uniqueId(),
      }));
      const newRawImages = [...state.rawImages, ...imagesWithIds];
      const newImageSizes = calcImageSizesToFillRows(newRawImages, state.width);
      return { width: state.width, rawImages: newRawImages, imageSizes: newImageSizes };
    }
    case 'IMAGE_REMOVE': {
      const newRawImages = state.rawImages.filter(({ id }) => id !== action.payload.id);
      const newImageSizes = calcImageSizesToFillRows(newRawImages, state.width);
      return { width: state.width, rawImages: newRawImages, imageSizes: newImageSizes };
    }
    case 'WIDTH_UPDATE': {
      const newImageSizes = calcImageSizesToFillRows(state.rawImages, state.width);
      return { ...state, width: action.payload.width, imageSizes: newImageSizes };
    }
    default:
      return state;
  }
};

const appStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ERROR_SET': {
      return { ...state, error: action.payload.error };
    }

    case 'STATUS_CHANGE': {
      return { ...state, status: action.payload.status };
    }

    case 'URL_UPDATE': {
      return { ...state, url: action.payload.url };
    }
    default:
      return state;
  }
};

export { imageGalleryReducer, appStateReducer };
