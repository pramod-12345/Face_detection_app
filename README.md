# React Native Face Detection and Video Recording App

This project is a React Native application that utilizes face detection technology and video recording capabilities. When a face is detected, a green rectangle is drawn around it. The app also allows users to record a 10-second video, which is then uploaded to a Node.js server.

## Getting Started

### Prerequisites

Before you begin, ensure you have completed the environment setup for React Native development as per the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) guide.

### Installation
 bash
git clone https://github.com/pramod-12345/Face_detection_app
cd your-project-folder
1. **Clone the repository:** 
git clone https://your-repository-url.git
cd your-project-folder
2. yarn install
3. yarn start or npm start 


### Running the Application

1. **Open a new terminal and run the app on Android:**
    npm run android (for android)
    npm run ios (for ios)

 Ensure your Android Emulator or iOS Simulator is running before executing these commands.

## Features

- **Face Detection:** Utilizes `react-native-vision-camera-face-detector` to detect faces in real-time and draw a green rectangle around them.
- **Video Recording:** Allows recording of a 10-second video.
- **Video Upload:** Automatically uploads the recorded video to a Node.js server.

## Modifying the App

To make changes to the app:

1. Open `VideoScreen.tsx` in your preferred text editor.
2. Make your changes and save the file.

## Troubleshooting

If you encounter issues, refer to the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) guide on the React Native documentation.

## Learn More

To learn more about React Native, consider the following resources:

- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Comprehensive resource to get started and advance with React Native.
- [React Native Blog](https://reactnative.dev/blog) - Stay updated with the latest news and updates from the React Native team.

## Conclusion

This app demonstrates the integration of face detection and video recording in a React Native application. It's a great starting point for developers looking to implement similar features in their apps.