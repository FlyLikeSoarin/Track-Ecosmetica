import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import BarcodeImage from './Scanner/Barcodeimage'
import CrossButton from './Button/CrossButton'

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
      token: null
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
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned, scannedQRCode } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>

        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.state.navigation.navigate('Home') }>
            <CrossButton />
          </TouchableOpacity>
        </View>
        <View style={styles.scanArea}>
          <BarcodeImage />
        </View>
        <View style={styles.footer}>
          {scannedQRCode && <Text style={styles.alert}>Данный формат не поддерживается</Text>}
        </View>
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true
    })
    let notFound = false;
    const token = this.state.token
    await fetch(`${URL}/product/?code=${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp)
        console.log(resp.status)
        console.log(token)
        if(resp.status === 200) {
          return resp.json()
        }
        else {
          notFound = true
        }
      })
      .then((ans) => {
        console.log(ans)
        if (type !== 'org.iso.QRCode') {
          if (notFound) {
            this.state.navigation.navigate('ProductNotFound', {type: type, data: data});
          } else {
            this.state.navigation.navigate('Product', {type: type, data_: ans, barcode: data});
          }
        }
        else {
          this.setState({
            scannedQRCode: true
          })
          setTimeout(() => this.setState({scannedQRCode: false}), 3000)
        }
        this.setState({
          scanned: false
        })
      })
    }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
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
    fontFamily: 'Forum',
    textAlign: 'center',
  }
});