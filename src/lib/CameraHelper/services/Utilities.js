const _getImageSize = (videoWidth, videoHeight, sizeFactor) => {

  console.log('videoWidth, videoHeight:', videoWidth, videoHeight);

  // calc the imageWidth
  let imageWidth = videoWidth * parseFloat(sizeFactor);
  // calc the ratio
  let ratio = videoWidth / imageWidth;
  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  console.log('imageWidth, imageHeight, sizeFactor:', imageWidth, imageHeight, sizeFactor);

  return {
    imageWidth,
    imageHeight
  };
}

class Utilities {

  static getDataUri = (videoElement, sizeFactor) => {
    let {videoWidth, videoHeight} = videoElement;
    let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight, sizeFactor);

    // Build the canvas size et draw the image to context from videoElement
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, imageWidth, imageHeight);

    // Get dataUri from canvas
    let dataUri = canvas.toDataURL('image/png');
    return dataUri;
  }


  static getWindowURL = () => {
    let windowURL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return windowURL;
  }

}

export default Utilities;
