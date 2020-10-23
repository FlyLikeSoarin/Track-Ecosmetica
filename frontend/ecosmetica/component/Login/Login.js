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
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from 'react-native-awesome-alerts';

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
            password: '',
            secure: true,
            icon: 'ios-eye-off',
            forgotPassword: false,
            failedLogin: false, // неверный логин или пароль
            fallServer: false, // проблемы на сервере
            emptyInput: false, // попытка отправить пустую строку как логин или пароль
        };
        this.handlerLogin = this.handlerLogin.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
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

    showAlertLogin = () => {
        this.setState({
            failedLogin: true
        });
    }

    hideAlertLogin = () => {
        this.setState({
            failedLogin: false
        });
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
    alertEmptyInput = () => {
        this.setState({
            emptyInput: true
        })
    }
    hideEmptySubmit = () => {
        this.setState({
            emptyInput: false
        })
    }


    async handlerLogin() {
        var success = false;
        var token = null
        if (this.state.email !== '' && this.state.password != '') {
            await fetch(`${URL}/auth/?username=${this.state.email}&password=${this.state.password}`, {
                method: 'GET'
            })
                .then((response) => {
                    console.log(response.status)
                    if (response.status === 200) {
                        success = true
                    }
                    if (response.status >= 400 && response.status <= 499) {
                        //alert("Логин или пароль введен неверно.")
                        this.showAlertLogin()
                    }
                    if (500 <= response.status & response.status <= 526) {
                        //alert("Сервер недоступен.")
                        this.showAlertServer()
                    }
                    return response.json()
                })
                .then((ans) => {
                    console.log(ans)
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
        } else {
            this.alertEmptyInput()
        }
    }

    changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
            secure: !prevState.secure
        }))
    }

    render() {
        const { assetsLoaded, secure, forgotPassword, failedLogin, fallServer, emptyInput } = this.state;

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
                        <View style={styles.passwordInput}>
                            <TextInput style={styles.passwordInputArea}
                                value={secure}
                                onChangeText={this.handlerPassword}
                                placeholder='Password'
                                placeholderTextColor="#8B8B8B"
                                autoCapitalize="none"
                                secureTextEntry={this.state.secure}
                            />
                            <Icon style={styles.eyeIcon} name={this.state.icon} size={20} color="gray" onPress={() => this.changeIcon()} />
                        </View>
                        {!forgotPassword && (
                            <TouchableOpacity onPress={() => this.setState({ forgotPassword: !forgotPassword })}>
                                <Text style={styles.text}>Забыли пароль?</Text>
                            </TouchableOpacity>
                        )}
                        {forgotPassword && <Text style={styles.text}>Очень жаль :(</Text>}
                        {/* Alerts */}
                        <AwesomeAlert
                            show={failedLogin}
                            showProgress={false}
                            title="Повторите попытку"
                            message="Логин или пароль введен неверно."
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={false}
                            showConfirmButton={true}
                            confirmText="OK"
                            confirmButtonColor="#009E4E"
                            onConfirmPressed={() => {
                                this.hideAlertLogin();
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
                            show={emptyInput}
                            showProgress={false}
                            title="Введите логин и пароль"
                            message=""
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={false}
                            showConfirmButton={true}
                            confirmText="OK"
                            confirmButtonColor="#009E4E"
                            onConfirmPressed={() => {
                                this.hideEmptySubmit();
                            }}
                        />
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
    },
    eyeIcon: {
        paddingRight: 10,
    },
    passwordInput: {
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        margin: 10,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 40,
        borderRadius: 10,
    },
    passwordInputArea: {
        flex: 1,
        paddingLeft: 0,
        backgroundColor: '#E5E5E5',
        color: '#424242',
    }

})