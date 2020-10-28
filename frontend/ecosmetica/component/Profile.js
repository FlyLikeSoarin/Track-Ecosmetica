import * as React from 'react';
import * as Font from 'expo-font';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileImageMock from './Button/ProfileImageMock';
import Star from './Button/Star'

/*Buttons*/
import HomeButton from './Button/HomeButton'
import ScanButton from './Button/ScanButton'
import ProfileButton from './Button/ProfileButton'
import SearchButton from './Button/SearchButton'
import BackButton from './Button/BackButton'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
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
  header: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#C4C4C4',
    borderTopColor: '#C4C4C4',
  },
  imageWrap: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTextWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginVertical: 10,
    //paddingBottom: 5,
  },
  bigText: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'NotoSanaTamilLight',
  },
  body: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoWrap: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  bathScoreWrap: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  textScore: {
    color: '#4F4F4F',
    fontSize: 18,
    fontFamily: 'NotoSanaTamilLight',
  },
  imageScore: {
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textScoreNumber: {
    color: '#4F4F4F',
    fontSize: 20,
    fontFamily: 'NotoSanaTamilLight',
    padding: 10,
  },
  buttonAddBefore: {
    backgroundColor: '#E5E5E5',
    height: 48,
    width: 260,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonAddAfter: {
    backgroundColor: '#E5E5E5',
    height: 48,
    width: 260,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonTextBefore: {
    color: '#009E4E',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'NotoSanaTamilLight',
  },
  buttonTextAfter: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'NotoSanaTamilLight',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  test1: {
    flex: 1,
    backgroundColor: '#929292'
  }
});

const ButtonTemplate = ({ title, onPress, style, styleText }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        <Text style={styleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      route: this.props.route,
      token: null,
      bathScore: '',
      excelledIngridiends: [],
      assetsLoaded: false,
      iconLogoutColor: '#000',
      first_name: 'Имя',
      last_name: 'Фамилия',

    };
    this.setToken = this.setToken.bind(this);
    this.initAuthToken = this.initAuthToken.bind(this);
    this.logOut = this.logOut.bind(this)
  }

  async initAuthToken() {
    let token = null
    try {
      token = await AsyncStorage.getItem('token');
      console.log('Profile - tocken');
      console.log(token);
    } catch (e) {
      console.log(e)
    }
    if (token !== null) {
      this.setState({
        token: token,
        iconLogoutColor: '#C4C4C4'
      })

    }
  }
  async componentDidMount() {
    console.log('profileDidMount')

    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    this.state.navigation.setOptions({
      headerTitle: 'Профиль',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5
      },
      headerTintColor: '#929292',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'NotoSanaTamilLight'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => this.state.navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => this.handlerLogout()}>
          <Icon name='logout' size={25} color={this.state.iconLogoutColor} />
        </TouchableOpacity>
      )
    });
    this.initAuthToken();
    let header = null

    if (this.state.token === null) {
      header = {
        'Content-Type': 'application/json',
      }
    } else {
      header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`,
      }
    }

    await fetch(`${URL}/user/`, {
      method: 'GET',
      headers: header
    })
      .then((resp) => {
        return resp.json()
      })
      .then((ans) => {
        console.log('user')
        console.log(ans)
        /*this.setState({first_name: ans.first_name, last_name: ans.last_name})
        console.log(this.state.first_name)*/
      })
    setTimeout(() => {
      this.setState({ assetsLoaded: true });
      console.log('profile')
      console.log(this.state.token)
    }, 1500);

  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('profileDidUpdate')
    if (prevState.token !== this.state.token) {
      console.log('updated')
    }
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
    } catch (e) {
      console.log(e)
    }
  }

  async handlerLogout() {
    this.props.route.params.logOut()
    this.setToken(null)
    this.state.navigation.navigate('Profile')
  }

  render() {
    const { first_name, last_name } = this.state
    return (
      <View style={styles.container}>
        {this.state.token === null && (
          <View style={styles.body}>
            <View style={styles.productImage}>
            </View>
            <View style={styles.containerProductText}>
              <Text style={styles.productText}>
                Зарегистрирутесь или войдите, чтобы добавить нежелательные ингредиенты
              </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Registr', { setToken: this.setToken })}>
                <View style={styles.registrButton}>
                  <Text style={styles.registrText}>Зарегистрироваться</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login', { setToken: this.setToken })}>
                <View style={styles.logInButton}>
                  <Text style={styles.logInText}>Войти</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>)}
        {this.state.token !== null && (
          <View style={styles.body}>
            <View style={styles.header}>
              <View style={styles.imageWrap}>
                <ProfileImageMock />
              </View>
              <View style={styles.bigTextWrap}>
                <Text style={styles.bigText}>{first_name} {last_name}</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.infoWrap}>
                {(this.state.bathScore !== '') && (
                  <View>
                    <View style={styles.bathScoreWrap}>
                      <Text style={styles.textScore}>Оценка ванной</Text>
                      <View style={styles.imageScore}>
                        <Star width='40' height='40' fill='#009E4E' />
                        <Text style={styles.textScoreNumber}>{this.state.bathScore}</Text>
                      </View>
                    </View>
                    <ButtonTemplate
                      title='Оценить заново'
                      style={styles.buttonAddAfter}
                      styleText={styles.buttonTextAfter}
                      onPress={() => this.setState({ bathScore: 9 })} />
                  </View>)}
                {(this.state.bathScore == '') &&
                  <ButtonTemplate
                    title='Оценить ванную'
                    style={styles.buttonAddBefore}
                    styleText={styles.buttonTextBefore}
                    onPress={() => this.setState({ bathScore: 10 })} />}
              </View>
              <View style={styles.infoWrap}>
                <ButtonTemplate
                  title='Исключить ингридиент'
                  style={styles.buttonAddBefore}
                  styleText={styles.buttonTextBefore}
                  onPress={() => this.state.navigation.navigate('AddIngridient')} />
              </View>
            </View>
          </View>
        )}
        {/* Footer */}
        <View style={styles.buttonMenuContainer}>
          <TouchableOpacity style={styles.buttonArea}
            onPress={() => this.props.navigation.navigate('Home')}>
            <HomeButton fill='#929292' />
            <Text style={styles.buttonText}>Домой</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonArea}
            onPress={() => this.props.navigation.navigate('Scanner')}>
            <ScanButton />
            <Text style={styles.buttonText} >Сканировать</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonArea}
            onPress={() => this.props.navigation.navigate('Profile')}>
            <ProfileButton fill='#009E4E' />
            <Text style={styles.buttonText}>Профиль</Text>
          </TouchableOpacity>
        </View>
      </View>)

  }
}
