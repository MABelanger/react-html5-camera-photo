import React from 'react';
import PropTypes from 'prop-types';

import CameraHelper, {FACING_MODES} from '../../CameraHelper';
import CircleButton from '../CircleButton';
import StopStartButton from '../StopStartButton';

import './styles/cameraMobileStyle.css';


/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.cameraHelper = null;
    this.state = {
      dataUri : "",
      isShowVideo: true,
      isCameraStarted: false
    };
  }

  componentDidMount() {
    this.cameraHelper = new CameraHelper(this.refs.video);
    if( this.props.autoPlay ){
      let {idealFacingMode, idealResolution} = this.props;
      console.log('idealFacingMode', idealFacingMode)
      this.startCamera(idealFacingMode, idealResolution);
    }

  }

  /*
   * Public fct accessed by ref
   */

  startCamera = (idealFacingMode, idealResolution) => {
   this.cameraHelper.playDevice(idealFacingMode, idealResolution)
     .then(()=>{
       this.setState({isCameraStarted: true})
       if(this.props.onCameraStart) {
         this.props.onCameraStart();
       }
     })
     .catch((error)=>{
       this.props.onCameraError(error);
     });
  }

  getDataUri = (sizeFactor) => {
    return this.cameraHelper.getDataUri(sizeFactor);
  }

  stopCamera = () => {
    console.log('stop() called ')
    this.cameraHelper.stopDevice()
      .then(() => {
        this.setState({isCameraStarted: false})
        if(this.props.onCameraStop){
          this.props.onCameraStop();
        }
      })
      .catch((error) => {
          console.log(error);
      });
  }

  getShowHideStyle(isDisplay) {
    let displayStyle = isDisplay
      ? {display: 'inline-block'}
      : {display: 'none'}

    return displayStyle;
  }


  _renderCircleButton(isVisible){
    console.log('isVisible', isVisible)
    if(!isVisible){
      return null;
    }
    // else ....
    return(
      <CircleButton
        isClicked={!this.state.isShowVideo}
        onClick={()=>{

            this.props.onTakePhoto();
            let dataUri = this.cameraHelper.getDataUri();
            this.setState({
              dataUri,
              isShowVideo: false
            });
            setTimeout(()=>{
              this.setState({
                isShowVideo: true
              });
            }, 900)

        }}
      />
    );
  }

  _renderFlashWhiteDiv(isShowVideo){
    const flashDoTransition = isShowVideo ? '' : 'dotransition';
    const flashClasses = `${flashDoTransition} normal`;
    return(
      <div className={flashClasses}>
      </div>
    )
  }


  render() {
    let showVideoStyle = this.getShowHideStyle(this.state.isShowVideo);
    let showImgStyle = this.getShowHideStyle(!this.state.isShowVideo);



    let circleButton = this._renderCircleButton(this.state.isCameraStarted);
    let flashWhiteDiv = this._renderFlashWhiteDiv(this.state.isShowVideo);

    console.log('this.state.isCameraStarted', this.state.isCameraStarted)

    let {idealFacingMode, idealResolution} = this.props;

    return (
      <div className="camera-mobile-style">
        {flashWhiteDiv}
        <img
          style = {showImgStyle}
          alt="camera"
          src={this.state.dataUri}
        />
        <video
          style = {showVideoStyle}
          ref="video"
          autoPlay="true"
        />
        <StopStartButton
          isOpen={this.state.isCameraStarted}
          onClickStart={()=>{
            this.startCamera()
          }}

          onClickStop={()=>{
            this.stopCamera(idealFacingMode, idealResolution)
          }}
        />
        {circleButton}
      </div>
    );
  }
}

export  {
  FACING_MODES
};

export default Camera;

Camera.propTypes = {
  onCameraError: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  idealFacingMode: PropTypes.string,
  idealResolution: PropTypes.object,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func,
  onTakePhoto: PropTypes.func
}
