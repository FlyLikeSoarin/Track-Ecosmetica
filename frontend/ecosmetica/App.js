import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage
} from 'react-native';

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
import Login from './component/Login/Login'
import Registr from './component/Login/Registr'


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
  return (
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
  const [token, setToken] = React.useState('')
  const showToken = async () => {
    try {
    const token = await AsyncStorage.getItem('token')
    setToken(token);
    }
    catch(e) {
      console.log(e)
    }
  }

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{token}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      //onPress={() => showToken()}
      />
      <Button
      title="Token"
      onPress={()=> showToken()}
      />
      <Button
      title="logout"
      onPress={() => logOut()}
      />

    </View>
  );
};


const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userToken: null
    }
    this.initAuthToken = this.initAuthToken.bind(this);
  }

  async initAuthToken() {
    const authToken = await AsyncStorage.getItem('token');
    this.setState({
      userToken: authToken
    })
  }

  componentDidMount() {
    this.initAuthToken();
  }

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
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registr' component={Registr} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}