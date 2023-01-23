import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import Report from './components/Report.js'
import Home from './components/Home.js'
import Constants from 'expo-constants'
import Details from './components/Details';
import Options from './components/Options';
import Twitter from './components/Twitter';
import Insta from './components/Insta'
import Cameraa from './components/Cameraa'
// import {Report} from './components/Report.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack=createStackNavigator()
function App() {
let [auth,isAuth]=useState(null);
  useEffect(() => {
    
    const checkAuth = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasHardware) {
        const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (supported.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          const result = await LocalAuthentication.authenticateAsync();
          if (result.success) {
            console.log('Authenticated')
            isAuth(true);
           
          } else {
            console.log('Not Authenticated');
            isAuth(false);
          }
        } else {
          console.log('Fingerprint not supported');
        }
      } else {
        console.log('No hardware');
      }
    };

  

    checkAuth();
  }, []);

  return (
   auth ?
    <SafeAreaView style={styles.container}>
           <StatusBar style="auto" />
      <Stack.Navigator>  
      <Stack.Screen name="Options" component={Options} />
      <Stack.Screen name="Twitter"component={Twitter} />
        <Stack.Screen name="Insta" component={Insta} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Report" component={Report} /> */}
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cameraa" component={Cameraa} />
      </Stack.Navigator>

 
    </SafeAreaView>
    :
    <View style={styles.container}>
      <Text>
         Not Authenticated
        </Text>
        </View>

  );

}
export default () =>
{
return (
 




    <NavigationContainer>{ <App/> }</NavigationContainer>


)
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex:3,
    backgroundColor: '#fff',


  },
});
