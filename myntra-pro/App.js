import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CustomIconComponent from './screens/CustomIconComponent';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import DesignersHomeScreen from './screens/DesignersHomeScreen';
import TailorResponseScreen from './screens/TailorResponseScreen';
import LoginScreen from './screens/LoginScreen';
import ProfilePage from './screens/ProfileScreen';
import ProfileFormScreen from './screens/ProfileFormScreen';
import PendingOrdersScreen from './screens/PendingOrdersScreen.';
import DesignerOrdersScreen from './screens/DesignerOrdersScreen';
import CustomerHomeScreen from './screens/CustomerHomeScreen';
import OrderScreen from './screens/OrderScreen';
import InputPage from './screens/InputPage';
import CustomerLoginScreen from './screens/CustomerLoginScreen';
import CustomerRegisterScreen from './screens/CustomerRegisterScreen';
import CustomerQuotesScreen from './screens/CustomerQuotesScreen';
import { UserProvider } from './components/UserContext';
import DesignFeatureScreen from './screens/DesignFeatureScreen';
import JumpsuitForm from './screens/Jumpsuit';
import CustomerChoiceScreen from './screens/CustomerChoiceScreen';
import OtherTabsScreen from './screens/OtherTabsScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import PlacedOrderScreen from './screens/PlacedOrderScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CustomerBottomTabNavigator() {
  return (
    <UserProvider>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          
          } else if (route.name === 'Other Tabs') {
            iconName = focused ? 'flash' : 'flash-outline';
          } else if (route.name === 'New') {
            iconName = focused ? 'logo-designernews' : 'logo-designernews';
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
          fontSize: 9,
        },
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          paddingBottom: 10,
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff4468',
        inactiveTintColor: 'black',
      }}
      style={styles.BottomTabNavigator}
    >
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="New" component={DesignFeatureScreen} />
      <Tab.Screen name="Other Tabs" component={OtherTabsScreen} />
      
    </Tab.Navigator>
    </UserProvider>
  );
}



function CustomTabBarIcon({ name, focused, color, size }) {
  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.focusedLine} />}
      {name === 'home' || name === 'home-outline' ? (
        <CustomIconComponent name={name} color={color} size={size} focused={focused} />
      ) : (
        <Ionicons name={name} size={size} color={color} style={styles.icon} />
      )}
    </View>
  );
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
          } else if (route.name === 'New Orders') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Orders Pending') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          }else if (route.name === 'New') {
            iconName = focused ? imh = require('./assets/new.png') : 'shirt-outline';
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
          fontSize: 9,
        },
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          paddingBottom: 10,
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff4468',
        inactiveTintColor: 'black',
      }}
      style={styles.BottomTabNavigator}
    >
      <Tab.Screen name="Home" component={DesignersHomeScreen} />
      <Tab.Screen name="New Orders" component={DesignerOrdersScreen} />
      <Tab.Screen name="Orders Pending" component={PendingOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfilePage} />
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
        <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="InputPage" component={InputPage} />
        <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
        <Stack.Screen name="CustomerRegister" component={CustomerRegisterScreen} />
        <Stack.Screen name="CustomerPage" component={CustomerBottomTabNavigator} />
        <Stack.Screen name="Jumpsuit" component={JumpsuitForm}/>
        <Stack.Screen name="CustomerChoice" component={CustomerChoiceScreen}/>
        <Stack.Screen name="Quotes" component={CustomerQuotesScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="PlacedOrder" component={PlacedOrderScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 50,
    height: 50,
  },
  focusedLine: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 2,
    backgroundColor: '#ff4468',
  },
  icon: {
    marginTop: 10,
  },
});

export default App;
