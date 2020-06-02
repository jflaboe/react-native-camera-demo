import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef(null);

  async function getPermission(){
    if (Platform.OS === 'ios') {
      Permissions.askAsync(Permissions.CAMERA_ROLL).then((status) => {
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      })
    }
    Permissions.askAsync(Permissions.CAMERA).then(status => {
      setHasPermission(status === 'granted')
    });
  }

  async function pickImage() { 
    console.warn('hello')
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  async function takePicture() {
    
    if (camera) {
      camera.current.takePictureAsync().then((resp) => {console.log(resp)})
      
    }
  }

  useEffect(() => {
    getPermission();
  }, [])

  return (
    <View style={{ flex: 1 }}>
    
      <Camera ref={camera} style={{ flex: 1 }} type={type}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <Ionicons
              name="ios-photos"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={takePicture}>
            <FontAwesome
              name="camera"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}}
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <MaterialCommunityIcons
              name="camera-switch"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
