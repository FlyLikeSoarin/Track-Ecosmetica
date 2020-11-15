import * as React from 'react';
import * as Font from 'expo-font'
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
} from 'react-native';
import ImageProductMock from '../../static/bottleMock.jpg'
import StarScore from './StarScore'
  
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
});

const RenderImage = ({image}) => {
  //console.log(image)
  if (image!=='') return <Image style={styles.image} source={{uri: image}}></Image>
  else return <Image style={styles.image} source={ImageProductMock}></Image>   
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
        </View>
    )
}

export default Product;