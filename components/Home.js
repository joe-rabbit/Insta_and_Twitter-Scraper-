import React, { useState } from 'react'
import {Card, FAB} from 'react-native-paper'
import { useEffect } from 'react';
import {Dimensions} from 'react-native';

import { StyleSheet, Text, View,Button, FlatList,SafeAreaView ,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
const  gap = {horizontal: 2}

function Home(props) {
  const [data,setData] = useState([])
  const[loading,setIsloading]=useState(true)


const clickedItem=(data)=>{
  props.navigation.navigate('Details',{data:data})
}



const loadData=()=>{
  fetch('http://192.168.1.8:5000/get')
  .then(res=>res.json())
  .then(results=>{

    setData(results)
    setIsloading(false)
  })
  .catch(err=>{
    console.log(err)
  }
  )
}
  useEffect(()=>{
    
loadData(false)
  },[])
    



  
  return (
 <SafeAreaView style={styles.container}>

<FlatList
data={data}
onRefresh={()=>loadData()}
refreshing={loading}
keyExtractor={(item)=>`${item.id}`}
renderItem={({item})=>{
  if(item.name==null)
  return(
    <TouchableWithoutFeedback onPress={()=>{
      clickedItem(item)
    }}>
    <Card style={styles.cardstyle}>
      <TouchableOpacity onPress={()=>{
        clickedItem(item)
      }}
      >
      <Text style={{fontSize:18}}>{item.title}</Text>
    
      <Text>{item.author}</Text>
      </TouchableOpacity>
    </Card>
    </TouchableWithoutFeedback>
  )
}}


/>
<FAB
  style={styles.fab}
  small={false}
  icon="plus"
 
  onPress={() =>props.navigation.navigate('Report')}
/>
 </SafeAreaView>   
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  cardstyle: {
    margin:10,
    width: Dimensions.get('window').width - gap.horizontal,
    padding:20,
    backgroundColor:'white',
  },

  fab:{
    position:'absolute',
    margin:16,
    right:0,
    bottom:0
  }

});
