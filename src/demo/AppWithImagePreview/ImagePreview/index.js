import React from 'react';
import PropTypes from 'prop-types';

import './styles/imagePreview.css';

export const ImagePreview = ({ dataUri }) => {
  return (
    <div className={'demo-image-preview'}>
      <img src={dataUri} />
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string
};

export default ImagePreview;
