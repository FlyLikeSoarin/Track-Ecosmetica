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

const ItemList = ({ data, renderItem, isEmpty, navigation }) => {
  if (isEmpty)
    return (<EmtyHistory navigation={navigation}/>)
  else
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => { return(item.name+index) }}
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
      data: this.props.data,
      isEmptyList: true,
      token: this.props.token,
    }
    this.initData = this.initData.bind(this)
  }

  initData = () => {
    console.log('init', this.state.data.length)
    this.setState({isEmptyList:(this.state.data.length === 0)})
  }


  //handlePress = (props) => this.props.navigation.navigate('ProductInfo', {name: props.name})

  renderItem = ({ item }) => {
    //let array_ing = JSON.parse(item.ingredients)
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Product', { data_: item, barcode: null })}
      >
        <View>
          <Product
            title={item.name}
            key={item.name}
            image={item.img_url}
            lable={item.brand_name}
            metric1={item.total_score} />
        </View>
      </TouchableOpacity>
    )
  };

  // handleData = async () => {
  //   await fetch(`${URL}product/history/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${this.state.token}`,
  //     },
  //   })
  //     .then((resp) => {
  //       //console.log(resp.status)
  //       return resp.json()
  //     })
  //     .then((data) => {
  //       //console.log(data)
  //       if (data.length !== 0) {
  //         this.setState({
  //           isEmptyList: false
  //         })
  //       }
  //       this.setState({ data: data });
  //     })
  //   this.setState({ isGet: true });
  //   setTimeout(() => this.setState({ assetsLoaded: true }), 500)
  // }

  async componentDidMount() {
    console.log('product list did mount')

    await Font.loadAsync({
      'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
    });

   this.initData();
   console.log(this.state.isEmptyList)
   console.log(this.state.data);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('product list updating')
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data,
        isEmptyList: this.props.data.length == 0
      })
    }
    //console.log(this.state.data)
  } 
  handleUpdate() {
    let isUpd = this.state.isUpdated
    this.setState({isUpdated: !isUpd})
  }

  render() {
    console.log('render productlist', this.state.data)

    //if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            {/*this.state.isEmptyList && <EmtyHistory navigation={this.state.navigation}/>*/}
          <ItemList 
            data={this.state.data} 
            renderItem={this.renderItem} 
            isEmpty={this.state.isEmptyList}
            navigation={this.state.navigation} />
          </View>
        </View>
      );
    // } else {
    //   return (
    //     <View style={styles.loading}>
    //       <ActivityIndicator />
    //       <StatusBar barStyle="default" />
    //     </View>
    //   )
    // }
  }

}


