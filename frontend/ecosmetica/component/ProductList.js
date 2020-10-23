import * as React from 'react';
import * as Font from 'expo-font';
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
import Product from './Product'
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

  // handlePress = ({item}) => {this.props.navigation.navigate('ProductInfo', {
  //   name: item.name, 
    //brand_name: item.brand_name,
    // img_url: item.img_url,
    // description: item.description,
    // ingredients: item.ingredients,
    // eco_score: item.eco_score,
    // safety_score: item.safety_score,
    // zoo_score: item.zoo_score,
    // total_score: item.total_score,
  //})}

  //handlePress = (props) => this.props.navigation.navigate('ProductInfo', {name: props.name})

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
       //onPress={this.handlePress(item)}
       onPress={() => this.props.navigation.navigate('ProductInfo', {name: item.name})}
      >
        <View>
          <Product
            title={item.name}
            image={item.img_url}
            lable={item.brand_name}
            metric1={item.total_score} />
        </View>
      </TouchableOpacity>
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

  // async componentDidUpdate() {
  //   this.handleData();
  // }

  render() {
    const { assetsLoaded } = this.state;

    if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <ItemList data={this.state.data} renderItem={this.renderItem} isEmpty={this.state.isEmptyList} />
          </View>
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



