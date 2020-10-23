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
  FlatList,
  ScrollView,
  AsyncStorage,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { svg } from 'react-native-svg';
import product1img from '../static/lRWynXU__sg.jpg';
import product2img from '../static/250mlbottle_ricewheatshampoo_lg_1_1_1_1 (1).webp';
import Product from './Product'
import ImageProductMock from '../static/EEyMAHcCfnE.jpg'
//import DATA from '../static/BackendDataSimulator'
import EmtyHistory from './EmptyHistory'

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    overflow: 'hidden',
    flex: 10,
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
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    justifyContent: 'space-around',
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#467354',
    fontFamily: 'NotoSanaTamilLight',
  },
  metricsText: {
    fontSize: 16,
    color: '#467354',
    margin: 2,
    fontFamily: 'NotoSanaTamilLight',
  },
  buttonMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#9ae7af',
  },
  buttonImage: {
    color: '#9ae7af',
  },
  img: {
    width: 80,
    height: 80,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'NotoSanaTamilLight',
  },
  header: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#929292',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#929292',
    fontSize: 30,
    marginTop: 10,
    fontFamily: 'NotoSanaTamilLight',
  }
});

const URL = 'http://185.148.82.169:8005/';

const ItemList = ({ data, renderItem, isEmpty }) => {
  if (isEmpty)
    return (<EmtyHistory />)
  else
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => { item.name /*+ Math.floor(Math.random()*1000000000000)*/ }}
        />
      </SafeAreaView>)
}

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      assetsLoaded: false,
      isGet: false,
      data: [],
      isEmptyList: true,
      token: this.props.token
    }
  }

  handlePress = (id) => { this.props.navigation.navigate('ProductInfo', { productID: id }) }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
      // onPress={this.handlePress(item.name)}
      >
        <View>
          <Product
            title={item.name}
            image={item.img_url}
            lable={item.brand_name}
            metric1={item.total_score} />
        </View>
      </TouchableOpacity>
      //
    )
  };

  handleData = async () => {
    await fetch(`${URL}product/history/`, {
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
          })
        }
        this.setState({ data: data });
      })
    this.setState({ isGet: true });
    setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  }

  async componentDidMount() {

    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    /* Кастомизация хедера */
    /*this.state.navigation.setOptions({
      headerShown: false
    });*/
    this.handleData();
  }


  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            {/* <ScrollView> */}
            {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProductInfo', {productID: '1'})}
            >
                <Product 
                title='Шампунь для объема с экстрактом риса и пшеницы' 
                image={product2img} 
                lable="Khiel's" 
                metric1='50%'/>
            </TouchableOpacity> */}
            {/* <SafeAreaView style={styles.container}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => {item.name }}
              />
          </SafeAreaView>*/}
            <ItemList data={this.state.data} renderItem={this.renderItem} isEmpty={this.state.isEmptyList} />
            {/* </ScrollView> */}
          </View>

          {/* Footer */}
          { /*<View style={styles.buttonMenuContainer}>
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
        </View>   */}
        </View>
      );
    } else {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
    }
  }

}


