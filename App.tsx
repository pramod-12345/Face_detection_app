import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import {
  useEffect,
  useState,
  useRef
} from 'react';
import {
  Frame,
  useCameraDevice,
  Camera as MainCamera,
  CameraRecordingOptions,
  useCameraDevices,
  VideoFile
} from 'react-native-vision-camera';
import {
  Face,
  Camera,
  FaceDetectionOptions
} from 'react-native-vision-camera-face-detector';

export default function App() {
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    // detection options
  }).current;

  
  const camera = useRef<MainCamera>(null)
  const device = useCameraDevice('front');
  const [faces, setFaces] = useState<Face[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<VideoFile | null>(null);

  useEffect(() => {
    (async () => {
      const status = await MainCamera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  function handleFacesDetection(
    detectedFaces: Face[],
    frame: Frame
  ) {
    setFaces(detectedFaces);
  }

  const handleFinish =()=>{
    //Upload video here
    Alert.alert('Face Detection App', 'Video Saved Successfully.')
    
  }

  const startRecording = async () => {
    if (device) {
      setIsRecording(true);
      camera?.current?.startRecording({
  onRecordingFinished: (video) => {
    console.log('finish --->', video)
    handleFinish()
  },
  onRecordingError: (error) => console.error('error --->', error )
})
      setTimeout(() => {
         camera?.current?.stopRecording()
         setIsRecording(false);
         

      }, 3000); // Stop recording after 10 seconds
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!!device ? (
        <>
          <Camera
            isActive
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            video={true}
            audio={false} 
            faceDetectionCallback={handleFacesDetection}
            faceDetectionOptions={faceDetectionOptions}
          /><View style={{position: 'absolute', bottom: 50 , left: 0 , right: 0}}>
          
          <Button title={isRecording ? "Recording..." : "Start Recording"} onPress={startRecording} disabled={isRecording} />
          </View>
          {faces.map((face, index) => (
            face.bounds ? (
              <View
                key={index}
                style={{
                  borderWidth: 2,
                  borderColor: 'green',
                  position: 'absolute',
                  left: face.bounds.x,
                  top: face.bounds.y,
                  width: face.bounds.width,
                  height: face.bounds.height,
                }}
              />
            ) : null
          ))}
        </>
      ) : (
        <Text>No Device</Text>
      )}
    </View>
  );
}