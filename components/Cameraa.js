import { StyleSheet, Text,Modal,FlatList, View ,TouchableOpacity,ScrollView,Image} from 'react-native'
import React from 'react'
import { Camera } from 'expo-camera';
import { useState,useEffect,useRef } from 'react';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import {Icon} from 'react-native-elements'
let camera= Camera
const Cameraa = () => {
    const [assets,setAssets]=useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [capturedImage,setCapturedImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
//   const [recording, setRecording] = useState(false);
//   const [video, setVideo] = useState(null);
//   const [uri, setUri] = useState(null);

//   startRecording = async () => {
//       setRecording(true);
//       // start recording
//       const recording = await Video.create({});
//       setVideo(recording);
//   };

//   stopRecording = async () => {
//       setRecording(false);
//       // stop recording
//       const { uri } = await video.stopAsync();
//       setVideo(null);
//       // you can use fetch API to send the video to your server
//   }

  useEffect(() => {
      (async () => {
        const assets = await MediaLibrary.getAssetsAsync
        ({
            first: 100,
            sortBy: MediaLibrary.SortBy.creationTime,
            mediaType: MediaLibrary.MediaType.photo,
        })
          const { status } = await Camera.requestCameraPermissionsAsync(
                Camera.Constants.Type.back
               

          );
          let { status1 } = await MediaLibrary.requestPermissionsAsync()
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
    })
    setHasMediaPermission(status1='granted');
          setHasPermission(status === 'granted');
          setAssets(assets.assets);
      })();
  }, []);

  if (hasPermission === null) {
      return <View />;
  }
  if (hasPermission === false) {
      return <Text>No access to camera</Text>;
  }

  const takingPicture= async ()=>{
    if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync();
        console.log(photo);
        MediaLibrary.saveToLibraryAsync(photo.uri);
  
        // Do something with the photo
      }

  }

  return (
   

    
        <View style={{ flex: 1 }}>
           
            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
              
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Icon name="camera-reverse-sharp"  type='ionicon' color='white'  size={40} style={{marginBottom:30,marginHorizontal:20}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                onPress={() => {
                    setIsModalVisible(true);
                }}
            >
                <Icon name="images" type="ionicon" color='white' size={35} style={{marginTop:3,marginBottom:30,marginHorizontal:20}}/>
            </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.34,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            width: 70,
                            height: 70,
                            marginLeft: -11,
                            marginBottom: 20,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                        }}
                        onPress={() => takingPicture()}
                    >
                        

                    </TouchableOpacity>
                </View>
            </Camera>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false)
               
                    
                    }}
                    >
                    <TouchableOpacity
                    onPress={() => {
                    setIsModalVisible(false);
                    }}
                    style={{ flex: 1 }}
                    >
                    <View>
                    <FlatList
                    data={assets}
                    scrollEnabled={true}
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <Image
                    style={{ width: 100, height: 100,margin:10 }}
                    source={{ uri: item.uri }}
                    />
                    )}
                    />

                    </View>
                    </TouchableOpacity>
                    </Modal>
                    </View>
                    );

    
    
};







export default Cameraa

const styles = StyleSheet.create({})