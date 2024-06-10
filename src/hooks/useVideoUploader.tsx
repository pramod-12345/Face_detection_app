import { Alert, Platform } from 'react-native';

export const useVideoUploader = (uploadUrl: string) => {
  const uploadVideo = async (videoUri: string, videoType: string = Platform.OS === 'android' ? 'video/mp4' : 'video/mov') => {
    const formData = new FormData();
    formData.append('video', {
      uri: Platform.OS === 'android' ? 'file://' + videoUri : videoUri, 
      type: videoType, 
      name: 'upload.mp4' 
    });

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload success:', result);
      Alert.alert('Upload success')
    } catch (error) {
      Alert.alert('Upload failed:', error?.message)
      console.error('Upload failed:', error);
    }
  };

  return {
    uploadVideo,
  };
};