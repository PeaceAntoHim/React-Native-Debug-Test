//import all the components we are going to use.
import React, { useState, useEffect } from 'react';
import {
   View,
   StyleSheet,
   SafeAreaView,
   PermissionsAndroid,
   RefreshControl,
   ScrollView,
   ActivityIndicator
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Geolocation from '@react-native-community/geolocation';

const wait = (timeout) => {
   return new Promise(resolve => {
      setTimeout(resolve, timeout);
   });
}

const Scan = ({ navigation }) => {
   // const [scan, setScanState] = useState(false);
   // const [result, setResult] = useState();

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
   // console.log(deviceJSON.latitude);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
   }, [])

   const [loading, setLoading] = useState(false);   

   return (
      // {if()}
      <SafeAreaView style={styles.container}>
         <View style={styles.sectionContainer}>
            <ScrollView
               refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
               }
            >
            <QRCodeScanner
               style={{ height: '100%' }} 
               reactivate={true}
               showMarker={true}
               ref={(node) => { this.scanner = node }}
               onRead={() => {
                  if (currentLatitude != '' && currentLongitude != '') {
                     navigation.navigate('Check', {
                        paramKey: deviceJSON
                     });
                     } else {
                        <View style={[styles.container, styles.horizontal]}>
                           <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                        // alert('Please wait for the location to be fetched');
                     }}
               } 
            />
            </ScrollView>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionContainer: {
      marginTop: -30,
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }

})

export default Scan;
