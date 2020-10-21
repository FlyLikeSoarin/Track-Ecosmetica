import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import barchartImage from '../static/plus-positive-add-mathematical-symbol.svg';
import backgroundImage from '../static/bottles-mock.jpg';
import { HeaderBackground } from '@react-navigation/stack';

import Home from '../assets/svg/home.svg';
/*Buttons*/
import HomeButton from './Button/HomeButton'
import ScanButton from './Button/ScanButton'
import ProfileButton from './Button/ProfileButton'
import SearchButton from './Button/SearchButton'

import ProductList from './ProductList'


var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#9ae7af',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'NotoSanaTamilLight',
    textAlign: 'center',
  },
  productImage: {
    flex: 4,
  },
  containerProductText: {
    flex: 6,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  productText: {
    color: '#676767',
    fontSize: 24,
    fontFamily: 'NotoSanaTamilLight',
    textAlign: 'center',
    marginBottom: 50
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },
  buttonMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#929292',
    borderTopWidth: 0.5
  },
  buttonImage: {
    color: '#9ae7af',
  },
  img: {
    width: 80,
    height: 80,
  },
  buttonText: {
    color: '#929292',
    fontSize: 10,
    fontFamily: 'NotoSanaTamilLight',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center'
  },
  registrButton: {
    backgroundColor: '#009E4E',
    width: width - 60,
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 5
  },
  logInButton: {
    backgroundColor: '#E5E5E5',
    width: width - 60,
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 5
  },
  registrText: {
    color: '#fff',
    fontFamily: 'NotoSanaTamilLight',
  },
  logInText: {
    color: '#009E4E',
    fontFamily: 'NotoSanaTamilLight',
  },
  body: {
    flex: 10
  }
})

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      assetsLoaded: false,
      token: null
    };

    this.setToken = this.setToken.bind(this);
  }

  async componentDidMount() {
    let token = null
    try {
      token = await AsyncStorage.getItem('token');
    } catch (e) {
      console.log(e)
    }
    if (token !== null) {
      this.setState({
        token: token
      })
    }
    /* Загрузка шрифтов */
    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    /* Кастомизация хедера */
    this.state.navigation.setOptions({
      headerTitle: 'Ecosmetica',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5
      },
      headerTintColor: '#929292',
      headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'NotoSanaTamilLight'
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => this.state.navigation.navigate('Search')}>
          <SearchButton />
        </TouchableOpacity>
      ),
    });
    this.setState({ assetsLoaded: true });
  }

  async componentDidUpdate() {
    /*let token = null
    try {
      token = await AsyncStorage.getItem('token');
    } catch(e) {
      console.log(e)
    }
    if (token !== null) {
      this.setState({
        token: token
      })
    }*/
  }

  setToken(token) {
    this.setState({
      token: token
    })
  }

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {

      return (
        <View style={styles.container}>
          {/* Body */}
          {this.state.token === null && (
            <View style={styles.body}>
              <View style={styles.productImage}>
                {/*<ImageBackground source={backgroundImage} style={styles.image}>
          <View></View>
    </ImageBackground>*/}
              </View>
              <View style={styles.containerProductText}>
                <Text style={styles.productText}>Зарегистрирутесь или войдите, чтобы видеть ранее отсканированные продукты</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Registr', { setToken: this.setToken })}>
                  <View style={styles.registrButton}>
                    <Text style={styles.registrText}>
                      Зарегистрироваться
             </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login', { setToken: this.setToken })}>
                  <View style={styles.logInButton}>
                    <Text style={styles.logInText}>
                      Войти
            </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.state.token !== null && (
            <View style={styles.body}>
              <ProductList token={this.state.token} navigation={this.state.navigation}/>
            </View>
          )}

          {/* Footer */}
          <View style={styles.buttonMenuContainer}>
            <TouchableOpacity style={styles.buttonArea}>
              <HomeButton fill='#009E4E' />
              <Text style={styles.buttonText}>Домой</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonArea}
              onPress={() => this.props.navigation.navigate('Scanner')}
            >
              <ScanButton />
              <Text style={styles.buttonText} >Сканировать</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonArea}
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              <ProfileButton />
              <Text style={styles.buttonText}>Профиль</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
}
