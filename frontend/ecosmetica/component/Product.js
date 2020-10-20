import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
} from 'react-native';


import { SvgXml } from 'react-native-svg';
import ImageProductMock from '../static/bottleMock.jpg'
import Star from './Button/Star'

import metric11 from '../assets/svg/plant-leaf-with-white-details.svg';
  
const styles = StyleSheet.create({
    product: {
        backgroundColor: '#c7f9cc',
        padding: 10,
        marginVertical: 8,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
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
    lable: {
      marginBottom: 8,
    },
    metrics: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
    },
    title: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 16,
      color: '#467354',
    },
    metricsText: {
        fontSize: 16,
        color: '#FFA21F',
        margin: 2,
    },
});

// function M1() {
//   return(
//     <View>
//       <SvgXml width="20" height="20" xml={metric11}/>
//     </View>
    
//   )
// }

/*const starSvg = (
<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#FFA21F"/>
<path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#FFA21F"/>
</svg>
)*/

const renderImage = ({image}) => {
  if (image!=='undefined') 
    return <Image style={styles.image} source={image}></Image>
  else 
    return <Image style={styles.image} source={ImageProductMock}></Image>
}
      
const Product = ({title, image, lable, metric1}) => {
    return (
        <View style={styles.product}>
          <View style={styles.productImage}>
          {/* { console.log(image)} */}
          {<Image style={styles.image} source={ImageProductMock}></Image>}
          {/* {(image==='undefined')&&<Image style={styles.image} source={ImageProductMock}></Image>} */}
          {/* {renderImage(image)} */}
          </View>
          <View style={styles.productInfo}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text> 
              <Text style={styles.lable}>{lable}</Text>
            </View>
            <View style={styles.metrics}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
                <Text style={styles.metricsText}>4.0</Text>
            </View>
          </View>
        </View>
    )
}

export default Product;