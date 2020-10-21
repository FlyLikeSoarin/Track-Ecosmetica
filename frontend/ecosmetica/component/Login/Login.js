import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';

/*Buttons*/
import BackButton from '../Button/BackButton'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005'


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navigation: this.props.navigation,
            assetsLoaded: false,
            email: '',
            password: ''
        };
        this.handlerLogin = this.handlerLogin.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
    }

    async componentDidMount() {
        /* Загрузка шрифтов */
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
          });

        this.setState({ assetsLoaded: true });

        /* Кастомизация хедера */
        this.state.navigation.setOptions({
            headerTitle: 'Вход',
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#929292',
                borderBottomWidth: 0.5
            },
            headerTintColor: '#929292',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                fontFamily: 'NotoSanaTamilLight'
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => this.state.navigation.navigate('Home')}>
                    <BackButton />
                </TouchableOpacity>
            ),
        });
    }

    handlerEmail(text) {
        this.setState({
            email: text
        })
    }

    handlerPassword(text) {
        this.setState({
            password: text
        })
    }

    async handlerLogin() {
        var success = false;
        var token = null
        await fetch(`${URL}/auth/?username=${this.state.email}&password=${this.state.password}`, {
            method: 'GET'
        })
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    success = true
                }
                return response.json()
            })
            .then((ans) => {
                if (success) {
                    token = ans.Token;
                    //console.log(token)
                    this.setState({
                        email: '',
                        password: '',
                    })
                    this.state.navigation.navigate('Home')
                } else {
                    console.log("can't login")
                }
            })
        if (token !== null) {
            this.props.route.params.setToken(token)
            await AsyncStorage.setItem('token', token);
            console.log(token)
        }
    }

    render() {
        const { assetsLoaded } = this.state;

        if (assetsLoaded) {

            return (
                <View style={styles.container}>
                    <View style={styles.inputsArea}>
                        <TextInput style={styles.input}
                            value={this.state.email}
                            onChangeText={this.handlerEmail}
                            placeholder='Email'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                        />
                        <TextInput style={styles.input}
                            value={this.state.password}
                            onChangeText={this.handlerPassword}
                            placeholder='Password'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                        />
                        <Text style={styles.text}>Забыли пароль?</Text>
                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            onPress={() => this.handlerLogin()}
                        >
                            <View style={styles.bottom}>
                                <Text style={styles.bottomText}>
                                    Войти
                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputsArea: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonArea: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    text: {
        marginLeft: 25,
        fontFamily: 'NotoSanaTamilLight',
    },
    input: {
        backgroundColor: '#E5E5E5',
        margin: 10,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 40,
        borderRadius: 10,
    },
    bottom: {
        backgroundColor: '#009E4E',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        margin: 25
    },
    bottomText: {
        color: '#fff',
        fontFamily: 'NotoSanaTamilLight',
    }

})
