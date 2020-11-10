import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const URL = 'http://185.148.82.169:8005'

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
      
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 6],
      quality: 1,
      base64: true
    });

    console.log(result);

    let img = new FormData()
    img.append('file', { uri: result.uri})
    /*
    RNFetchBlob.fetch('POST', `${URL}/send_photo/`, {
          'Content-Type' : 'application/octet-stream',
    }, RNFetchBlob.wrap(result.uri))
    .then((res) => {
        console.log(res.text())
    })
    .catch((err) => {
        consile.log('error')
    })
    */

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}