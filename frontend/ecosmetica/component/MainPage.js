import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Image, StatusBar, ActivityIndicator} from 'react-native';
import barchartImage from '../static/plus-positive-add-mathematical-symbol.svg';
import backgroundImage from '../static/bottles-mock.jpg';
import { HeaderBackground } from '@react-navigation/stack';


/*Buttons*/
 import HomeButton  from './Button/HomeButton'
// import ScanButton from './Button/ScanButton'
// import ProfileButton from './Button/ProfileButton'
// import SearchButton from './Button/SearchButton'


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
    flex: 5,
  },
  containerProductText: {
    padding: 20,
  },
  productText: {
    color: '#467354',
    fontSize: 40,
    fontFamily: 'Forum',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonMenuContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#9ae7af',
  },
  buttonImage: {
    color:'#9ae7af',
  },
  img: {
    width: 80,
    height: 80,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Forum',
    textAlign: 'center',
  }
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
        backgroundColor: '#9ae7af',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Forum'
      },
      headerRight: () => (
        <TouchableOpacity onPress={()=> this.state.navigation.navigate('Search')}>
          
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
          <ImageBackground source={backgroundImage} style={styles.image}>
          <View></View>
          </ImageBackground>
        </View>
        <View style={styles.containerProductText}>
          <Text style={styles.productText}>У вас пока нет отсканированных продуктов</Text>
        </View>

        {/* Footer */}
        <View style={styles.buttonMenuContainer}>
          <TouchableOpacity>
          <HomeButton/>
          <Text style={styles.buttonText}>Домой</Text>
          </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Scanner')}
            >
              
              <Text style={styles.buttonText} >Сканировать</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              
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
