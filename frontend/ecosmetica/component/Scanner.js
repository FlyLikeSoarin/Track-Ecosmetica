import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, SafeAreaView, Modal, Dimensions, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { BarCodeScanner } from 'expo-barcode-scanner';

import BarcodeImage from './Scanner/Barcodeimage'
import Back from './Button/BackButton'
import Cross from './Button/CrossButton'

const URL = 'http://185.148.82.169:8005';

var width = Dimensions.get('window').width;
Font.loadAsync({
  'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
});

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
      modalVisible: false
    };

    this.handleBarcode = this.handleBarcode.bind(this)
  }

  async componentDidMount() {
    let history = null
    try {
      history = await AsyncStorage.getItem('history');
      //console.log('get history from async in scanner', history)
    } catch (e) {
      console.log(e)
    }
    if (history !== null)
      this.setState({ history: JSON.parse(history) })

    this.getPermissionsAsync();

    this.state.navigation.setOptions({
      headerShown: false
    })

    let token = null
    try {
      token = await AsyncStorage.getItem('token');
    } catch (e) {
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
    const { hasCameraPermission, scanned, scannedQRCode, fallServer, modalVisible } = this.state;

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
            onPress={() => this.handlerBack()}
          >
            <Back />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconArea}
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Icon name="keyboard" color='#fff' size={30} />
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("close")
          }}
        >
          {/*<View style={styles.container}>*/}
          <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.container}
                >
          <View style={styles.inputArea}>
            <View style={styles.headerInput}>
              <View style={styles.textWrap}>
                <Text style={styles.titleText}>
                  Введите штрих-код
                        </Text>
              </View>
              <TouchableOpacity style={styles.closeButtonArea}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Cross fill='#929292'/>
              </TouchableOpacity>
            </View>
            <View style={styles.bodyInput}>
              <TextInput style={styles.input}
                value={this.state.data}
                placeholder='Штрих-код'
                placeholderTextColor="#8B8B8B"
                autoCapitalize="none"
                onChangeText={this.handleBarcode} />
              <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button}
                  onPress={() => {
                    this.handleBarCodeScanned({type: "NaN", data: this.state.data})
                    this.setState({modalVisible: false})
                  }
                  }
                >
                  <Text style={styles.buttonText}> Найти </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </KeyboardAvoidingView>
          {/*</Modal></View>*/}
        </Modal>
      </SafeAreaView>
    );
  }
  handleBarcode(text) {
    this.setState({
      data: text
    })
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
    console.log(data)
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
        if (resp.status === 200) {
          return resp.json()
        }
        if (500 <= resp.status && resp.status <= 526) {
          //serverError = true
        }
        if (400 <= resp.status && resp.status <= 499) {
          notFound = true
        }
      })
      .then((ans) => {
        console.log(ans)
        if (type !== 'org.iso.QRCode') {
          if (!notFound && ans.ingredients.length === 0) {
            notFoundOnEWG = true
            console.log("not found on ewg")
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
            this.state.navigation.navigate('ProductNotFound', { type: type, data: product, updateHistory: this.props.route.params.updateHistory });
          }
          else {
            function compare(a, b) {
              if (a.score < b.score) {
                return 1;
              }
              if (a.score > b.score) {
                return -1;
              }
              return 0;
            }
            ans.ingredients.sort(compare)
            this.state.navigation.navigate('Product', { type: type, data_: ans, barcode: data, updateHistory: this.props.route.params.updateHistory });
          }
        }
        else {
          this.setState({
            scannedQRCode: true
          })
          setTimeout(() => this.setState({ scannedQRCode: false }), 3000)
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
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  iconArea: {
    marginRight: 20
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
  },
  /*****modal */
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
},
  inputArea: {
    backgroundColor: '#fff',
    width: width - 100,
   //height: width - 100,
    borderRadius: 10,
    alignItems: 'center'
  },
  headerInput: {
    flexDirection: 'row',
  },
  textWrap: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    fontFamily: 'NotoSanaTamilLight',
    fontSize: 18,
    color: '#929292',
  },
  closeButtonArea: {
    padding: 10
  },
  bodyInput: {
    alignItems: 'stretch',
    padding: 10
  },
  input: {
        backgroundColor: '#E5E5E5',
        //margin: 5,
        marginLeft: 70,
        //marginLeft: 25,
        padding: 10,
        minHeight: 40,
        borderRadius: 10,
        flexDirection: 'row',
        width: width - 120,
    },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  button: {
    backgroundColor: '#009E4E',
    height: 40,
    width: width - 120,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20
  },
  buttonText: {
    fontFamily: 'NotoSanaTamilLight',
    color: '#fff'
  },
});