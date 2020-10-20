import * as React from 'react';
import * as Font from 'expo-font';
import { useState } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    FlatList
} from 'react-native';
import { svg } from 'react-native-svg';
import product1img from '../static/lRWynXU__sg.jpg';
import product2img from '../static/250mlbottle_ricewheatshampoo_lg_1_1_1_1 (1).webp';
import Product from './Product'
import ImageProductMock from '../static/EEyMAHcCfnE.jpg'

const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    body: {
      flex: 6,
    },
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
        justifyContent: 'center',
        //alignItems: 'center',
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
      justifyContent: 'space-arownd',   
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

    // item:{
    //     padding: 20,
    //     marginVertical: 8,
    //     backgroundColor: '#9ae7af',
    // },
});

const URL = 'http://185.148.82.169:8005/';
const productData = {
    productID: 1,
    name: 'Шампунь для объема с экстрактом риса и пшеницы',
    lable: "Khiel's",
    img_url: {product2img},
    eco_score: 98,
    safety_score: 20,
    env_score: 10,
    our_score: 9,
    ingridients: [],
    description: '',
}

// const renderItem = ({item, onPress}) => {
//     return(
//       <TouchableOpacity
//         onPress={onPress}>
//         <View>
//             <Product 
//             title={item.name}
//             image={item.image} 
//             lable={item.brand_name}
//             metric1={item.metric1}/>
//         </View>
//       </TouchableOpacity>
//     )
// };
// const ItemList = ({data}) => {

//     return(
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => {item.name /*+ Math.floor(Math.random()*1000000000000)*/}}
//         />
//       </SafeAreaView>
//     )
// }

export default class ProductList extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        navigation: this.props.navigation,  
        assetsLoaded: false,
        isGet: false,
        data: [
          {
            "name": "Silkygirl blusher 01 (nectar blush)",
            "brand_name": "Silkygirl",
            "img_url": "",
            "description": "",
            "ingredients": "",
            "eco_score": -1,
            "safety_score": -1,
            "zoo_score": -1,
            "total_score": -1,
           // "onPress": this.handlePress,
          },
          {
            "name": "Silkofix лейкопластырь на ткан осн 1.25x 500см/тел",
            "brand_name": "",
            "img_url": "",
            "description": "",
            "ingredients": "",
            "eco_score": -1,
            "safety_score": -1,
            "zoo_score": -1,
            "total_score": -1,
            //"onPress": this.handlePress,
        },
        ],
      };
    } 

    handlePress = (id) => {this.props.navigation.navigate('ProductInfo', {productID: id})}

    renderItem = ({item}) => {
      return(
        <TouchableOpacity
          // onPress={this.handlePress(item.name)}
          >
          <View>
              <Product 
              title={item.name}
              image={item.image} 
              lable={item.brand_name}
              metric1={item.metric1}/>
          </View>
        </TouchableOpacity>
      )
  };

    handleData = async () => {
      await fetch(`${URL}product/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({data: data});
        })
      this.setState({isGet: true});
    }

    async componentDidMount(){
    
      
        this.setState({ assetsLoaded: true });
    
        /* Кастомизация хедера */
        this.state.navigation.setOptions({ 
          headerTitle: 'История',
          // headerStyle: {
          //   backgroundColor: '#9ae7af',
          // },
          // headerTintColor: '#fff',
          headerTitleStyle: {
            //fontWeight: 'bold',
            //fontSize: 30,
            fontFamily: 'Forum'
          },
          headerRight: () => (
            <TouchableOpacity onPress={()=> this.state.navigation.navigate('Search')}>
              
            </TouchableOpacity>
          ),
        });
        this.handleData();
      }

    render() {
    return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text>{this.state.isGet}</Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProductInfo', {productID: '1'})}
            >
                <Product 
                title='Шампунь для объема с экстрактом риса и пшеницы' 
                image={product2img} 
                lable="Khiel's" 
                metric1='50%'/>
            </TouchableOpacity>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => {item.name /*+ Math.floor(Math.random()*1000000000000)*/}}
              />
            </SafeAreaView>
            {/* <ItemList data={this.state.data}/> */}
          </View>
            
            {/* Footer */}
            <View style={styles.buttonMenuContainer}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Scanner')}
                >
                
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
}



