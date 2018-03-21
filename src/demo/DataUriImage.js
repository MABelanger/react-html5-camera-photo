import React from 'react';

export const DataUriImage = ({ dataUri }) => {
  // if no dataUri or dataUri is data empty, use gif blank 1px
  let dataUriImage = (!dataUri || dataUri == "data:,")
    ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    : dataUri;
  return(
      <img alt="camera" className="img-responsive center-block" src={dataUriImage}/>
  );
}

export default DataUriImage;
