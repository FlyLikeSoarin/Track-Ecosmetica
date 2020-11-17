import * as React from 'react';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    AsyncStorage,
    Platform,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view'
import Icon_photo from 'react-native-vector-icons/MaterialIcons'
import AwesomeAlert from 'react-native-awesome-alerts';
import { ImageManipulator } from 'expo-image-crop'


import Back from '../Button/BackButton';
import AddPhoto from './AddPhotoArea'
import PhotoButton from './PhotoButton'
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'
import ShampooSvg from './ShampooSvg'
import AddPhotoButton from './AddPhotoButton'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005'

export default class ProductNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            barcode: this.props.route.params.data.barcode,
            name: (this.props.route.params.data.name === null ? "" : this.props.route.params.data.name),
            brand: (this.props.route.params.data.brand === null ? "" : this.props.route.params.data.brand),
            ingredients: '',
            discription: '',
            submited: false,
            token: null,
            ingredients_detecting: false,
            isVisible: false,
            uri: '',
            base64: '',
            url_loaded_photo: '',
            fallServer: false,
            error: false,
            error_code: null,
            text_not_detected: false
        }
        this.handleBarcode = this.handleBarcode.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleBrand = this.handleBrand.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.hamdelIngredients = this.hamdelIngredients.bind(this)
        this.handleDiscriptions = this.handleDiscriptions.bind(this)
        this.showAlertNotDetected = this.showAlertNotDetected.bind(this)
        this.hideAlertNotDetected = this.hideAlertNotDetected.bind(this)
        this.setUrl = this.setUrl.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'NotoSansTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

        this.state.navigation.setOptions({
            headerShown: false
        })

        let token = null
        try {
            token = await AsyncStorage.getItem('token');
        } catch (e) {
            //console.log(e)
        }
        if (token !== null) {
            this.setState({
                token: token
            })
        }
    }

    handleBarcode(text) {
        this.setState({
            barcode: text
        });
    }
    handleName(text) {
        this.setState({
            name: text
        });
    }
    handleBrand(text) {
        this.setState({
            brand: text
        });
    }
    hamdelIngredients(text) {
        this.setState({
            ingredients: text
        });
    }
    handleDiscriptions(text) {
        this.setState({
            discription: text
        });
    }

    setUrl = (url) => {
        this.setState({
            url_loaded_photo: url
        })
        //console.log(this.state.url_loaded_photo)
    }

    hideAlertServer = () => {
        this.setState({
            fallServer: false
        });
    }

    async handleSubmit() {
        const token = this.state.token

        const a = this.state.ingredients.split(', ')
        const array_ingredients = this.state.ingredients === "" ? '[]' : JSON.stringify(a.slice(0, a.length - 1))
        console.log(this.state.url_loaded_photo)
        let serverCode;
        if (this.state.url_loaded_photo != '' || this.state.uri === '') {
            await fetch(`${URL}/product/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    code: this.state.barcode,
                    name: this.state.name,
                    brand_name: this.state.brand,
                    ingredients: array_ingredients,
                    description: '',
                    img_url: this.state.url_loaded_photo,
                })
            })
                .then((resp) => {
                    //console.log('submit product')
                    console.log(resp.status)
                    serverCode = resp.status
                    return resp.json()
                })
                .then((ans) => {
                    console.log(ans)
                    if (serverCode >= 200 && serverCode < 300) {
                        this.state.navigation.navigate('Product', { type: this.state.type, data_: ans, barcode: this.state.barcode })
                    } else {
                        this.setState({
                            error: true
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                    this.setState({ fallServer: true })
                })
            this.setState({
                barcode: '',
                name: '',
                brand: '',
                ingredients: '',
                description: '',
                url_loaded_photo: '',
                submited: true
            })
        } else {

        }
    }

    async pickImage() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            else {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false,
                    aspect: [1, 3],
                    quality: 1,
                    base64: true
                });

                if (!result.cancelled) {
                    this.setState({
                        uri: result.uri,
                        base64: result.base64
                    })
                    this.onToggleModal()
                }
            }
        }
    }

    async uploadPhoto(base64_photo) {
        this.setState({
            ingredients_detecting: true
        })
        let status;
        const token = this.state.token
        //console.log(token)
        let header = null
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
        let ans_str = '';
        await fetch(`${URL}/product/analyze_image/`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                content: base64_photo
            })
        })
            .then((resp) => {
                status = resp.status
                console.log(status)
                return resp.json()
            })
            .then((ans) => {
                console.log('server ans')
                console.log(ans)
                //console.log(status)
                //console.log(ans.length)
                if (status === 200 && ans.length === 0) {
                    this.hideAlertDetecting()

                    setTimeout(() => this.setState({
                        text_not_detected: true
                    }), 500)
                }
                else if (status < 300) {
                    for (let i = 0; i < ans.length; ++i) {
                        ans_str += ans[i] + ", ";
                    }
                    this.hideAlertDetecting()
                    setTimeout(() => this.setState({
                        base64: '',
                        uri: '',
                        ingredients: ans_str
                    }), 500)
                } else {
                    this.hideAlertDetecting()
                    setTimeout(() => this.setState({
                        error: true, error_code: status
                    }), 500)
                }
            })
            .catch(() => {
                this.hideAlertDetecting()
                setTimeout(() => this.setState({
                    error: true, error_code: status
                }), 500)
            })
    }

    takePhoto() {
        this.pickImage();
    }
    hideAlertDetecting() {
        this.setState({
            ingredients_detecting: false
        })
    }
    onToggleModal = () => {
        const { isVisible } = this.state
        this.setState({ isVisible: !isVisible })
    }

    onPictureChoosed(uri, base64) {
        if (base64 !== undefined) {
            this.setState({ uri: uri, base64: base64 })
            this.uploadPhoto(base64)
        } else {
            this.uploadPhoto(this.state.base64)
        }
    }
    showAlertNotDetected() {
        this.setState({
            text_not_detected: true
        })
    }
    hideAlertNotDetected() {
        this.setState({
            text_not_detected: false
        })
    }

    render() {
        const { uri, isVisible, ingredients_detecting, fallServer, error, error_code, submited, text_not_detected } = this.state
        console.log('ingredients_detecting', ingredients_detecting)
        console.log('text_not_detected', text_not_detected)
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.state.navigation.navigate('Scanner')}>
                        <Back />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Добавить новый продукт
                    </Text>
                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.body}
                >
                    <View style={styles.imageArea}>
                        <AddPhotoButton setUrl={this.setUrl} submited={submited} />
                    </View>
                    <View style={styles.bodySroll}>
                        <View style={styles.inputsArea}>
                            <InputScrollView
                                ref={ref => { this.scrollView = ref }}
                                onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
                                <TextInput style={styles.input}
                                    value={this.state.barcode}
                                    placeholder='Штрих-код'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleBarcode}
                                />
                                <TextInput style={styles.input}
                                    value={this.state.brand}
                                    placeholder='Бренд'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleBrand} />
                                <TextInput style={styles.input}
                                    value={this.state.name}
                                    placeholder='Название'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleName} />
                                <View style={styles.input}>
                                    <TextInput style={styles.inputIngredients}
                                        value={this.state.ingredients}
                                        placeholder='Состав'
                                        placeholderTextColor="#8B8B8B"
                                        autoCapitalize="none"
                                        onChangeText={this.hamdelIngredients}
                                        multiline={true}
                                        onChange={() => this.scrollView.scrollToEnd({ animated: true })}
                                    />
                                    <TouchableOpacity onPress={() => this.takePhoto()} style={styles.buttonScanArea}>
                                        <Icon_photo name='photo-camera' color='gray' size={20} />
                                        <Text style={styles.buttonText}>
                                            Сканировать
                                            </Text>
                                        <Text style={styles.buttonText}>
                                            состав
                                            </Text>
                                    </TouchableOpacity>
                                </View>
                            </InputScrollView>
                        </View>
                        <View style={styles.buttonAddArea}>
                            <View style={styles.buttonAdd}>
                                <TouchableOpacity
                                    style={styles.touchArea}
                                    onPress={() => this.handleSubmit()}>
                                    <Text style={styles.buttonAddText}>
                                        Добавить
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <HomeButton fill='#929292' />
                        <Text style={styles.buttonText}>Домой</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Scanner')}
                    >
                        <ScanButton />
                        <Text style={styles.buttonText} >Сканировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Profile', { token: this.state.token })}
                    >
                        <ProfileButton fill='#929292' />
                        <Text style={styles.buttonText}>Профиль</Text>
                    </TouchableOpacity>
                </View>
                <ImageManipulator
                    photo={{ uri }}
                    saveOptions={{ 'base64': true }}
                    isVisible={isVisible}
                    onPictureChoosed={({ uri: uriM, base64: base64M }) => this.onPictureChoosed(uriM, base64M)}
                    onToggleModal={this.onToggleModal}
                />
                <AwesomeAlert
                    show={ingredients_detecting}
                    showProgress={true}
                    title=""
                    message="Подождите, фото обрабатывается."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Закрыть"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.hideAlertDetecting();
                    }}
                />
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
                <AwesomeAlert
                    show={error}
                    showProgress={false}
                    title="Что-то пошло не так"
                    message={error_code}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.setState({
                            error: false
                        })
                    }}
                />
                <AwesomeAlert
                    show={text_not_detected}
                    showProgress={false}
                    title="Попробуйте снова"
                    message="Ингредиенты не найдены."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Закрыть"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.hideAlertNotDetected();
                    }}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
        paddingTop: 10,
    },
    body: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopColor: '#929292',
        borderTopWidth: 0.5
    },
    /* header */
    backButton: {
        marginTop: 15
    },
    title: {
        flex: 1,
        marginTop: 15,
        marginRight: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 16,
        fontFamily: 'NotoSansTamilLight',
        color: '#929292',
    },
    /* body */
    imageArea: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
        marginBottom: 10
    },
    bodySroll: {
        flex: 2
    },
    inputsArea: {
        flex: 3,
        alignItems: 'stretch',
        padding: 10
    },
    buttonAddArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    /**  inputsArea **/
    input: {
        backgroundColor: '#E5E5E5',
        margin: 5,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        minHeight: 40,
        borderRadius: 10,
        flexDirection: 'row',
    },
    inputIngredients: {
        flex: 1
    },
    bigText: {
        color: '#929292',
        fontFamily: 'NotoSansTamilLight',
        fontSize: 40,
    },
    smallText: {
        marginTop: 40,
        color: '#929292',
        fontFamily: 'NotoSansTamilLight',
        fontSize: 20,
    },
    /**  buttonAddArea **/
    buttonAdd: {
        backgroundColor: '#009E4E',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: 60,
        marginRight: 60
    },
    buttonAddText: {
        color: '#fff',
        fontFamily: 'NotoSansTamilLight'
    },
    /* bottom */
    buttonArea: {
        flex: 1,
        alignItems: 'center',
    },
    buttonScanArea: {
        flex: 0,
        alignItems: 'center',
    },
    /** buttonArea **/
    buttonText: {
        color: '#929292',
        fontSize: 10,
        fontFamily: 'NotoSansTamilLight',
        textAlign: 'center',
        justifyContent: 'center',
    },
    touchArea: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 70,
        paddingLeft: 70,
    }
})