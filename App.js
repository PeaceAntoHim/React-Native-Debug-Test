import React from 'react';
import { StyleSheet } from 'react-native';
import Check from './screens/Check.js';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.js';

const App = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Check" component={Check} />
        </Stack.Navigator>
        {/* <Location /> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

export default App;
