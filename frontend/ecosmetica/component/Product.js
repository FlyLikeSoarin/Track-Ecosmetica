import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Image, 
} from 'react-native';


import { SvgXml } from 'react-native-svg';

import metric11 from '../assets/svg/plant-leaf-with-white-details.svg';
  
const styles = StyleSheet.create({
    product: {
        backgroundColor: '#c7f9cc',
        padding: 10,
        marginVertical: 8,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
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
    },
    image: {
        height: 100,
        width: 100,
    },
    lable: {
      marginBottom: 8,
    },
    metrics: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',   
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
        color: '#467354',
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


          
const Product = ({title, image, lable, metric1}) => {
    return (
        <View style={styles.product}>
          <View style={styles.productImage}>
            <Text style={styles.lable}>{lable}</Text>
            <Image style={styles.image} source={image}></Image>
          </View>
          <View style={styles.productInfo}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text> 
            </View>
                <Text style={styles.metricsText}>{metric1}</Text>
                {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.544795 16.53L1.53778 15.953C1.54878 15.836 0.81978 13.631 2.87878 12.443C4.27578 11.633 6.10578 12.115 6.91378 13.514C7.72378 14.918 7.24977 16.739 5.84777 17.548C3.91877 18.663 2.39978 17.15 2.06378 17.003L1.0708 17.579L1.56778 18.116C2.69778 19.337 4.26777 19.983 5.82977 20C7.32177 20.015 8.85078 19.452 9.99978 18.305C11.1258 19.428 12.6248 20 14.1068 20C15.6908 20 17.2878 19.352 18.4318 18.116L18.8688 17.544L17.8768 16.968L17.5608 17.238C16.6188 18.044 15.2268 18.169 14.1528 17.548C12.7488 16.739 12.2768 14.916 13.0858 13.514C13.8938 12.115 15.7248 11.637 17.1208 12.443C18.1948 13.062 18.7638 14.328 18.5378 15.547L18.5218 15.988L19.5148 16.564L19.7328 15.823C20.5478 13.194 19.4498 10.404 17.0638 9.026C16.5328 8.72 15.9228 8.50499 15.3078 8.38199C15.6708 7.60899 15.8588 6.72601 15.8588 5.85901C15.8588 3.10401 13.9858 0.771987 11.3018 0.161987L10.5858 0.0700073V1.21799L10.9768 1.35699C12.1448 1.76899 12.9298 2.86199 12.9298 4.10199C12.9298 5.71699 11.6148 7.07001 9.99978 7.07001C8.38478 7.07001 7.06979 5.71699 7.06979 4.10199C7.06979 2.86199 7.85579 1.76899 9.02279 1.35699L9.41378 1.14801V0L8.69778 0.161987C6.01478 0.771987 4.14077 3.10401 4.14077 5.85901C4.14077 6.72601 4.32977 7.60899 4.69177 8.38199C4.07677 8.50499 3.46679 8.72 2.93679 9.026C0.549793 10.404 -0.54822 13.233 0.26678 15.862L0.544795 16.53ZM9.99978 9.414C10.9688 9.414 11.7578 10.203 11.7578 11.172C11.7578 12.141 10.9688 12.93 9.99978 12.93C9.03078 12.93 8.24179 12.141 8.24179 11.172C8.24179 10.203 9.03078 9.414 9.99978 9.414Z" fill="#C94052"/>
                </svg> */}
                <Text style={styles.metricsText}>{metric1}</Text>
          </View>
        </View>
    )
}

export default Product;