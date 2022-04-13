// import React in our code
import React, { useEffect, useState} from 'react'
import Geolocation from '@react-native-community/geolocation';

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

const Home = ({ navigation }) => {

  // Data Phone system
  useEffect(() => {
  const requestPhonePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
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

  let deviceJSON = {}
  //Data geolocation service
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  deviceJSON.latitude = parseFloat(currentLatitude);
  deviceJSON.longitude = parseFloat(currentLongitude);
  // console.log(deviceJSON.latitude);
  // console.log(deviceJSON.longitude);

  useEffect(() => {
     const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
           getOneTimeLocation();
           subscribeLocationLocation();
        } else {
           try {
              const granted = await PermissionsAndroid.request(
                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                 {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                 },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                 //To Check, If Permission is granted
                 getOneTimeLocation();
                 subscribeLocationLocation();
              } else {
                 setLocationStatus('Permission Denied');
              } 
           } catch (err) {
              console.warn(err);      
           }
        }
     };
     requestLocationPermission();
     return () => {
        Geolocation.clearWatch(watchID);
     };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
       //getting the Longitude from the location json
       const currentLongitude = position.coords.longitude;
       //getting the Latitude from the location json
       const currentLatitude = position.coords.latitude;
       //Setting Longitude state
       setCurrentLongitude(currentLongitude);
       //Setting Latitude state
       setCurrentLatitude(currentLatitude);
    },
    (err) => {
       // setLocationStatus(error.message);
       console.warn(err);
    },
    {
       enableHighAccuracy: false,
       // timeout: 40000,
       maximumAge: 1000
    },
    );
 };

 const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
    (position) => {
       //Will give you the location on location change
       //getting the Longitude from the location json        
       const currentLongitude = position.coords.longitude;
       //getting the Latitude from the location json
       const currentLatitude = position.coords.latitude;
       //Setting Longitude state
       setCurrentLongitude(currentLongitude);
       //Setting Latitude state
       setCurrentLatitude(currentLatitude);
    },
    (err) => {
       console.warn(err);
    },
    {
       enableHighAccuracy: false,
       maximumAge: 1000
    },
    );
 };

 console.log(deviceJSON);
    

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
            }}
          >
            Scan Now
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Button"
              onPress={() => navigation.navigate('Scan')}
                // if(currentLatitude != '' && currentLongitude != '') {
                //   navigation.navigate('Scan', {
                //       paramKey: deviceJSON
                //   });
                // } else {
                //     alert("Please wait for a moment")
                //   }}
                // }
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