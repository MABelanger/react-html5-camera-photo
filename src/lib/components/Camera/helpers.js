export function getShowHideStyle (isDisplay) {
  const displayStyle = isDisplay
    ? {display: 'inline-block'}
    : {display: 'none'};

  return displayStyle;
}

export function _getMirrorCameraStyle (imageMirror) {
  const mirrorDisplayStyle = imageMirror
    ? {transform: 'rotateY(180deg)'}
    : {transform: 'none'};

  return mirrorDisplayStyle;
}

export function getVideoStyles (isDisplay, imageMirror) {
  return {
    ..._getMirrorCameraStyle(imageMirror),
    ...getShowHideStyle(isDisplay)
  };
}
