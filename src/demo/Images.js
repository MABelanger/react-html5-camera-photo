import React from 'react';

const Image = ({ dataUri }) => {
  // if no dataUri or dataUri is data empty, use gif blank 1px
  let dataUriImage = (!dataUri || dataUri === "data:,")
    ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    : dataUri;
  return(
      <img alt="camera" src={dataUriImage}/>
  );
}

export const Images = ({ dataUris }) => {
  return(
    dataUris.reverse().map((dataUri, index) => {
      return <Image key={index} dataUri={dataUri}/>
    })
  );
}

export default Images;
