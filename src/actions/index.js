export const updateUrl = (url) => ({
  type: 'URL_UPDATE',
  payload: {
    url,
  },
});

export const setError = (error) => ({
  type: 'ERROR_SET',
  payload: {
    error,
  },
});

export const changeStatus = (status) => ({
  type: 'STATUS_CHANGE',
  payload: {
    status,
  },
});

export const addImages = (images) => ({
  type: 'IMAGES_ADD',
  payload: {
    images,
  },
});

export const removeImage = (id) => ({
  type: 'IMAGE_REMOVE',
  payload: {
    id,
  },
});

export const updateWidth = (width) => ({
  type: 'WIDTH_UPDATE',
  payload: {
    width,
  },
});
