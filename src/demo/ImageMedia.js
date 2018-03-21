import React from 'react';

export const ImageMedia = ({ dataUri }) => {
  // if no dataUri use gif blank 1px
  let dataUriImage = dataUri
    ? dataUri
    : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

  return(
    <div id="parent">
      <div id="container-picture-parent">
        <div id="container-picture">
            <img alt="camera" className="img-responsive center-block" src={dataUriImage}/>
        </div>
      </div>
    </div>
  );
}

export default ImageMedia
