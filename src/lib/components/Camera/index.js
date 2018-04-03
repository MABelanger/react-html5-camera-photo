import React from 'react';
import PropTypes from 'prop-types';
import CameraHelper, {FACING_MODES} from '../../CameraHelper';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/
class Camera extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.cameraHelper = null;
  }

  componentDidMount() {
    this.cameraHelper = new CameraHelper(this.refs.video);
    this.cameraHelper.playDevice()
      .catch((error)=>{
        this.props.onCameraError(error);
      });
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

  render() {
    return (
      <video
        ref="video"
        autoPlay="true"
      />
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
