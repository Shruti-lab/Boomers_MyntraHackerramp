// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DesignScreen from './screens/DesignScreen';
import DesignersScreen from './screens/DesignersScreen';
import TailorResponseScreen from './screens/TailorResponseScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Design" component={DesignScreen} />
        <Stack.Screen name="Designers" component={DesignersScreen} />
        <Stack.Screen name="TailorResponse" component={TailorResponseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
