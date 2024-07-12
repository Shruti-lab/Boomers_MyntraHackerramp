import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CustomIconComponent from './screens/CustomIconComponent';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import DesignScreen from './screens/DesignScreen';
import DesignersHomeScreen from './screens/DesignersHomeScreen';
import TailorResponseScreen from './screens/TailorResponseScreen';
import LoginScreen from './screens/LoginScreen';
import ProfilePage from './screens/ProfileScreen';
import ProfileFormScreen from './screens/ProfileFormScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ name, focused, color, size }) {
  if(name === 'home') {
    return (
      <View style={styles.iconContainer}>
        {focused && <View style={styles.focusedLine} />}
         <CustomIconComponent name={name} color={color} size={size} focused={focused} />
      </View>
    );
  }

  else if(name ==='home-outline') {
    return (
      <View style={styles.iconContainer}>
        {focused && <View style={styles.focusedLine} />}
         <CustomIconComponent name={name} color={color} size={size} focused={focused} />
      </View>
    );
  }
  else {
    return (
      <View style={styles.iconContainer}>
        {focused && <View style={styles.focusedLine} />}
        <Ionicons name={name} size={size} color={color} style={styles.Ionicons} />
      </View>
    );
  }
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator 
     
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Design') {
            iconName = focused ? 'color-palette' : 'color-palette-outline';
          } else if (route.name === 'TailorResponse') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          }

          return (
            <CustomTabBarIcon
              name={iconName}
              focused={focused}
              color={color}
              size={size}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 9, // Adjust the font size of the tab labels
        },
        headerShown:false,
        
        tabBarStyle: {
          height: 60, // Adjust the height of the tab bar
          backgroundColor: '#ffffff', // Optional: Background color of the tab bar
          borderTopWidth: 1, // Optional: Add a border on top of the tab bar
          borderTopColor: '#dddddd',
          paddingBottom:10 // Optional: Border color
        },
      })}
      tabBarOptions ={{
         activeTintColor:   '#ff4468',
        inactiveTintColor: 'black',
      }}
     
     
      style={styles.BottomTabNavigator}
    >
      <Tab.Screen name="Home" component={DesignersHomeScreen} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Design" component={DesignScreen} />
      <Tab.Screen name="TailorResponse" component={TailorResponseScreen} />
      {/* Add other Tab screens here */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DesignerPage" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />

        {/* If you want to include other screens in the stack */}
        {/* <Stack.Screen name="Profile" component={ProfilePage}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
  iconContainer: {
    alignItems: 'center',
    
    marginTop:0
    
    
  },
  focusedLine: {
    flex:1,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#ff4468',
    marginBottom:10
    
  },
  Ionicons:{
    marginTop:12
  }
});

export default App;
