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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileImageMock from './Button/ProfileImageMock';
import Star from './Button/Star'

/*Buttons*/
import HomeButton from './Button/HomeButton'
import ScanButton from './Button/ScanButton'
import ProfileButton from './Button/ProfileButton'
import BackButton from './Button/BackButton'
import ProductList from './History/ProductList'
import Product from './History/Product'

import AwesomeAlert from 'react-native-awesome-alerts';

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005'


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
  productImage: {
    flex: 4,
  },
  logInText: {
    color: '#009E4E',
    fontFamily: 'NotoSanaTamilLight',
  },
  header: {
    flex: 0.6,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#C4C4C4',
    borderTopColor: '#C4C4C4',
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
tabsArea: {
  flexDirection: 'row',
  height: 40,
  //flex: 1,
},
ingregients: {
  flex:2,
  flexDirection:'column',
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
  fontSize: 12,
  fontWeight: 'bold'
},
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
      first_name: 'Имя',
      last_name: 'Фамилия',

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
      isUpdated: false,
      isInputIngsShown: false,
      isEmptyList: false,
    };
    this.setToken = this.setToken.bind(this);
  }

  handleData = async () => {
    /*await fetch(`${URL}product/history/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.token}`,
      },
    })
      .then((resp) => {
        console.log(resp.status)
        return resp.json()
      })
      .then((data) => {
        console.log(data)
        if (data.length !== 0) {
          this.setState({
            isEmptyList: false
          });
        }
        this.setState({ favourites: data });
      })*/
    setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  }

  async componentDidMount() {
    console.log('cmponentDodMount')
    console.log(this.state.token)
    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    let token = null
    try {
      token = await AsyncStorage.getItem('token');
      console.log('Profile', token)
    } catch(e) {
      console.log(e)
    }
    if (token !== null) {
      this.setState({
        token: token,
        iconLogoutColor: '#C4C4C4'
      })
      await fetch(`${URL}/product/make_favorite/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      })
      .then((resp) => {
        console.log(resp.status)
        return resp.json()
      })
      .then((ans) => {
        console.log(ans)
        this.setState({
          favourites: ans
        })
      })
    }

    this.loadUserInfo() 

    // await fetch(`${URL}product/history/`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${this.state.token}`,
    //   },
    // })
    //   .then((resp) => {
    //     console.log(resp.status)
    //     return resp.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     this.setState({ favourites: data });
    //   })
    //   .catch(e=>
    //     console.log('profile catch', e))
    this.handleData();

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
        fontSize: 18,
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
    
    setTimeout(() => {
      this.setState({ assetsLoaded: true });
      //console.log('profile')
      //console.log(this.state.token)
    }, 1500);

  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('profileDidUpdate')
    if (prevState.token !== this.state.token) {
      this.loadUserInfo() 
    }
  }

  async loadUserInfo() {
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
      this.setState({first_name: ans.first_name, last_name: ans.last_name})
      const username = ans.first_name + ' ' + ans.last_name
      try {
        AsyncStorage.removeItem('username');
      } catch(e) {
        console.log(e)
      }
      try {
        AsyncStorage.setItem('username', username)
      } catch(e) {
        console.log(e)
      }
    })
    .catch(e=>console.log(e))
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
    this.state.navigation.navigate('Profile')
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

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        //onPress={() => this.props.navigation.navigate('Product', { data_: item, barcode: null })}
      >
        <View>
          <Product
            title={item.name}
            key={item.name}
            image={item.img_url}
            lable={item.brand_name}
            metric1={item.total_score} 
            isAddFovoriteShown={false}/>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const { first_name, last_name, ingridients, favourites } = this.state
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
                <ProfileImageMock />
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
                    Нежелательные ингридиенты
                  </Text>
                </TouchableOpacity>
              </View>
                {!this.state.showIngridients && (
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
                      keyExtractor={(item, index) => { return(item.name+index) }}
                    />                   
                  </SafeAreaView>
                </View>
                )}
                        {this.state.showIngridients && (
                            <View style={styles.reviews}>
                                {ingridients.length === 0 && (
                                    <View style={styles.wrapEmptyReviewText}>
                                        <Text style={styles.emptyReviewsText}>
                                        Нажмите на кнопку, чтобы выбрать нежелательные ингридиенты
                                        </Text>
                                    </View>
                                )}
                                <SafeAreaView style={styles.scroll}>
                                    <FlatList
                                        style={styles.innerScroll}
                                        data={ingridients}
                                        key={item => { item.text }}
                                        renderItem={renderItemIngridient}
                                    />
                                  <View style={styles.infoWrap}>
                                    {this.state.isInputIngsShown&&<TextInput></TextInput>}
                                    <ButtonTemplate
                                      title='Исключить ингридиент'
                                      style={styles.buttonAddBefore}
                                      styleText={styles.buttonTextBefore}
                                      onPress={() => this.setState({isInputIngsShown: true})} />
                                  </View>
                                </SafeAreaView>
                            </View>
                        )}
            </View>
        </View>)}
        {/*FOOTER*/ }
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
            <Text style={styles.buttonTextTarget}>Профиль</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )}
}

const renderItemIngridient=({item}) => {
  return (
    <View style={styles.ingredientBlock}>
      <Text style={styles.ingredientText}>
        {item}
      </Text>
    </View>)
}

