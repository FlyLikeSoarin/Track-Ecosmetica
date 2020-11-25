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

const URL = 'http://185.148.82.169:8005';

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

//const URL = 'http://185.148.82.169:8005/';

const ItemList = ({ data, renderItem, isEmpty, navigation, updateHistory }) => {
  if (isEmpty)
    return (<EmtyHistory navigation={navigation} updateHistory={updateHistory}/>)
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
    //this.initData = this.initData.bind(this)
  }

  async openProductInfo(item) {
    let header = null
    let token = this.state.token
    if (token === null) {
      header = {
        'Content-Type': 'application/json',
      }
    } else {
      header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    }
    await fetch(`${URL}/product/?code=${item.barcode}`, {
      method: 'GET',
      headers: header
    })
    .then((resp) => {
      return resp.json()
    })
    .then((ans) => {
      function compare( a, b ) {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;
      }

      ans.ingredients.sort(compare)
      this.props.navigation.navigate('Product', { data_: ans, barcode: item.barcode, updateHistory: this.props.updateHistory })
    })
  }


  renderItem = ({ item }) => {
    //console.log("//////////////////////////")
    //console.log(item)
    return (
      <TouchableOpacity
        onPress={() => this.openProductInfo(item)}
      >
        <View>
          <Product
            title={item.product.name}
            key={item.barcode}
            image={item.product.img_url}
            lable={item.product.brand_name}
            metric1={item.product.total_score} 
            favorite={item.product.favorite}
            barcode={item.barcode}
            token={this.state.token}
            isAddFovoriteShown={true}
            />
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
    //console.log('product list did mount')

    await Font.loadAsync({
      'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
    });
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('product list updating')
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data,
        isEmptyList: this.props.data.length == 0,
        token: this.props.token
      })
    }
    //console.log(this.state.data)
  } 
  handleUpdate() {
    let isUpd = this.state.isUpdated
    this.setState({isUpdated: !isUpd})
  }

  render() {

    //if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            {/*this.state.isEmptyList && <EmtyHistory navigation={this.state.navigation}/>*/}
          <ItemList 
            data={this.state.data} 
            renderItem={this.renderItem} 
            isEmpty={this.state.isEmptyList}
            navigation={this.state.navigation}
            updateHistory={this.props.updateHistory} />
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



