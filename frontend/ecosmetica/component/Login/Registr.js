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
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from 'react-native-awesome-alerts';

/*Buttons*/
import BackButton from '../Button/BackButton'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005'

export default class Registr extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            navigation: this.props.navigation,
            assetsLoaded: false,
            email: '',
            password: '',
            repeated_password: '',
            first_name: '',
            last_name: '',
            submitEmptyField: false, // не введен логин или пароль
            PasswordsDifferent: false, // password != repeated_password
            fallServer: false,
            userExist: false,
            icon: 'ios-eye-off',
            secure: true
        };

        this.handlerEmail = this.handlerEmail.bind(this)
        this.handlerPassword = this.handlerPassword.bind(this)
        this.handlerRepeatedPassword = this.handlerRepeatedPassword.bind(this)
        this.handlerFirstName = this.handlerFirstName.bind(this)
        this.handlerLastName = this.handlerLastName.bind(this)
        this.handlerRegister = this.handlerRegister.bind(this)
    }

    async componentDidMount() {
        /* Загрузка шрифтов */
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

        this.setState({ assetsLoaded: true });

        /* Кастомизация хедера */
        this.state.navigation.setOptions({
            headerTitle: 'Регистрация',
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

    changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
            secure: !prevState.secure
        }))
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
    handlerRepeatedPassword(text) {
        this.setState({
            repeated_password: text
        })
    }
    handlerFirstName(text) {
        this.setState({
            first_name: text
        })
    }
    handlerLastName(text) {
        this.setState({
            last_name: text
        })
    }
    async handlerRegister() {
        var success = false
        var token = null
        if (this.state.email !== '' && this.state.password !== '' && this.state.repeated_password !== '' && this.state.password === this.state.repeated_password) {
            await fetch(`${URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                    email: this.state.email,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                })
            })
                .then((response) => {
                    console.log(response.status)
                    if (response.status === 200) {
                        success = true
                    }
                    if (400 <= response.status && response.status <= 499) {
                        this.showAlertUserExists()
                    }
                    if (500 <= response.status && response.status <= 526) {
                        this.showAlertServer()
                    }
                    return response.json()
                })
                .then((ans) => {
                    if (success) {
                        token = ans.Token;
                        //console.log(ans.Token)
                        this.setState({
                            email: '',
                            password: '',
                            repeated_password: '',
                            first_name: '',
                            last_name: '',
                        })
                        this.state.navigation.navigate('Home')

                    } else {
                        console.log('fail')
                    }
                })
            if (token !== null) {
                this.props.route.params.setToken(token)
                await AsyncStorage.setItem('token', token);
            }
        } else {
            if (this.state.password !== this.state.repeated_password) {
                this.showAlertDifferentPasswords();
            } else {
                this.showAlertSubmitEmpty()
            }
        }
    }
    showAlertUserExists = () => {
        this.setState({
            userExist: true
        })
    }
    hideAlertUserExists = () => {
        this.setState({
            userExist: false
        })
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

    showAlertSubmitEmpty = () => {
        this.setState({
            submitEmptyField: true
        });
    }

    hideAlertSubmitEmpty = () => {
        this.setState({
            submitEmptyField: false
        });
    }
    showAlertDifferentPasswords = () => {
        this.setState({
            PasswordsDifferent: true
        });
        this.setState({
            password: '',
            repeated_password: ''
        })
    }

    hideAlertDifferentPasswords = () => {
        this.setState({
            PasswordsDifferent: false
        });
    }

    render() {
        const { assetsLoaded, submitEmptyField, PasswordsDifferent, fallServer, userExist } = this.state;

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
                                value={this.state.password}
                                onChangeText={this.handlerPassword}
                                placeholder='Password'
                                placeholderTextColor="#8B8B8B"
                                autoCapitalize="none"
                                secureTextEntry={this.state.secure}
                            />
                            <Icon style={styles.eyeIcon} name={this.state.icon} size={20} color="gray" onPress={() => this.changeIcon()} />
                        </View>
                        <TextInput style={styles.input}
                            value={this.state.repeated_password}
                            onChangeText={this.handlerRepeatedPassword}
                            placeholder='Repeat Password'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                            secureTextEntry={this.state.secure}
                        />
                        <TextInput style={styles.inputName}
                            value={this.state.first_name}
                            onChangeText={this.handlerFirstName}
                            placeholder='Имя'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                        />
                        <TextInput style={styles.input}
                            value={this.state.last_name}
                            onChangeText={this.handlerLastName}
                            placeholder='Фамилия'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                        />


                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity onPress={() => this.handlerRegister()}>
                            <View style={styles.bottom}>
                                <Text style={styles.bottomText}>
                                    Зарегистрироваться
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Alerts */}
                    <AwesomeAlert
                        show={submitEmptyField}
                        showProgress={false}
                        title="Вы заполнили не все поля"
                        message="Обязательные поля: Email, Password и Repeat Password"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#009E4E"
                        onConfirmPressed={() => {
                            this.hideAlertSubmitEmpty();
                        }}
                    />
                    <AwesomeAlert
                        show={PasswordsDifferent}
                        showProgress={false}
                        title="Повторите попытку"
                        message="Пароли не свопадают"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#009E4E"
                        onConfirmPressed={() => {
                            this.hideAlertDifferentPasswords();
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
                        show={userExist}
                        showProgress={false}
                        title="Пользователь уже существует"
                        message=""
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#009E4E"
                        onConfirmPressed={() => {
                            this.hideAlertUserExists();
                        }}
                    />
                </View >
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
        flex: 2,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    text: {
        marginLeft: 25,
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
        fontFamily: 'NotoSanaTamilLight'
    },
    inputName: {
        marginTop: 40,
        backgroundColor: '#E5E5E5',
        margin: 10,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 40,
        borderRadius: 10,
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