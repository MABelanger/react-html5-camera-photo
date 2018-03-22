const _getImageSizeFull = (videoWidth, videoHeight) => {
  return {
    imageWidth: videoWidth,
    imageHeight: videoHeight
  };
}

const _getImageSizeThumb = (videoWidth, videoHeight, sizeFactor) => {
  // let imageWidth = IMAGE_WIDTH_THUMB;

  let imageWidth = videoWidth * parseFloat(sizeFactor);

  // calc the ratio
  let ratio = videoWidth / imageWidth;

  // calc the imageHeight
  let imageHeight = videoHeight / ratio;

  return {
    imageWidth,
    imageHeight
  };
}

const _getImageSize = (videoWidth, videoHeight, sizeFactor) => {
  console.log('videoWidth', videoWidth)
  console.log('videoHeight', videoHeight)

  // return _getImageSizeFull(videoWidth, videoHeight)
  return _getImageSizeThumb(videoWidth, videoHeight, sizeFactor);
}

class Utilities {

  static getDataUri = (video, sizeFactor) => {

    let videoWidth = video.videoWidth
    let videoHeight = video.videoHeight;

    let {imageWidth, imageHeight} = _getImageSize(videoWidth, videoHeight, sizeFactor);
    console.log(imageWidth, imageHeight, sizeFactor)

    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, imageWidth, imageHeight);

    let dataUri = canvas.toDataURL('image/png');
    return dataUri;
  }

  /*
   * Resolution spect : https://webrtchacks.com/getusermedia-resolutions-3/
   */
  static getConstraints = (deviceId) => {
    let constraints = {
      audio: false,
      video: {
        optional: [
          {sourceId: deviceId},
          // {minWidth: 320},
          // {minWidth: 640},
          // {minWidth: 800},
          // {minWidth: 900},
          // {minWidth: 1024},
          // {minWidth: 1280},
          // {minWidth: 1920},
          // {minWidth: 2560}
        ]
      }
    };

    // if deviceId add it to the constraints
    if(deviceId) {
      constraints.video.optional.unshift({sourceId: deviceId})
    }

    return constraints;
  }
}

export default Utilities;
