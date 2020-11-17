import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';

import { BarCodeScanner } from 'expo-barcode-scanner';

import BarcodeImage from './Scanner/Barcodeimage'
import Back from './Button/BackButton'

const URL = 'http://185.148.82.169:8005';

export default class BarcodeScannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      navigation: this.props.navigation,
      scanned: false,
      scannedQRCode: false,
      data: null,
      token: null,
      fallServer: false,
      history: [],
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();

    this.state.navigation.setOptions({
      headerShown: false
    })

    let token = null
    try {
      token = await AsyncStorage.getItem('token');
    } catch(e) {
      console.log(e)
    }
    if (token !== null) {
      this.setState({
        token: token
      })
    }
    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });
    try{
      let history = await AsyncStorage.getItem('history');
      this.setState({history: JSON.parse(history)})
      //console.log('get history from async in scanner', history)
    } catch (e) {
      console.log(e)
    }
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  showAlertServer = () => {
    this.setState({
        fallServer: true
    });
}

hideAlertServer = () => {
    this.setState({
        fallServer: false
    });
}

handlerBack() {
  //this.props.route.params.updateHistory()
  this.state.navigation.navigate('Home')
}

  render() {
    const { hasCameraPermission, scanned, scannedQRCode, fallServer } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>

        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />

        <View style={styles.header}>
          <TouchableOpacity 
            onPress={()=>this.handlerBack()}
            //onPress={() => this.state.navigation.navigate('Home') }
            >
            <Back />
          </TouchableOpacity>
        </View>
        <View style={styles.scanArea}>
          <BarcodeImage />
        </View>
        <View style={styles.footer}>
          {scannedQRCode && <Text style={styles.alert}>Данный формат не поддерживается</Text>}
        </View>
        <AwesomeAlert
                            show={fallServer}
                            showProgress={false}
                            title="Сервер недоступен"
                            message="Повторите поытку через некоторе время"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={false}
                            showConfirmButton={true}
                            confirmText="OK"
                            confirmButtonColor="#009E4E"
                            onConfirmPressed={() => {
                                this.hideAlertServer();
                            }}
                        />
      </SafeAreaView>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true
    })
    let notFound = false;
    let notFoundOnEWG = false
    const token = this.state.token
    let header = null
    let serverError = false

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
    console.log('scanner')
    await fetch(`${URL}/product/?code=${data}`, {
        method: 'GET',
        headers: header
      })
      .then((resp) => {
        /*console.log(resp)
        console.log(resp.status)
        console.log(token)*/
        console.log(resp.status)
        /*console.log(resp)*/
        if(resp.status === 200) {
          return resp.json()
        }
        if(500 <= resp.status && resp.status <= 526 ){
          //serverError = true
        }
        if(400 <= resp.status && resp.status <= 499) {
          notFound = true
        }
      })
      .then((ans) => {
        console.log(ans)
        if (type !== 'org.iso.QRCode') {
          if (!notFound && ans.ingredients === "") {
            notFoundOnEWG = true
          }
          if (serverError) {
            this.showAlertServer()
          }
          else if (notFound || notFoundOnEWG) {
            let product = {}
            if (notFoundOnEWG) {
              product = {
                barcode: data,
                name: ans.name,
                brand: ans.brand_name
              }
            } else {
              product = {
                barcode: data,
                name: null,
                brand: null
              }
            }
            this.state.navigation.navigate('ProductNotFound', {type: type, data: product});
          } 
          else {
            const oldHistory = (this.state.history==null)?[]:this.state.history;
            const newHistory = oldHistory.concat([{
              product: ans,
              barcode: data
            }]);
            console.log('newHistory', newHistory)
            AsyncStorage.setItem('history', JSON.stringify(newHistory))
            //console.log(newHistory)
            this.props.route.params.updateHistory(newHistory)
            //this.state.navigation.navigate('Home')
            this.state.navigation.navigate('Product', {type: type, data_: ans, barcode: data});
          }
        }
        else {
          this.setState({
            scannedQRCode: true
          })
          setTimeout(() => this.setState({scannedQRCode: false}), 3000)
        }
        setTimeout(() => this.setState({
          scanned: false
        }), 5000)
      })
      /*.catch((err) => {
        this.showAlertServer()
      }) */
    }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    paddingTop: 30
  },
  scanArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  button: {
    margin: 20,
    width: 50,
    height: 50,
  },
  scan: {
    width: 150,
    height: 150,
  },
  alert: {
    color: "white",
    fontSize: 30,
    fontFamily: 'NotoSanaTamilLight',
    textAlign: 'center',
  }
});