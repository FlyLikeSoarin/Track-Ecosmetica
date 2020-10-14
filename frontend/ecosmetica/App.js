import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MainPage from './component/MainPage';
import ProfileScreen from './component/Profile';
import ProductList from './component/ProductList';
import BarcodeScannerComponent from './component/Scanner';
import ProductNotFound from './component/ProductNotFound/ProductNotFound'
import AddProductPage from './component/AddProduct/AddProductPage'
import Product from './component/Product/Product'


const styles = StyleSheet.create({
  mainPart: {
    flex: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: '#c7f9cc',
    flexDirection: 'column',
  },
});

function Search({ navigation }) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

function Profile({ navigation }) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};


const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
      return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainPage}
          />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Scanner' component={BarcodeScannerComponent} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Product' component={Product} />
          <Stack.Screen name='ProductNotFound' component={ProductNotFound} />
          <Stack.Screen name='AddProduct' component={AddProductPage} />
        </Stack.Navigator>
        </NavigationContainer>
      );
  }
}