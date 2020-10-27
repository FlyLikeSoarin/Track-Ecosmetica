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
import Ionicons from 'react-native-vector-icons/Ionicons';


import MainPage from './component/MainPage';
import BarcodeScannerComponent from './component/Scanner';
import ProductNotFound from './component/ProductNotFound/ProductNotFound'
import AddProductPage from './component/AddProduct/AddProductPage'
import Product from './component/Product/Product'
import Login from './component/Login/Login'
import Registr from './component/Login/Registr'
import ProductInfo from './component/ProductInfo'
import Profile from './component/Profile'
import ScannerIngredients from './component/Scanner/ScannerIngredients'


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

function Search({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title='logout' onPress={() => route.params.logOut()} />
    </View>
  );
};

function AddIngridient({ navigation }) {
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

function ScannerIngredients1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ScannerIngredients Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};


// function Profile({ navigation }) {
//   const [token, setToken] = React.useState('')
//   const showToken = async () => {
//     try {
//     const token = await AsyncStorage.getItem('token')
//     setToken(token);
//     }
//     catch(e) {
//       console.log(e)
//     }
//   }
//   const logOut = async () => {
//     await AsyncStorage.removeItem('token');
//   }
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>{token}</Text>
//       <Button
//         title="Go to Home"
//         onPress={() => navigation.navigate('Home')}
//       //onPress={() => showToken()}
//       />
//       <Button
//       title="Token"
//       onPress={()=> showToken()}
//       />
//       <Button
//       title="logout"
//       onPress={() => logOut()}
//       />
//     </View>
//   );
// };
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function HomeTabs() {
//   return (

//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             switch (route.name) {
//               case 'Домой': iconName ='ios-home';
//               break
//               case 'Сканировать': iconName = 'md-reverse-camera';
//               break
//               case 'Профиль': iconName = 'ios-person';
//               break
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#9ae7af',
//           inactiveTintColor: 'gray',
//           labelStyle: {
//             fontSize: 16,
//           },
//           // style: {
//           //   backgroundColor: '#9ae7af',
//           // },
//         }}
//     >
//       <Tab.Screen name='Домой' component={ProductList} />
//       <Tab.Screen name='Сканировать' component={ProductList} />
//       <Tab.Screen name='Профиль' component={ProductList} />
//     </Tab.Navigator>
//     </NavigationContainer>

// );
// }

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
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Scanner' component={BarcodeScannerComponent} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Product' component={Product} />
          <Stack.Screen name='ProductNotFound' component={ProductNotFound} />
          <Stack.Screen name='AddProduct' component={AddProductPage} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registr' component={Registr} />
          <Stack.Screen name='ScannerIngredients' component={ScannerIngredients} />
          <Stack.Screen name='AddIngridient' component={AddIngridient} />
          <Stack.Screen name='ProductInfo' component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}