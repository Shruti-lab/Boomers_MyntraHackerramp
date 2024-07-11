import * as React from 'react';
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import DesignScreen from './screens/DesignScreen';
import DesignersHomeScreen from './screens/DesignersHomeScreen';
import TailorResponseScreen from './screens/TailorResponseScreen';
import LoginScreen from './screens/LoginScreen';
import ProfilePage from './screens/ProfileScreen';
{/*import ProfileScreen from './screens/ProfileScreen';
import PendingOrdersScreen from './screens/PendingOrdersScreen';
import NewOrders from './screens/NewOrdersScreen';
import Settings from './screens/SettingsScreen';*/}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Design" component={DesignScreen} />
        <Stack.Screen name="DesignersHome" component={DesignersHomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TailorResponse" component={TailorResponseScreen} />
        <Stack.Screen name="Profile" component={ProfilePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
