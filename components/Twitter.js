import { StyleSheet, Text, View } from 'react-native'

import React, { useState,useEffect } from 'react'
import {Linking} from 'react-native';
import {Image } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {TextInput,Button} from 'react-native-paper'


function Twitter(props) {
  
  const [dataadder,setDataAdder]=useState(null)
  const [dataSet,setDataSet]=useState([])


  const FetchingInstaHandle = async (data) => {
    fetch('http://192.168.1.8:5000/twitter_search/' + data,
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
  
      })
      .then(res => res.text())
      .then(results => {
        setDataSet(JSON.parse(results));
   
    console.log(dataSet);
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <View>
          <TextInput style={styles.inputStyle}
      label="Enter Twitter Handle"
      value={dataadder}
      mode="outlined"
      multiline={false}
      onChangeText={text=>setDataAdder(text)}
      />
      <Button  title="Fetch" size={50} icon='account-search' onPress={()=>FetchingInstaHandle(dataadder)}></Button>
    </View>
  )
}

export default Twitter

const styles = StyleSheet.create({
  inputStyle:{
    marginTop:20,
    marginBottom:10,
    marginHorizontal:10,

    backgroundColor:'#eaeaea'

  
  }})