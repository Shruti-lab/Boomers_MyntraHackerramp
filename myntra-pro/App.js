import * as React from 'react';
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import DesignScreen from './screens/DesignScreen';
import DesignersHomeScreen from './screens/DesignerHomeScreen';
import TailorResponseScreen from './screens/TailorResponseScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Design" component={DesignScreen} />
        <Stack.Screen name="DesignersHome" component={DesignersHomeScreen} />
        <Stack.Screen name="TailorResponse" component={TailorResponseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
