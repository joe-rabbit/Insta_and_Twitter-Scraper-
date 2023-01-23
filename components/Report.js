import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import {TextInput,Button} from 'react-native-paper'


function Report(props)  {
const [title,setTitle]=useState("")
const [body,setBody]=useState("")
const insertData=()=>{
  fetch('http://192.168.1.8:5000/add',{
    method:"post",
    headers:{

      'Content-Type':'application/json'

    },
    body:JSON.stringify({
      title:title,
      body:body,
      author:'anonymous'

    })

  })
  .then(response=>response.json)
  .then(data=>{
    props.navigation.navigate('Home')

})
  .catch(err=>{
    console.log(err)
  })
}
    return (
      <View>
        <View style={{flexDirection:"row"}}>
        <Text style={{marginLeft:20,paddingTop:5,fontSize:20}}> Report </Text>
        <Button  style={{marginLeft:200}}title="Take An Image" icon="camera"  onPress={()=>props.navigation.navigate('Cameraa')}>
        
        </Button>
        </View>
        <TextInput style={styles.inputStyle}
        label="Title"
        value={title}
        mode="outlined"
        multiline={false}
        onChangeText={text=>setTitle(text)}
        />
        <TextInput style={{margin:8,padding:15}}
        label="Body"
        value={body}
        mode="outlined"
        multiline={true}
        numberOfLines={10}
        onChangeText={text=>setBody(text)}
        />
        <Button  title="Insert Report" mode="contained" icon='pencil' onPress={()=>insertData()}>
          Submit
        </Button>
        

      </View>
    )
  
}

export default Report
const styles = StyleSheet.create({
  inputStyle:{

    margin:10,
    padding:10
  }

})