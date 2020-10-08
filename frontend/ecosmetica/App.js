import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BarcodeScannerComponent from './component/Scanner';
import MainPage from './component/MainPage';
import ProfileScreen from './component/Profile'
import ProductList from './component/ProductList'

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


const Scanner = () => {
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
    <BarcodeScannerComponent/>
  </View>
};

const Stack = createStackNavigator();
const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.mainPart}>
        <Text>This is main</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Go to profile"
          onPress={() =>
            navigation.navigate('Profile', { name: 'Jane' })
          }
        />
        <Button
          title="Go to prosuct list"
          onPress={() =>
            navigation.navigate('ProductList')
          }
        /> 
        <TouchableOpacity
          title={'Scan'}
          onPress={() =>
            navigation.navigate('Scanner')}
        >
          <img width={70} heigth={70} src={product1img}/>
        </TouchableOpacity> 
      </View>
    </View>

  );
};

export default class App extends React.Component {

  render() {

    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}