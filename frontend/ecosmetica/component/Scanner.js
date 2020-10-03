import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import ResultScreen from './ResultScreen.js';

const URL = 'http://185.148.82.169:8000';

export default class BarcodeScannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.closeScan = this.props.closeScan;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      data: null,
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

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
          <TouchableOpacity onPress={ this.closeScan }>
            <Image
              style={styles.button}
              source={require('../assets/close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scanArea}>
          { !scanned && <Image
              style={styles.scan}
              source={require('../assets/scan.png')}
            />
          }

          { scanned && 
            <ResultScreen scanAgain={() => this.setState({scanned: false})} data={this.state.data}/>
          }

        </View>
        <View style={styles.footer}>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    await fetch(`${URL}/product/?code=${data}&code_format=${type}`, {
        method: 'GET'
      })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({data: data})
      })
    this.setState({ scanned: true });

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
  }
});