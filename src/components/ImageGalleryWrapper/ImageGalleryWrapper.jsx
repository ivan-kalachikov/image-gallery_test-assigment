import './ImageGalleryWrapper.scss';
import React, { useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import * as actions from '../../actions/index';

const actionCreators = {
  updateWidth: actions.updateWidth,
};

const ImageGalleryWrapper = ({ children, updateWidth }) => {
  const resizeSubject = useRef(null);
  const { width } = useResizeObserver({ ref: resizeSubject });
  useMemo(() => {
    updateWidth(width);
  }, [width]);
  return <div className="container" ref={resizeSubject}>{children}</div>;
};

export default connect(null, actionCreators)(ImageGalleryWrapper);
