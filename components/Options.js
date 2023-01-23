
import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import {Linking} from 'react-native';
import {Image } from 'react-native';
import {Icon} from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {TextInput,Button} from 'react-native-paper'
import {SocialIcon} from 'react-native-elements'
const Options = (props) => {
  return (
   
      <ScrollView>
<TouchableOpacity
onPress={()=>{
  props.navigation.navigate('Twitter')
}
}
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
<Icon name="logo-twitter" type='ionicon'/></TouchableOpacity>

<TouchableOpacity
onPress={()=>{
  props.navigation.navigate('Insta')
}
}
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
<Icon name="logo-instagram" type='ionicon'/>
</TouchableOpacity>
<TouchableOpacity
onPress={()=>{
  props.navigation.navigate('Home')
}
}
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
  <Icon name="home" type='ionicon'/>

</TouchableOpacity>
      </ScrollView>

  )
}

export default Options

const styles = StyleSheet.create({})


