import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import BarcodeImage from './Scanner/Barcodeimage'
import CrossButton from './Button/CrossButton'

const URL = 'http://185.148.82.169:8000';

export default class BarcodeScannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      navigation: this.props.navigation,
      scanned: false,
      scannedQRCode: false,
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();

    this.state.navigation.setOptions({
      headerShown: false
    })
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
    /* await fetch(`${URL}/product/?code=${data}&code_format=${type}`, {
        method: 'GET'
      })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({data: data})
      })
    this.setState({ scanned: true }); */
    const _data = {
      product: data,
      code: 200
    }
    if (type !== 'org.iso.QRCode') {
      if (_data.code === 200) {
        this.state.navigation.navigate('Product', {type: type, data: _data.product, barcode: data});
      } else {
        this.state.navigation.navigate('ProductNotFound', {type: type, data: data});
      }
    }
    else {
      this.setState({
        scannedQRCode: true
      })
      setTimeout(() => this.setState({scannedQRCode: false}), 3000)
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

}

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