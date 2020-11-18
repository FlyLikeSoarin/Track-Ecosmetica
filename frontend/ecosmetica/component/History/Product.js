import * as React from 'react';
import * as Font from 'expo-font'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import AwesomeAlert from 'react-native-awesome-alerts';

import ImageProductMock from '../../static/bottleMock.jpg'
import StarScore from './StarScore'
import Bookmark from '../../assets/svg/bookmark_6.svg';
import Heart from '../../assets/svg/heart.svg'
import fillHeart from '../../assets/svg/fill-heart.svg'

const URL = 'http://185.148.82.169:8005'

const styles = StyleSheet.create({
  product: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 8,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomColor: '#C4C4C4',
    borderTopColor: '#C4C4C4',
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productInfo: {
    flex: 2,
  },
  productImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 20
  },
  lableText: {
    marginTop: 5,
    marginBottom: 8,
    color: '#606060',
    fontFamily: 'NotoSanaTamilLight',
  },
  metrics: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 20,
    fontSize: 16,
    color: '#4F4F4F',
    fontFamily: 'NotoSanaTamilLight',
  },
  metricsTextWrap: {
    flex: 1,
  },
  metrics: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricText: {
    zIndex: 1,
    paddingLeft: 6,
  },
  metricImage: {
    position: 'absolute',
    top: -6,
    left: -8,
    //backgroundColor: 'red'
  },
  scoreWrap: {
    //backgroundColor: 'green'
  },
  addToFavoritesButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center'
  },
  addToFavoritText: {
    color: '#FFA21F',
    fontSize: 14,
    padding: 16,
    fontFamily: 'NotoSanaTamilLight',
    fontWeight: 'bold'
  },
});

const RenderImage = ({ image }) => {
  //console.log(image)
  if (image !== '') return <Image style={styles.image} source={{ uri: image }}></Image>
  else return <Image style={styles.image} source={ImageProductMock}></Image>
}

function colorScore(score) {
  if (0 <= score && score <= 4) {
    return '#FF4D00'
  } else if (5 <= score && score <= 7) {
    return '#FFA21F'
  } else if (8 <= score && score <= 10) {
    return '#009E4E'
  } else {
    return '#C4C4C4'
  }
}

const ImageScore = ({ image, score }) => {

  let localScore = 0
  if (score >= 0)
    localScore = score
  return (
    <View style={styles.scoreWrap}>
      <View style={styles.metricImage}>
        <SvgXml xml={image} width={40} height={40} fill={colorScore(score)} />
      </View>
      <View style={styles.metricText}>
        <Text style={{ color: '#323131' }}>{localScore}</Text>
      </View>
    </View>
  )
}

/*const addToFavorites = async ({ barcode, favorite, token }) => {
  const prevIsFavoite = favorite
  //const isFavorite = !prevIsFavoite
  // this.setState({
  //     isFavorite: !prevIsFavoite
  // })
  if (token !== null) {
    let body = {}
    if (prevIsFavoite) {
      body = {
        in_favorite: false
      }
    }
    await fetch(`${URL}/product/make_favorite/?code=${barcode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: body
    })
      .then((resp) => {
        console.log(resp.status)
        return resp.json()
      })
      .then((ans) => {
        console.log(ans)
      })
      .catch(() => {
        console.log("fail add to favorite")
      })
  } else {
    setShowAuthError(true)
  }
}*/

const Product = ({ title, image, lable, metric1, favorite, barcode, token, isAddFovoriteShown }) => {
  //console.log("barcode1", barcode)
  const barcode2 = barcode
  const [favorite2, setFavorite2] = React.useState(favorite)
  let token2 = null;

  React.useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
      });

      try {
        token2 = await AsyncStorage.getItem('token')
      } catch (e) {
        console.log(e)
      }
    }

    loadFont()
  }, []);

  const [showAuthError, setShowAuthError] = React.useState(false)

  const addToFavorites = async () => {
    try {
      token2 = await AsyncStorage.getItem('token')
    } catch (e) {
      console.log(e)
    }
    const prevIsFavoite = favorite2
    //const isFavorite = !prevIsFavoite
    // this.setState({
    //     isFavorite: !prevIsFavoite
    // })
    console.log(token2)
    if (token2 !== null) {
      let body = {}
      if (prevIsFavoite) {
        body = {
          in_favorite: false
        }
        setFavorite2(false)
      } else {
        setFavorite2(true)
      }

      console.log("body", body)
      await fetch(`${URL}/product/make_favorite/?code=${barcode2}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token2}`,
        },
        body: JSON.stringify(body)
      })
        .then((resp) => {
          console.log(resp.status)
          return resp.json()
        })
        .then((ans) => {
          console.log(ans)
        })
        .catch(() => {
          console.log("fail add to favorite")
        })
    } else {
      setShowAuthError(true)
    }
  }

  return (
    <View style={styles.product}>
      <View style={styles.productImage}>
        <RenderImage image={image} />
      </View>
      <View style={styles.productInfo}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.lableText}>{lable}</Text>
        </View>
        {/* {StarScore(metric1, styles.metrics, 20)} */}
        {isAddFovoriteShown && (
          <TouchableOpacity style={styles.addToFavoritesButton}
            onPress={() => addToFavorites()}
          >
            {!favorite2 && (<SvgXml xml={Heart} width={26} height={26} />)}
            {favorite2 && <SvgXml xml={fillHeart} width={26} height={26} />}
            <Text style={styles.addToFavoritText}>
              в избранное
            </Text>
          </TouchableOpacity>)}
      </View>
      <View style={{ flex: 0.3 }}>
        <ImageScore image={Bookmark} score={metric1} />
      </View>
      <AwesomeAlert
        show={showAuthError}
        showProgress={false}
        title="Вы не авторизованны"
        message="Опция доступна только авторизованным пользователям"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#009E4E"
        onConfirmPressed={() => {
          setShowAuthError(false)
        }}
      />
    </View>
  )
}

export default Product;