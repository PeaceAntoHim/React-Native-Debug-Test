// import React in our code
import React, {useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';

//import all the components we are going to use.

const Home = ({ navigation }) => {

  // Data Phone system
  useEffect(() => {
  const requestPhonePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
          {
            title: "Need your phone number",
            message: "This app need you phone number to get attendance",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          console.log("Permision Granted");
        } else {
          console.log("Permission Denied");
        }
      } catch(e) {
        console.warn("e");
      }
    }
    requestPhonePermission();
  }, []);

  return (
   <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
           {/* <Device title="Device info" /> */}
        <Image
          source={{
              uri:
                'https://www.brandztory.com/image/seo/brandztory-jasa-digital-marketing-creative-agency-jakarta.png',
              }}
              style={{width: 200, height: 200, marginTop: 50}}
            />
          <Text style={styles.boldText}>
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Button"
              onPress={() => navigation.navigate('Check')}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native DebugTest
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.Brandztory.com
        </Text>
      </View>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});

export default Home;