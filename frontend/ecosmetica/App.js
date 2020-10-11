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

import product1img from './static/lRWynXU__sg.jpg';
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


function Scanner({ navigation }) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scanner Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

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
function Result({ route, navigation }) {
  const {type, data} = route.params;
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Type:{type} Data:{data}</Text>
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
function ProductNotFound({ navigation }) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ProductNotFound</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
function AddProduct({ navigation }) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AddProduct</Text>
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
          <Stack.Screen name='Result' component={Result} />
          <Stack.Screen name='ProductNotFound' component={ProductNotFound} />
          <Stack.Screen name='AddProduct' component={AddProduct} />
        </Stack.Navigator>
        </NavigationContainer>
      );
  }
}