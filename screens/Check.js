import React from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView} from 'react-native';
import DeviceInfo, {getManufacturerSync} from 'react-native-device-info';

const Check = ({route}) => {
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
   deviceJSON.location = route.params.paramKey;

   console.log(route.params.paramKey);
   return (
      <SafeAreaView style={styles.container}>
         <View>
            <Text style={styles.titleStyle}>info</Text>
            <ScrollView>
               <Text style={styles.instruction}>
                  {JSON.stringify(deviceJSON, null, '  ')}
               </Text>
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
    }
})

export default Check;
