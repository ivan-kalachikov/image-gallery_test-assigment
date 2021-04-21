import './ImageItem.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ImageItem = ({
  id, url, removeImage, width, height,
}) => {
  const { t } = useTranslation();
  const clickHandler = (removedId) => () => {
    removeImage(removedId);
  };
  const onLoadHandler = (e) => {
    e.target.parentElement.classList.add('loaded');
  };
  return (
    <div data-id={id} className="image-gallery__item" style={{ width: `${width}px`, height: `${height}px` }}>
      <img onLoad={onLoadHandler} className="image-gallery__image" src={url} loading="lazy" alt="" />
      <button onClick={clickHandler(id)} type="button" className="image-gallery__remove-btn" title={t('ui.removeImage')}>×</button>
    </div>
  );
};

export default ImageItem;
