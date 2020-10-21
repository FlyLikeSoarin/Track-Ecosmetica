import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';

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
            barcode: this.props.route.params.data,
            name: '',
            brand: '',
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
    handleSubmit() {
        const token = this.state.token
        fetch(`${URL}product/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                code: this.state.barcode,
                name: this.state.name,
                brand_name: this.state.brand,
                ingredients: this.state.ingredients,
                description: ''
            })
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
                    <View style={styles.inputsArea}>
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
                            value={this.state.brand}
                            placeholder='Состав'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                            onChangeText={this.hamdelIngredients} />
                    </View>
                    <View style={styles.buttonAddArea}>
                        <TouchableOpacity onPress={() => this.handleSubmit()}>
                            <View style={styles.buttonAdd}>
                                <Text style={styles.buttonAddText}>
                                    Добавить
                            </Text>
                            </View>
                        </TouchableOpacity>
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
        /*return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.crossArea}
                        onPress={()=>this.state.navigation.navigate('Scanner')}>
                        <CrossButton />
                    </TouchableOpacity>
                    <TextInput style={styles.input}
                        value={this.state.barcode}
                        placeholder='Штрих-код'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleBarcode}
                        />
                    <TextInput style={styles.input}
                        value={this.state.name}
                        placeholder='Название'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleName}/>
                    <TextInput style={styles.input}
                        value={this.state.brand}
                        placeholder='Бренд'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleBrand}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.headerPart}>
                        <View style={styles.headerTail} />
                        <View style={styles.headerTailBefore} />
                        <AddPhoto />
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.textArea}>
                            <View style={styles.headerTextArea}>
                                <Text style={styles.titleTextArea}>Ингредиенты:</Text>
                                <PhotoButton/>
                            </View>
                            <TextInput
                                value={this.state.ingredients}
                                style={styles.textAreaInput}
                                autoCapitalize = "none"
                                onChangeText={this.hamdelIngredients}
                            />
                        </View>
                        <View style={styles.textArea}>
                            <View style={styles.headerTextArea}>
                                <Text style={styles.titleTextArea}>Описание:</Text>
                                <PhotoButton/>
                            </View>
                            <TextInput
                                value={this.state.discription}
                                style={styles.textAreaInput}
                                autoCapitalize = "none"
                                onChangeText={this.handleDiscriptions}
                            />
                        </View>
                        <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={() => this.handleSubmit()}>
                            <Text style={styles.submitButtonText}>Добавить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );*/
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
    inputsArea: {
        flex: 1,
        alignItems: 'stretch'
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
        height: 40,
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
        alignItems: 'center'
    },
    /** buttonArea **/
    buttonText: {
        color: '#929292',
        fontSize: 10,
        fontFamily: 'NotoSanaTamilLight',
        textAlign: 'center',
        justifyContent: 'center',
    },
    
    /*container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    header: {
        flex: 2,
        backgroundColor: '#9ae7af',
        flexDirection: 'column',
    },
    body: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    crossArea: {
        alignItems: 'flex-end',
    },
    headerPart: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    headerTail: {
        width: 0,
        height: 0,
        borderTopWidth: 100,
        borderTopColor: '#9ae7af',
        borderLeftColor: 'transparent',
        borderLeftWidth: 100,
        borderRightColor: '#9ae7af',
        borderRightWidth: 100,
        borderBottomColor: 'transparent',
        borderBottomWidth: 100,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    headerTailBefore: {
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        height: 200,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 200,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        transform: [
            { rotate: '0deg' }
        ]
    },
    input: {
        backgroundColor: 'white',
        margin: 15,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 40,
        color: '#467354'
    },
    bottom: {
        alignItems: 'stretch',
        position: 'absolute',
        top: 160,
        width: width,
    },
    submitButton: {
        backgroundColor: '#C1E1A0',
        color: '#467354',
        width: 200,
        height: 50,
        justifyContent: 'space-around',
        marginTop: 30,
        alignSelf: 'center'
    },
    submitButtonText: {
        color: '#467354',
        fontFamily: 'Forum',
        textAlign: 'center',
    },
    textArea: {
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    headerTextArea: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        flexDirection: 'row',

    },
    titleTextArea: {
        flex: 1,
        fontFamily: 'Forum',
        color: '#467354',
    },
    textAreaInput: {
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: '#C1E1A0',
        borderRadius: 20,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 60,
        color: '#467354'
    }*/
})