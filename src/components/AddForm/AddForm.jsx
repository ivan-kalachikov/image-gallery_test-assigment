import './AddForm.scss';
import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as actions from '../../actions/index';
import {
  validateUrl, getJsonFromArraybuffer, getBase64FromArrayBuffer, addImageWithBase64,
} from '../../utils/index';

const mapStateToProps = (state) => {
  const props = {
    url: state.appState.url,
    error: state.appState.error,
    status: state.appState.status,
  };
  return props;
};

const actionCreators = {
  updateUrl: actions.updateUrl,
  changeStatus: actions.changeStatus,
  setError: actions.setError,
  addImages: actions.addImages,
};

const getErrorKey = (error) => {
  if (error.isAxiosError) {
    return 'feedbackMessages.networkError';
  }
  if (error.errorKey) {
    return `feedbackMessages.${error.errorKey}`;
  }
  return { key: 'feedbackMessages.unknownError', error };
};

const AddForm = ({
  addImages, updateUrl, setError, changeStatus, url, status, error,
}) => {
  const { t } = useTranslation();
  const urlInput = React.createRef();

  const handleJSONData = (data) => {
    if (!data.galleryImages) {
      const noImagesError = new Error();
      noImagesError.errorKey = 'noImages';
      throw noImagesError;
    }
    addImages(data.galleryImages);
  };

  const handleImageData = (base64) => {
    addImageWithBase64(base64, addImages);
  };

  const handleResponse = (response) => {
    const contentType = response.headers['content-type'];
    const { data } = response;
    if (/^application\/json.*/.test(contentType)) {
      handleJSONData(getJsonFromArraybuffer(data));
      updateUrl('');
      return;
    }
    if (/^image.*/.test(contentType)) {
      handleImageData(getBase64FromArrayBuffer(data, contentType));
      updateUrl('');
      return;
    }
    const notSupportedTypeError = new Error();
    notSupportedTypeError.errorKey = 'notSupportedType';
    throw notSupportedTypeError;
  };

  const getDataFromUrl = async (addedUrl) => {
    try {
      const response = await axios.get(addedUrl, { responseType: 'arraybuffer' });
      handleResponse(response);
      changeStatus('succeeded');
    } catch (e) {
      const errorKey = getErrorKey(e);
      const errorText = errorKey.key ? t(errorKey.key, { error: e }) : t(errorKey);
      setError(errorText);
      changeStatus('failed');
      throw e;
    }
  };

  const changeHandler = (e) => {
    updateUrl(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const addedUrl = formData.get('url');
    urlInput.current.focus();
    if (!validateUrl(addedUrl)) {
      setError(t('feedbackMessages.urlShouldBeValidURL'));
      changeStatus('failed');
    } else {
      setError(null);
      changeStatus('fetching');
      getDataFromUrl(addedUrl);
    }
  };

  return (
    <form onSubmit={submitHandler} className="add-form">
      <input
        className="add-form__input"
        onChange={changeHandler}
        name="url"
        type="text"
        autoComplete="url"
        placeholder={t('ui.uploadFormUrlPlaceholder')}
        value={url}
        ref={urlInput}
      />
      <button className="add-form__button" type="submit" disabled={status === 'fetching' || !url}>
        {t('ui.uploadFormButtonText')}
      </button>
      {status === 'failed' && <div className="add-form__feedback add-form__feedback_fail">{error}</div>}
      {status === 'succeeded'
      && <div className="add-form__feedback add-form__feedback_success">{t('feedbackMessages.addedSuccessfully')}</div>}
      <p className="add-form__description">{`Пример json файла: ${window.location.href}data/gallery-images.json`}</p>
      <p className="add-form__description">{`Пример изображения:  ${window.location.href}data/image.jpg`}</p>
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(AddForm);
