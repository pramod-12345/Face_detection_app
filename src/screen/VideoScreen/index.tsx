import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import {
  Frame,
  useCameraDevice,
  Camera as MainCamera,
  VideoFile,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  Face,
  Camera,
  FaceDetectionOptions,
} from 'react-native-vision-camera-face-detector';
import {useVideoUploader} from '../../hooks/useVideoUploader';

export default function VideoScreen() {
  const camera = useRef<MainCamera>(null);
  const device = useCameraDevice('front');
  const {hasPermission} = useCameraPermission();

  const [faces, setFaces] = useState<Face[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [countdown, setCountdown] = useState(10);

  const baseUrl = 'http://192.168.1.3:3000/upload';

  const {uploadVideo} = useVideoUploader(baseUrl);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    // detection options
  })?.current;

  useEffect(() => {
    (async () => {
      const status = await MainCamera.requestCameraPermission();
      console.log({status});
    })();
  }, [device]);

  function handleFacesDetection(detectedFaces: Face[], frame: Frame) {
    setFaces(detectedFaces);
  }

  const handleFinish = video => {
    //Upload video here
    uploadVideo(video);
    camera?.current?.stopRecording();
  };

  const startRecording = async () => {
    if (device) {
      setIsRecording(true);
      setCountdown(3); // Initialize countdown
      camera?.current?.startRecording({
        onRecordingFinished: video => {
          console.log('finish --->', video);
          handleFinish(video.path);
        },
        onRecordingError: error => console.error('error --->', error),
      });

      const interval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            camera?.current?.stopRecording();
            setIsRecording(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }
  };

  if (!hasPermission)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{flex: 1}}>
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
          />
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.buttonStyle}
              disabled={isRecording}
              onPress={startRecording}>
              <Text style={style.buttonText}>
                {isRecording
                  ? `Recording... (${countdown})`
                  : 'Start Recording'}
              </Text>
            </TouchableOpacity>
          </View>
          {faces.map((face, index) =>
            face.bounds ? (
              <View
                key={index}
                style={{
                  borderWidth: 2,
                  borderColor: 'green',
                  position: 'absolute',

                  ...Platform.select({
                    ios: {
                      left: face.bounds.x -150,
                      top: face.bounds.y -300,
                      width: face.bounds.width/3,
                      height: face.bounds.height /2,
                    },
                    android: {
                      left: face.bounds.x,
                      top: face.bounds.y,
                      width: face.bounds.width,
                      height: face.bounds.height * 1.5,
                    },
                  }),
                }}
              />
            ) : null,
          )}
        </>
      ) : (
        <Text>No Device</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#003399',
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
