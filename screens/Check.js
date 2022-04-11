import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Data from '../data/Device.js';

const Check = () => {
   return (
      <SafeAreaView style={styles.container}>
         <View>
            <Data />
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
