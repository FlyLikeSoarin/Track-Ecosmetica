import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import barchartImage from '../static/plus-positive-add-mathematical-symbol.svg';
import backgroundImage from '../static/bottles-mock.jpg';
import { HeaderBackground } from '@react-navigation/stack';


/*Buttons*/
import HomeButton from './Button/HomeButton'
import ScanButton from './Button/ScanButton'
import ProfileButton from './Button/ProfileButton'
import SearchButton from './Button/SearchButton'


var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#9ae7af',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Forum',
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
    fontFamily: 'Forum',
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
  buttonMenuContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#929292',
    borderTopWidth: 0.5
  },
  buttonImage: {
    color:'#9ae7af',
  },
  img: {
    width: 80,
    height: 80,
  },
  buttonText: {
    color: '#929292',
    fontSize: 10,
    fontFamily: 'Forum',
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
  }, 
  logInText: {
    color: '#009E4E',
  },
})

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      assetsLoaded: false,
    };
  } 

  async componentDidMount(){
    /* Загрузка шрифтов */
    await Font.loadAsync({
      'Forum': require('../assets/fonts/Forum.ttf')
    });

    this.setState({ assetsLoaded: true });

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
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Forum'
      },
      headerRight: () => (
        <TouchableOpacity onPress={()=> this.state.navigation.navigate('Search')}>
          <SearchButton />
        </TouchableOpacity>
      ),
    });
  }
 
  render() {
    const {assetsLoaded} = this.state;

    if (assetsLoaded) {

    return (
      <View style={styles.container}>
        {/* Body */}
        <View style={styles.productImage}>
          {/*<ImageBackground source={backgroundImage} style={styles.image}>
          <View></View>
    </ImageBackground>*/}
        </View>
        <View style={styles.containerProductText}>
          <Text style={styles.productText}>Зарегистрирутесь или войдите, чтобы видеть ранее отсканированные продукты</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Registr')}>
            <View style={styles.registrButton}>
              <Text style={styles.registrText}>
              Зарегистрироваться
             </Text>
           </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <View style={styles.logInButton}>
            <Text style={styles.logInText}>
              Войти
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.buttonMenuContainer}>
          <TouchableOpacity style={styles.buttonArea}>
          <HomeButton />
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
