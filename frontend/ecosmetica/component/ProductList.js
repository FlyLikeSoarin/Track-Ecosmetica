import * as React from 'react';
import * as Font from 'expo-font';
import { useState } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Button, 
    ImageBackground, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    SectionList ,
    FlatList
} from 'react-native';
import { svg } from 'react-native-svg';
import product1img from '../static/lRWynXU__sg.jpg';
import product2img from '../static/250mlbottle_ricewheatshampoo_lg_1_1_1_1 (1).webp';
import Product from './Product'




const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#ffffff',
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


const renderItem = ({item}) => {
    return(
    //   <TouchableOpacity
    //     onPress={() => this.props.navigation.navigate('ProductInfo', {productID: 1})}
    //   >
    <View>
        <Product 
        title={item.title}
        image={item.image} 
        lable={item.lable}
        metric1={item.metric1}/>
    </View>

    //   </TouchableOpacity>
    )
};
const ItemList = ({data}) => {

    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    )
}

export default class ProductList extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        navigation: this.props.navigation,  
        assetsLoaded: false,
        DATA: [
            {
              id: '2',
              title: 'Крем для кожи вокруг глаз с авокадо',
             // image: this.props.img,
              lable: "Khiel's",
              metric1: '50%',
            },
            {
              id: '3',
              title: 'Second Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Third Item',
            },
          ],
      };
    } 
    async componentDidMount(){
    
      await Font.loadAsync({
          'Forum': require('../../assets/fonts/Forum.ttf')
      });
      
        this.setState({ assetsLoaded: true });
    
        /* Кастомизация хедера */
        this.state.navigation.setOptions({ 
          headerTitle: 'Ecosmetica',
          headerStyle: {
            backgroundColor: '#9ae7af',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            fontFamily: 'Forum'
          },
          headerRight: () => (
            <TouchableOpacity onPress={()=> this.state.navigation.navigate('Search')}>
              
            </TouchableOpacity>
          ),
        });
      }

    render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProductInfo', {productID: '1'/*this.state.DATA[0].productID*/})}
            >
                <Product 
                title='Шампунь для объема с экстрактом риса и пшеницы' 
                image={product2img} 
                lable="Khiel's" 
                metric1='50%'/>
            </TouchableOpacity>
            <ItemList data={this.state.DATA}/>

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



