import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './component/MainPage';
import BarcodeScannerComponent from './component/Scanner';
import ProductNotFound from './component/ProductNotFound/ProductNotFound'
import AddProductPage from './component/AddProduct/AddProductPage'
import Product from './component/Product/Product'
import Login from './component/Login/Login'
import Registr from './component/Login/Registr'
import ProductInfo from './component/History/ProductInfo'
import Profile from './component/Profile'


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

/*function Search({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title='logout' onPress={() => route.params.logOut()} />
      <Button title='очистить историю' onPress={() => route.params.clearHistory()} />
    </View>
  );
};*/




const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
    }
    this.initAuthToken = this.initAuthToken.bind(this);
  }

  async initAuthToken() {
    let authToken = null
    try {
      authToken = await AsyncStorage.getItem('token');
    } catch (e) {
      console.log(e)
    }
    this.setState({
      userToken: authToken
    })
  }

  componentDidMount() {
    this.initAuthToken();
  }


  /*MainPage - home*/
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainPage}
          />
          <Stack.Screen name='Profile' component={Profile}  />
          <Stack.Screen name='Scanner' component={BarcodeScannerComponent} />
          <Stack.Screen name='Product' component={Product} />
          <Stack.Screen name='ProductNotFound' component={ProductNotFound} />
          <Stack.Screen name='AddProduct' component={AddProductPage} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registr' component={Registr} />
          <Stack.Screen name='ProductInfo' component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}