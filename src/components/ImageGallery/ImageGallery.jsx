import './ImageGallery.scss';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import * as actions from '../../actions/index';
import ImageItem from '../ImageItem/ImageItem';
import { addImageWithBase64 } from '../../utils/index';

const mapStateToProps = (state) => {
  const props = {
    rawImages: state.imageGallery.rawImages,
    imageSizes: state.imageGallery.imageSizes,
  };
  return props;
};

const actionCreators = {
  addImages: actions.addImages,
  removeImage: actions.removeImage,
  changeStatus: actions.changeStatus,
  setError: actions.setError,
};
const ImageGallery = ({
  rawImages, imageSizes, removeImage, changeStatus, setError, addImages,
}) => {
  const { t } = useTranslation();
  const onDropRejected = () => {
    setError(t('feedbackMessages.dropzoneError'));
    changeStatus('failed');
  };
  const onDropAccepted = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      addImageWithBase64(reader.result, addImages);
    }, false);
    reader.readAsDataURL(file);
    setError(null);
    changeStatus('succeeded');
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    maxFiles: 1,
    multiple: false,
    maxSize: 2097152,
    noClick: true,
    noKeyboard: true,
    onDropRejected,
    accept: ['image/*'],
  });
  return (
    <div className="image-gallery" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p className="dropzone dropzone_drag">{t('ui.dropzoneDrag')}</p>
          : <p className="dropzone">{t('ui.dropzone')}</p>
      }
      {rawImages.length > 0 && rawImages.map(({ id, url }) => (
        <ImageItem
          key={id}
          id={id}
          url={url}
          width={imageSizes.find((item) => item.id === id).width}
          height={imageSizes.find((item) => item.id === id).height}
          removeImage={removeImage}
        />
      ))}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(ImageGallery);
