import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home/Home';
import LoginScreen from './components/auth/LoginScreen';
import RegistratsiyaScreen from './components/auth/RegistratsiyaScreen';
import Dashboard from './components/pages/Dashboard';
import Payment from './components/pages/Payment';
import Users from './components/pages/Users';
import Userdb from './components/pages/Userdb';
import Change from './components/pages/Change';
import Profile from './components/pages/Profile';
import Magazin from './components/home/Magazin';
import Product from './components/home/Product';
import Products from './components/home/Products';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: true }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: true }}/>
        <Stack.Screen name="Users" component={Users} options={{ headerShown: true }}/>
        <Stack.Screen name="Magazin" component={Magazin} options={{ headerShown: true }}/>
        <Stack.Screen name="Product" component={Product} options={{ headerShown: true }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }}/>
        <Stack.Screen name="Jonatma" component={Change} options={{ headerShown: true }}/>
        <Stack.Screen name="Malumotlar" component={Userdb} options={{ headerShown: true }}/>
        <Stack.Screen name="Products" component={Products} options={{ headerShown: true }}/>
        <Stack.Screen name="Registratsiya" component={RegistratsiyaScreen} options={{ headerShown: true }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
