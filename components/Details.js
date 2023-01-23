import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import {TextInput,Button} from 'react-native-paper'
function Details(props){
  const data=props.route.params.data;
const deleteData=(data)=>{
  fetch('http://192.168.1.8:5000/delete/'+data.id,
  {
    method:"delete",
    headers:{
      'Content-Type':'application/json'
      },
     
  })
  .then(res=>res.text())
  .then(results=>{
    props.navigation.navigate('Home')
  }
  )
  .catch(err=>{
    console.log(err)
  })
}
  return (
    <ScrollView >
     <View style={styles.ViewStyles}>
        <Text style={{ textAlign: 'center',
    margin: 35,fontSize:35}}>{data.title}</Text>
        <Text style={{
    margin: 10,fontSize:20}}>{data.body}</Text>
        <Text style={styles.textStyle}>{data.author}</Text>

        <Button style={styles.BtnStyle}  icon='delete' title='delete' mode="contained"  onPress={()=>deleteData(data)}>
Delete
        </Button>

     </View>
    </ScrollView>
  )
}

export default Details

const styles = StyleSheet.create({
  ViewStyles: {
    flex: 1,

    alignItems: 'center',
  

  },
  textStyle: {
    fontSize: 20,
  

    margin: 50,

  }
  ,
  BtnStyle: {
    margin: 15,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
flexDirection:'row',
justifyContent:'space-around',

  }
})