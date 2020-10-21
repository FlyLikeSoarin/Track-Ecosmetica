import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
} from 'react-native';

import ImageProductMock from '../static/bottleMock.jpg'
import Star from './Button/Star'
  
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
    },
    metricsText: {
        fontSize: 16,
        color: '#FFA21F',
        margin: 2,
    },
});

/*const starSvg = (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#FFA21F"/>
        <path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#FFA21F"/>
      </svg>
)*/


const RenderImage = ({image}) => {
  if (image!=='') return <Image style={styles.image} source={{uri:image}}></Image>
  else return <Image style={styles.image} source={ImageProductMock}></Image>   
}

// const RenderMetric = ({score}) => { 
// //   const result = Array(score).forEach((item, index)=>{
// //     return(starSvg) 
// //   });
// // return <View>{result}</View>;
// if (score>4) return starSvg
// else return {starSvg}
  

// }
const Product = ({title, image, lable, metric1}) => {
  const starsScore = Math.floor(metric1/2);

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
            <View style={styles.metrics}>             
              {/*{starSvg}
              {starSvg}
              {starSvg}
              {starSvg}
    {starSvg}*/}
    <Star />
              {/* <RenderMetric score={starsScore}/> */}
              <Text style={styles.metricsText}>{starsScore}</Text>
            </View>
          </View>
        </View>
    )
}

export default Product;