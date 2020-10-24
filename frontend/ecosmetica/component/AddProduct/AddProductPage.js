import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    Keyboard,
    KeyboardAwareScrollView,
    AsyncStorage
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view'

import Back from '../Button/BackButton';
import AddPhoto from './AddPhotoArea'
import PhotoButton from './PhotoButton'
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'
import ShampooSvg from './ShampooSvg'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005/'

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
            token: null
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
        const array_ing = JSON.stringify(this.state.ingredients.split(' '))
        await fetch(`${URL}product/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                code: this.state.barcode,
                name: this.state.name,
                brand_name: this.state.brand,
                ingredients: array_ing,
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

    render() {
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
                                <TextInput style={styles.input}
                                    value={this.state.ingredients}
                                    placeholder='Состав'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    onChangeText={this.hamdelIngredients}
                                    multiline={true}
                                />
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
        borderRadius: 10
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