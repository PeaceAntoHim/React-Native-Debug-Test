import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, PermissionsAndroid } from 'react-native';
import DeviceInfo, {getManufacturerSync} from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';

const Device = (props) => {
   // Data Phone system
   let deviceJSON = {}
   deviceJSON.uniqueId = DeviceInfo.getUniqueId();
   deviceJSON.systemName = DeviceInfo.getSystemName();
   deviceJSON.model = DeviceInfo.getModel();
   deviceJSON.brand = DeviceInfo.getBrand();
   deviceJSON.manufacturer = DeviceInfo.getManufacturerSync();
   deviceJSON.deviceName = DeviceInfo.getDeviceNameSync();
   deviceJSON.isLocationEnabled = DeviceInfo.isLocationEnabledSync();
   deviceJSON.serialNumber = DeviceInfo.getSerialNumberSync();
   deviceJSON.ipAddreas = DeviceInfo.getIpAddressSync();
   deviceJSON.macAddress = DeviceInfo.getMacAddressSync();
   deviceJSON.phoneNumber = DeviceInfo.getPhoneNumberSync();

   //Data geolocation service
   const [currentLongitude, setCurrentLongitude] = useState('');
   const [currentLatitude, setCurrentLatitude] = useState('');
   deviceJSON.latitude = currentLatitude.toString();
   deviceJSON.longitude = currentLongitude.toString();


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
            timeout: 30000,
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
            // console.log(currentLatitude);
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
   return (
      <>
         <Text style={styles.titleStyle}>{props.title}</Text>
         <ScrollView>
            <Text style={styles.instruction}>
               {JSON.stringify(deviceJSON, null, '  ')}
            </Text>
         </ScrollView>
      </>
   );
}

const styles = StyleSheet.create({})

export default Device;
