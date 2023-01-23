import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import {Linking} from 'react-native';
import {Image } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {TextInput,Button} from 'react-native-paper'

function Insta() 
{

  const [dataadder,setDataAdder]=useState(null)
  const [dataSet,setDataSet]=useState([])


  const FetchingInstaHandle = async (data) => {
    fetch('http://192.168.1.8:5000/scrape/' + data,
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
  
      })
      .then(res => res.text())
      .then(results => {
        setDataSet(JSON.parse(results));
   
    
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handlePress = (URL) => {
    if(URL!=null)
    Linking.openURL(URL);
    else
    alert('No Websites specified')
  };
  const Display_Data = () => {
    
      return(
        <View
        
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: '#eaeaea',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
    
         }}
        >
       
          <Text>Following: {dataSet.Following}</Text>
          <Text>Followers: {dataSet.followers}</Text>
          <TouchableOpacity onPress={()=>handlePress(dataSet.website)}>
          <Text> Click here to check available Website</Text>

          </TouchableOpacity>
          
        {/* {console.log(dataSet.Posts)} */}
          <Text>Bio: {dataSet.bio}</Text>
          {(dataSet.privacy==true)?
          <Text>Private Account</Text>:
          <Text>Public Account</Text>
          }
</View>
)}
let jsxContent = dataSet.Posts &&  dataSet.Posts.map((post,index) => {
  return(
     <View key={index}
     style={{
      margin: 10,
      padding: 10,
      backgroundColor: '#eaeaea',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,

     }}
     >
        <Text  >Post Number: {post[0]}</Text>
        <Text>Likes: {post[1]}</Text>
        <Text>Caption: {post[2]}</Text>
        <Text>Is Video: {post[3] ? 'Yes' : 'No'}</Text>
        <Text>Post Timestamp: {post[4]}</Text>
        <Text>URL: {post[7]}</Text>
        <Text>Time of Upload: {post[10]}</Text>
        <Image
    style={{width: 200, height: 200,margin:10,alignSelf:'center'}}
    source={{uri: encodeURI(post[8])}}

    defaultSource={require('../assets/default.jpg')}
  />

     </View>
  )
})



  return (
    <ScrollView>
     
      <TextInput style={styles.inputStyle}
      label="Enter Instagram Handle"
      value={dataadder}
      mode="outlined"
      multiline={false}
      onChangeText={text=>setDataAdder(text)}
      />
      <Button  title="Fetch" size={50} icon='account-search' onPress={()=>FetchingInstaHandle(dataadder)}>
        </Button>
         <Display_Data/> 
         {<View>{jsxContent}</View>}


</ScrollView>
  )
}

export default Insta

const styles = StyleSheet.create({
  inputStyle: {
    margin: 10,
  },
})

