# Change Log

### Other
#### 1.5.5
- Use version jslib-html5-camera-photo 3.1.8

### Other
#### 1.5.4
- update doc

### Refactor
#### 1.5.3
- Refactor states to react hooks.
- This upgrade has no breaking change.

### Bug Fixes
#### 1.5.2
- Fix display error permission

### Other
#### 1.5.1
- Use version jslib-html5-camera-photo 3.1.1

### Features
#### 1.5.0
- Add props callback onTakePhotoAnimationDone(). This function called when a photo is taken and the animation is done. the dataUri is passed as a parameter.

### Other
#### 1.4.2
- Lock packages version

### Bug Fixes
#### 1.4.1
- Bug fix black screen in webview on android-9 #30

### Features
#### 1.4.0
- add isSilentMode: props to disable the click sound when the photo was taken.

### Features
#### 1.3.0
- Add isFullscreen props that force fullscreen camera, useful for mobile device.

### Bug Fixes
#### 1.2.8-beta.0
- Fix Error: `Can't call setState on an unmounted component.`

### Bug Fixes
#### 1.2.7-beta.0
- Fix Error: `Invalid constraint on safari when default value is used.`

### Other
#### 1.2.5-beta.0
- No need lodash and save 30k

### Bug Fixes
#### 1.2.4-beta.0
- Fix TypeError: Object(...) is not a function when componentWillReceiveProps() is called. Introduced in 1.1.2-beta.0

### Bug Fixes
#### 1.2.3-beta.0
- Fix css for error message inside DisplayError component

### Features
#### 1.2.2-beta.0
- Add error message if camera fail to start between h1 tag. see bool prop **isDisplayStartCameraError**

### Bug Fixes
#### 1.1.2-beta.0
- Add support iOS ([#6](https://github.com/MABelanger/react-html5-camera-photo/pull/6)) ([17e6497](https://github.com/MABelanger/react-html5-camera-photo/pull/6/commits/17e6497de174e23ffb54ddd9f1b7312a9ff45d4c))


### BREAKING CHANGES
