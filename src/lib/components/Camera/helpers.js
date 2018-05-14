export function getShowHideStyle (isDisplay) {
  const displayStyle = isDisplay
    ? {display: 'inline-block'}
    : {display: 'none'};

  return displayStyle;
}
