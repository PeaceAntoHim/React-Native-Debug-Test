import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import DeviceInfo, {getManufacturerSync} from 'react-native-device-info';

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

   // console.log(deviceJSON.props);
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
