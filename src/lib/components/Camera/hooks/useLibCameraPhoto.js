import { useState, useEffect } from 'react';
import LibCameraPhoto from 'jslib-html5-camera-photo';

let libCameraPhoto = null;
let needToClean = false;

export function useLibCameraPhoto (videoRef, idealFacingMode, idealResolution, isMaxResolution) {
  const [mediaStream, setMediaStream] = useState(null);
  const [cameraStartError, setCameraStartError] = useState(null);
  const [cameraStopError, setCameraStopError] = useState(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      libCameraPhoto = new LibCameraPhoto(videoRef.current);
    }
  }, [videoRef]);

  useEffect(() => {
    async function enableStream () {
      needToClean = true;
      try {
        let _mediaStream = null;
        if (isMaxResolution) {
          _mediaStream = await libCameraPhoto.startCameraMaxResolution(idealFacingMode);
        } else {
          _mediaStream = await libCameraPhoto.startCamera(idealFacingMode, idealResolution);
        }
        setMediaStream(_mediaStream);
        setCameraStartError(null);
      } catch (cameraStartError) {
        setCameraStartError(cameraStartError);
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return async function cleanup () {
        try {
          if (needToClean) {
            needToClean = false;
            await libCameraPhoto.stopCamera();
          }

          // protect setState from component umonted error
          // when the component is umonted videoRef.current == null
          if (videoRef && videoRef.current) {
            setMediaStream(null);
            setCameraStopError(null);
          }
        } catch (cameraStopError) {
          setCameraStopError(cameraStopError);
        }
      };
    }
  }, [videoRef, mediaStream, idealFacingMode, idealResolution, isMaxResolution]);

  function getDataUri (configDataUri) {
    return libCameraPhoto.getDataUri(configDataUri);
  }

  return [mediaStream, cameraStartError, cameraStopError, getDataUri];
}
