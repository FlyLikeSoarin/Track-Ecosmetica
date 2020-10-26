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
    Platform
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons'
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
            base64: ''
        }
        this.handleBarcode = this.handleBarcode.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleBrand = this.handleBrand.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.hamdelIngredients = this.hamdelIngredients.bind(this)
        this.handleDiscriptions = this.handleDiscriptions.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

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

    async handleSubmit() {
        const token = this.state.token
        const array_ingredients = this.state.ingredients === "" ? [] : this.state.ingredients.split(' ')
        await fetch(`${URL}/product/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                code: this.state.barcode,
                name: this.state.name,
                brand_name: this.state.brand,
                ingredients: array_ingredients,
                description: ''
            })
        })
            .then((resp) => {
                console.log(resp.status)
                return resp.json()
            })
            .then((ans) => {
                console.log(ans)
            })
        this.setState({
            barcode: '',
            name: '',
            brand: '',
            ingredients: '',
            description: ''
        })

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

                if(!result.cancelled) {
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
        const token = this.state.token
        //console.log(base64_photo)
        await fetch(`${URL}/product/analyze_image/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                content: base64_photo
            })
        })
        .then((resp) => {
            return resp.json()
        })
        .then((ans) => {
            console.log('server ans')
            console.log(ans)
        })
        .catch(() => {

            alert('server')
        })
        this.setState({ base64 : '', uri: '' })
        this.hideAlertDetecting()
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
        }
        this.uploadPhoto(this.state.base64)
    }

    render() {
        const { uri, isVisible } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.state.navigation.navigate('Scanner')}>
                        <Back />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.imageArea}>
                        <ShampooSvg />
                    </View>
                    <View style={styles.bodySroll}>
                        <View style={styles.inputsArea}>
                            <InputScrollView>
                                <TextInput style={styles.input}
                                    value={this.state.barcode}
                                    placeholder='Штрих-код'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleBarcode}
                                />
                                <TextInput style={styles.input}
                                    value={this.state.name}
                                    placeholder='Название'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleName} />
                                <TextInput style={styles.input}
                                    value={this.state.brand}
                                    placeholder='Бренд'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.handleBrand} />
                                    <View style={styles.input}>
                                <TextInput style={styles.inputIngredients}
                                    value={this.state.ingredients}
                                    placeholder='Состав'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.hamdelIngredients}
                                    multiline={true}
                                />
                                <TouchableOpacity onPress={() => this.takePhoto()}>
                                    <Icon_photo name='photo-camera' color='gray' size={20} />
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
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.state.navigation.navigate('Home')}>
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
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <ProfileButton />
                        <Text style={styles.buttonText}>Профиль</Text>
                    </TouchableOpacity>
                </View>
                <ImageManipulator
                  photo={{ uri }}
                  saveOptions={{'base64': true}}
                  isVisible={isVisible}
                  onPictureChoosed={({ uri: uriM, base64: base64M }) => this.onPictureChoosed(uriM, base64M)}
                  onToggleModal={this.onToggleModal}
                />
                <AwesomeAlert
                            show={this.state.ingredients_detecting}
                            showProgress={true}
                            title=""
                            message=""
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={false}
                            onCancelPressed={() => {
                                this.hideAlertDetecting();
                            }}
                        />
            </View>
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
        backgroundColor: '#fff',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
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
    /* body */
    imageArea: {
        flex: 1,
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
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 40,
    },
    smallText: {
        marginTop: 40,
        color: '#929292',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 20,
    },
    /**  buttonAddArea **/
    buttonAdd: {
        backgroundColor: '#009E4E',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: 90,
        marginRight: 90
    },
    buttonAddText: {
        color: '#fff',
        fontFamily: 'NotoSanaTamilLight'
    },
    /* bottom */
    buttonArea: {
        flex: 1,
        alignItems: 'center',
    },
    /** buttonArea **/
    buttonText: {
        color: '#929292',
        fontSize: 10,
        fontFamily: 'NotoSanaTamilLight',
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