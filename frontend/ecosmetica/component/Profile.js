import * as React from 'react';
import * as Font from 'expo-font';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  AsyncStorage,
  Dimensions,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileImageMock from './Button/ProfileImageMock';
import Star from './Button/Star'

import { HomeButton, ScanButton, ProfileButton, BackButton } from './Button'
import ProductList from './History/ProductList'
import Product from './History/Product'
import AddAvatarButton from './Profile/AddAvatarButton'

import AwesomeAlert from 'react-native-awesome-alerts';
import LoadingScreen from './LoadingScreen';

import config from '../config';

var width = Dimensions.get('window').width;


const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
  },
  container: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  registrButton: {
    backgroundColor: '#009E4E',
    width: width - 60,
    height: 40,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    margin: 5
  },
  logInButton: {
    backgroundColor: '#E5E5E5',
    width: width - 60,
    height: 40,
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    margin: 5
  },
  registrText: {
    color: '#fff',
    fontFamily: 'NotoSanaTamilLight',
  },
  productImage: {
    flex: 4,
  },
  logInText: {
    color: '#009E4E',
    fontFamily: 'NotoSanaTamilLight',
  },
  header: {
    flex: 0.7,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    //borderBottomWidth: 1,
    //borderTopWidth: 1,
    //borderBottomColor: '#C4C4C4',
    //borderTopColor: '#C4C4C4',
  },
  body: {
    flex: 10,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
  bodyProfile: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 10,
    //alignItems: 'center',
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
    marginVertical: 10
    // marginVertical: 10,
    //paddingBottom: 5,
  },
  bigText: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'NotoSanaTamilLight',
  },
  infoWrap: {
    flex: 1,
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
    width: 90,
    height: 90,
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
  tabsArea: {
    flexDirection: 'row',
    height: 40,
    //flex: 1,
  },
  ingregients: {
    flex: 2,
    flexDirection: 'column',
    marginTop: 10,
  },
  scroll: {
    alignItems: 'stretch',
  },
  innerScroll: {
    marginBottom: 100
  },
  ingredientBlock: {
    borderBottomWidth: 0.5,
    borderColor: '#929292',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientText: {
    flex: 16,
    fontFamily: 'NotoSanaTamilLight',
    fontSize: 15,
    color: '#676767',
    paddingLeft: 10
  },
  ingredientScoreText: {
    fontSize: 15,
    //color: '#fff',
    fontFamily: 'NotoSanaTamilLight',
},
favouritesWrap:{
  flex:1,
  flexDirection: 'column',
},
listWrap: {
  flex: 1,
  flexDirection: 'column',
},
buttonTextTarget: {
  color: '#009E4E',
  fontSize: 10,
  fontFamily: 'NotoSanaTamilLight',
  textAlign: 'center',
  justifyContent: 'center',
},
emptyReviewsText: {
  color: '#979797',
  fontSize: 18,
  fontFamily: 'NotoSanaTamilLight',
},
wrapEmptyReviewText: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 40,
  //marginTop: 100,
},
tabsText: {
  color: '#4F4F4F',
  fontFamily: 'NotoSanaTamilLight',
  fontSize: 16,
  fontWeight: 'bold'
},
input: {
  backgroundColor: '#E5E5E5',
  margin: 10,
  marginRight: 25,
  marginLeft: 25,
  padding: 10,
  height: 40,
  borderRadius: 10,
},
inputName: {
  marginTop: 40,
  backgroundColor: '#E5E5E5',
  margin: 10,
  marginRight: 25,
  marginLeft: 25,
  padding: 10,
  height: 40,
  borderRadius: 10,
},
passwordInput: {
  flexDirection: 'row',
  backgroundColor: '#E5E5E5',
  margin: 10,
  marginRight: 25,
  marginLeft: 25,
  padding: 10,
  height: 40,
  borderRadius: 10,
},
passwordInputArea: {
  flex: 1,
  paddingLeft: 0,
  backgroundColor: '#E5E5E5',
  color: '#424242',
},
buttonArea2: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'stretch',
  backgroundColor: '#fff',
  marginBottom: 20,
  marginTop: 20
},
bottom: {
  backgroundColor: '#009E4E',
  height: 40,
  alignItems: 'center',
  borderRadius: 25,
  justifyContent: 'center',
  marginLeft: 25,
  marginRight: 25,
},
bottomText: {
  color: '#fff',
  fontFamily: 'NotoSanaTamilLight'
},
reviews: {
  flex: 1,
},
loading: {
  flex: 1,
  justifyContent: 'center',
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
      bathScore: '',
      excelledIngridiends: [],
      assetsLoaded: false,
      iconLogoutColor: '#ffffff',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      url_avatar: null,
      assetsLoaded: false,

      showIngridients: false,
      ingridients: ['igrd1', 'ingd2', 'ingrd3'],

      colorsTabsPanel: {
        ingredientsTop: '#009E4E',
        ingredientsBackground: '#fff',
        reviewsTop: '#929292',
        reviewsBackground: '#F1F1F1'
      },

      token: this.props.route.params.token,
      favourites: [
      ],
      isUpdated: false,
      isInputIngsShown: false,
      isEmptyList: false,
      bottonPressed: false,
      showFooter: true
    };
    this.setToken = this.setToken.bind(this);
    this.handlerPassword = this.handlerPassword.bind(this)
    this.handlerFirstName = this.handlerFirstName.bind(this)
    this.handlerLastName = this.handlerLastName.bind(this)
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }


  handleData = async () => {
    setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  }

  async loadFavorites(token) {
    await fetch(`${config.SERVER_URL}/product/make_favorite/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    })
      .then((resp) => {
        console.log('favorite', resp.status)
        console.log('favorite body', resp.body)
        return resp.json()
      })
      .then((ans) => {
        console.log('favorite ans', ans)
        this.setState({
          favourites: ans
        })
      })
      setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  }

  async loadTocken() {if (this.state.token === null) {
    let token = null
    try {
      console.log("try get token")
      token = await AsyncStorage.getItem('token');
      console.log('Profile', token)
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
}

  async componentDidMount() {
    console.log('cmponentDidMount')
    console.log(this.state.token)
    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    await this.loadTocken();
    await this.loadFavorites(this.state.token)


    await this.loadUserInfo()
    

    this.state.navigation.setOptions({
      headerTitle: 'Профиль',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5
      },
      headerTintColor: '#676767',
      headerTitleStyle: {
        //fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'NotoSanaTamilLight'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => this.state.navigation.navigate('Home')}>
          <BackButton />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => this.handlerLogout()}>
          <Icon name='logout' size={25} color={this.state.iconLogoutColor} />
        </TouchableOpacity>
      )
    });

  }

  _keyboardDidShow() {
    this.setState({
      showFooter: false
    })
  }

  _keyboardDidHide() {
    this.setState({
      showFooter: true
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('profileDidUpdate')
    if (prevState.token !== this.state.token || prevState.url_avatar !== this.state.url_avatar) {
      if ((this.state.token === "" || this.state.token === null || this.state.token === undefined) && this.state.iconLogoutColor === "#C4C4C4") {
        this.setState({iconLogoutColor: '#fff'})
      } else {
        this.setState({iconLogoutColor: '#C4C4C4'})
      }
      if (prevState.url_avatar !== this.state.url_avatar) {
        const url = this.state.url_avatar
        this.setState({ url_avatar: url })
      }
      this.loadUserInfo()
    }
  }

  async loadUserInfo() {
    console.log("load user info")
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

    await fetch(`${config.SERVER_URL}/user/`, {
      method: 'GET',
      headers: header
    })
      .then((resp) => {
        return resp.json()
      })
      .then((ans) => {
        console.log('user')
        console.log(ans)
        this.setState({ first_name: ans.first_name, last_name: ans.last_name, url_avatar: ans.profile_img_url })
        const username = ans.first_name + ' ' + ans.last_name
        try {
          AsyncStorage.removeItem('username');
        } catch (e) {
          console.log(e)
        }
        try {
          AsyncStorage.setItem('username', username)
        } catch (e) {
          console.log(e)
        }
      })
      .catch(e => console.log(e))
  }


  setToken(token) {
    this.setState({
      token: token,
      iconLogoutColor: '#C4C4C4'
    })
  }
  /* не вызывается */
  async logOut() {
    console.log('logout')
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
    this.setState({
      token: null,
      iconLogoutColor: '#fff'
    })
    this.state.navigation.navigate('Profile', { updateHistory: this.props.route.params.updateHistory })
  }

  async handlerSave() {
    if (!this.state.bottonPressed) {
        this.setState({ buttonPressed: true })
        await fetch(`${config.SERVER_URL}/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`,
                },
                body: JSON.stringify({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: "qwerty",
                })
            })
            .then((resp)=>console.log(resp.status))
    }
  }

  showIngridients() {
    this.setState({
      showIngridients: true,
      colorsTabsPanel: {
        ingredientsTop: '#929292',
        ingredientsBackground: '#F1F1F1',
        reviewsTop: '#009E4E',
        reviewsBackground: '#fff'
      }
    })
  }
  hideIngridients() {
    this.setState({
      showIngridients: false,
      colorsTabsPanel: {
        ingredientsTop: '#009E4E',
        ingredientsBackground: '#fff',
        reviewsTop: '#929292',
        reviewsBackground: '#F1F1F1'
      }
    })
  }

  handleUpdate() {
    let isUpd = this.state.isUpdated
    this.setState({ isUpdated: !isUpd })
  }

  async handleMoveToProduct(barcode) {
    await fetch(`${config.SERVER_URL}/product/?code=${barcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`,
      }
    })
    .then((resp) => {
      console.log(resp.status)
      if (resp.status === 200) {
        return resp.json()
      }
    })
    .then((ans) => {
      function compare(a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      }
      ans.ingredients.sort(compare)
      this.state.navigation.navigate('Product', { type: "type", data_: ans, barcode: barcode, updateHistory: () => console.log("") });
    })
    .catch((e) => {

    })

  }
  
  handlerPassword(text) {
    this.setState({
        password: text
    })
}
  handlerFirstName(text) {
      this.setState({
          first_name: text
      })
  }
  handlerLastName(text) {
      this.setState({
          last_name: text
      })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
         onPress={() => this.handleMoveToProduct(item.barcode)}
      >
        <View>
          <Product
            title={item.name}
            key={1}
            image={item.img_url}
            lable={item.brand_name}
            metric1={item.total_score}
            favorite={true}
            barcode={item.barcode}
            token={this.state.token}
            isAddFovoriteShown={true}
          />
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    console.log("avalar render", this.state.url_avatar)
    const { assetsLoaded, first_name, last_name, ingridients, favourites } = this.state
    
    return (
      <SafeAreaView style={styles.containerScreen}>
        {this.state.token === null && (
          <View style={styles.body}>
            <View style={styles.productImage}>
            </View>
            <View style={styles.containerProductText}>
              <Text style={styles.productText}>
                Зарегистрирутесь или войдите, чтобы видеть ранее отсканированные продукты
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
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.imageWrap}>
                <AddAvatarButton token={this.state.token} url_avatar={this.state.url_avatar} />
              </View>
              <View style={styles.bigTextWrap}>
                <Text style={styles.bigText}>{first_name} {last_name}</Text>
              </View>
            </View>
            <View style={styles.bodyProfile}>
              <View style={styles.tabsArea}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 3,
                    borderTopColor: this.state.colorsTabsPanel.ingredientsTop,
                    backgroundColor: this.state.colorsTabsPanel.ingredientsBackground,
                    borderBottomRightRadius: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: this.state.colorsTabsPanel.ingredientsBackground
                  }}
                  onPress={() => this.hideIngridients()}
                >
                  <Text style={styles.tabsText}>
                    Избранное
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopWidth: 3,
                    borderTopColor: this.state.colorsTabsPanel.reviewsTop,
                    backgroundColor: this.state.colorsTabsPanel.reviewsBackground,
                    borderBottomLeftRadius: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: this.state.colorsTabsPanel.reviewsBackground,
                  }}
                onPress={() => this.showIngridients()}
                >
                  <Text style={styles.tabsText}>
                    Настройки
                  </Text>
                </TouchableOpacity>
              </View>
              {!this.state.showIngridients && assetsLoaded &&(
                <View style={styles.ingregients}>
                  {favourites.length === 0 && (
                    <View style={styles.wrapEmptyReviewText}>
                      <Text style={styles.emptyReviewsText}>
                        Отсканируйте штрих-код продукта, чтобы добавить его в избранное
                      </Text>
                    </View>
                  )}
                  <SafeAreaView style={styles.scroll}>
                    <FlatList
                      data={favourites}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => { return (item.name + index) }}
                    />
                  </SafeAreaView>
                </View>
                )}
                {!this.state.showIngridients && !assetsLoaded &&(
                  <View style={styles.loading}>
                    <ActivityIndicator/>
                  </View>)}
                        {this.state.showIngridients && (
                            <View style={styles.reviews}>
                                <SafeAreaView style={styles.scroll}>
                                <InputScrollView
                                    ref={ref => { this.scrollView = ref }}
                                    onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
                                >
                                  <TextInput style={styles.inputName}
                                  value={this.state.first_name}
                                  onChangeText={this.handlerFirstName}
                                  placeholder='Имя'
                                  placeholderTextColor="#8B8B8B"
                                  autoCapitalize="none"
                                  />
                                  <TextInput style={styles.input}
                                  value={this.state.last_name}
                                  onChangeText={this.handlerLastName}
                                  placeholder='Фамилия'
                                  placeholderTextColor="#8B8B8B"
                                  autoCapitalize="none"
                                  />
                            <View style={styles.buttonArea2}>
                                <TouchableOpacity onPress={() => this.handlerSave()}>
                                    <View style={styles.bottom}>
                                        <Text style={styles.bottomText}>
                                        Сохранить изменения
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            </InputScrollView>
                            </SafeAreaView>
                          </View>)}           
            </View>
          </View>)}
        {/*FOOTER*/}
        { this.state.showFooter && (
        <View style={styles.buttonMenuContainer}>
          <TouchableOpacity style={styles.buttonArea}
            onPress={() => this.props.navigation.navigate('Home')}>
            <HomeButton fill='#929292' />
            <Text style={styles.buttonText}>Домой</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonArea}
            onPress={() => this.props.navigation.navigate('Scanner', { updateHistory: this.props.route.params.updateHistory })}>
            <ScanButton />
            <Text style={styles.buttonText} >Сканировать</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonArea}>
            {/*onPress={() => this.props.navigation.navigate('Profile')}>*/}
            <ProfileButton fill='#009E4E' />
            <Text style={styles.buttonTextTarget}>Профиль</Text>
          </TouchableOpacity>
        </View>
        )}
      </SafeAreaView>
    )
  }
}


const renderItemIngridient = ({ item }) => {
  return (
    <View style={styles.ingredientBlock}>
      <Text style={styles.ingredientText}>
        {item}
      </Text>
    </View>)
}

