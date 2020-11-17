import * as React from 'react';
import * as Font from 'expo-font'
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
    ImageBackground
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import ImageProductMock from '../../static/bottleMock.jpg'
import StarScore from './StarScore'
import Bookmark from '../../assets/svg/bookmark_6.svg';
  
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
    },
    metricImage: {
      position: 'absolute',
      top: -4,
      left: -14,
      //backgroundColor: 'red'
    },
    scoreWrap: {
      //backgroundColor: 'green'
    }
});

const RenderImage = ({image}) => {
  //console.log(image)
  if (image!=='') return <Image style={styles.image} source={{uri: image}}></Image>
  else return <Image style={styles.image} source={ImageProductMock}></Image>   
}

function colorScore(score){
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

const ImageScore = ({image, score}) => {

  let localScore = 0
  if (score>=0) 
    localScore = score
  return(
    <View style={styles.scoreWrap}>
      <View style={styles.metricImage}>
        <SvgXml xml={image} width={40} height={40} fill={colorScore(score)}/>
      </View>
      <View style={styles.metricText}>
        <Text style={{color: '#323131'}}>{localScore}</Text>
      </View>
    </View>
  )
}

const Product = ({title, image, lable, metric1}) => {

  React.useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
      });
    }

    loadFont()
  }, []);

  return (
        <View style={styles.product}>
          <View style={styles.productImage}>
            <RenderImage image={image}/>
          </View>
          <View style={styles.productInfo}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text> 
              <Text style={styles.lableText}>{lable}</Text>
            </View>          
            {StarScore(metric1, styles.metrics, 20)}
          </View>
            <ImageScore image={Bookmark} score={metric1}/>
        </View>
    )
}

export default Product;