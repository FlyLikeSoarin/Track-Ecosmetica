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
import LoadingScreen from './LoadingScreen'
import ProductList from './ProductList'

const URL = 'http://185.148.82.169:8005/';
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    borderBottomColor: '#929292',
    borderBottomWidth: 0.5,
    paddingTop: 10,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 50 
  },
  textEco: {
    fontSize: 24,
    fontFamily: 'NotoSanaTamilLight',
    color: '#009E4E',
  },
  textSmetica: {
    fontSize: 24,
    fontFamily: 'NotoSanaTamilLight',
    color: '#000',
  },
  searchArea: {
    alignItems: "center",
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
      token: null,
      data: [
        {
          "name": "Aussie aussome volume",
          "brand_name": "Aussie",
          "img_url": 'https://reactjs.org/logo-og.png',
          "description": "",
          "ingredients": "[\"FRAGRANCE\", \"METHYLISOTHIAZOLINONE\", \"FD&C YELLOW NO. 5 (CI 19140)\", \"METHYLCHLOROISOTHIAZOLINONE\", \"COCAMIDOPROPYL BETAINE\", \"SODIUM LAURETH SULFATE\", \"SODIUM BENZOATE\", \"SODIUM LAURYL SULFATE\", \"CITRIC ACID\", \"TETRASODIUM EDTA\", \"WATER\", \"HEDYCHIUM CORONARIUM (AWAPUHI OR WHITE GINGER)\", \"PRUNUS SEROTINA (WILD CHERRY) EXTRACT\", \"HUMULUS LUPULUS (HOPS) EXTRACT\", \"SODIUM CITRATE\", \"SODIUM XYLENE SULFONATE\", \"SODIUM CHLORIDE\", \"HYDROXYPROPYL METHYLCELLULOSE\", \"D&C RED NO. 33 (CI 17200)\"]",
          "eco_score": 10,
          "safety_score": 10,
          "zoo_score": 2,
          "total_score": 6
      },
      ],
      isDataLoaded: false,
      isEmptyList: true,

    };

    this.setToken = this.setToken.bind(this);
    this.logOut = this.logOut.bind(this)
  }

  // handleData = async () => {
  //   await fetch(`${URL}product/history/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${this.state.token}`,
  //     },
  //   })
  //     .then((resp) => {
  //       console.log(resp.status)
  //       return resp.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       if (data.length !== 0) {
  //         this.setState({
  //           isEmptyList: false
  //         })
  //       }
  //       this.setState({ data: data });
  //     })
  //   this.setState({ isDataLoaded: true });
  //   setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  // }

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

    // if (token !== null) {
    //   this.handleData()
    // }
    /* Загрузка шрифтов */
    await Font.loadAsync({
      'NotoSanaTamilMedium': require('../assets/fonts/NotoSansTamil-Medium.ttf'),
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    /* Кастомизация хедера */
    this.state.navigation.setOptions({
      headerShown: false,
    });
    setTimeout(()=>this.setState({ assetsLoaded: true }), 1500);
  }


  setToken(token) {
    this.setState({
      token: token
    })
  }

  async logOut() {
    this.setState({
      token: null
    })
    try {
      await AsyncStorage.removeItem('token');
    } catch(e) {
      console.log(e)
    } 
  }

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text style={styles.textEco}>Eco</Text>
              <Text style={styles.textSmetica}>smetica</Text>
            </View>
            <TouchableOpacity 
              style={styles.searchArea}
              onPress={() => this.state.navigation.navigate('Search', {logOut: this.logOut})}>
              <SearchButton />
            </TouchableOpacity>
          </View>
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
              <ProductList token={this.state.token} navigation={this.state.navigation} /*data={this.state.data}*//>
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
              onPress={() => this.props.navigation.navigate('Profile', { logOut : this.logOut })}
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
        <LoadingScreen />
      );
    }
  }
}
