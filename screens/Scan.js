import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Scan = () => {
   return (
      <View>
         <Text style={styles.container}>Scan</Text>
      </View>
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

export default Scan;
