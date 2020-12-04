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
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from 'react-native-awesome-alerts';
import InputScrollView from 'react-native-input-scroll-view'

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
            secure: true,
            showLengthAlert: false,

            bottonPressed: false
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
        })
            .then(() => {
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
                        //fontWeight: 'bold',
                        fontSize: 18,
                        fontFamily: 'NotoSanaTamilLight'
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.buttonBack}
                            onPress={() => this.state.navigation.navigate('Home')}>
                            <BackButton />
                        </TouchableOpacity>
                    ),
                });
            })

        this.setState({ assetsLoaded: true });
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
        if (!this.state.bottonPressed) {
            this.setState({ buttonPressed: true })
            if (this.state.email !== '' && this.state.password !== '' && this.state.repeated_password !== '' && this.state.password === this.state.repeated_password && this.state.password.length >= 5) {
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
                        this.setState({buttonPressed: false})
                        if (success) {
                            token = ans.Token;

                            //console.log(ans.Token)
                            this.state.navigation.navigate('Profile', { logOut: () => console.log("заглушка выхода на стр регистрации"), token: token })
                            this.setState({
                                email: '',
                                password: '',
                                repeated_password: '',
                                first_name: '',
                                last_name: '',
                            })
                        } else {
                            console.log('fail')
                        }
                    })
                    .catch((err) => {
                        this.showAlertServer()
                    })
                if (token !== null) {
                    this.props.route.params.setToken(token)
                    await AsyncStorage.setItem('token', token);
                    //await AsyncStorage.setItem('id_user', id_user)
                }
            } else {
                if (this.state.password !== this.state.repeated_password) {
                    this.showAlertDifferentPasswords();
                    this.setState({buttonPressed: false})
                } else if (this.state.password.length < 5) {
                    this.showAlertLengthPassword()
                    this.setState({buttonPressed: false})
                }
                else {
                    this.showAlertSubmitEmpty()
                    this.setState({buttonPressed: false})
                }
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

    showAlertLengthPassword = () => {
        this.setState({
            showLengthAlert: true
        })
    }

    render() {
        const { assetsLoaded, submitEmptyField, PasswordsDifferent, fallServer, userExist } = this.state;

        if (assetsLoaded) {

            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.inputsArea}>
                        <InputScrollView
                            ref={ref => { this.scrollView = ref }}
                            onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
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
                                    placeholder='Пароль'
                                    placeholderTextColor="#8B8B8B"
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.secure}
                                />
                                <Icon style={styles.eyeIcon} name={this.state.icon} size={20} color="gray" onPress={() => this.changeIcon()} />
                            </View>
                            <TextInput style={styles.input}
                                value={this.state.repeated_password}
                                onChangeText={this.handlerRepeatedPassword}
                                placeholder='Повторите пароль'
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

                        </InputScrollView>
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
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.buttonKeyboardAvoidArea}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                    >
                    </KeyboardAvoidingView>

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
                        title="Email введен неверно"
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
                    <AwesomeAlert
                        show={this.state.showLengthAlert}
                        showProgress={false}
                        title="Длина пароля должна составлять не менее 5 символов"
                        message=""
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="#009E4E"
                        onConfirmPressed={() => {
                            this.setState({
                                showLengthAlert: false
                            });
                        }}
                    />
                </SafeAreaView >
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
        flex: 1,
        backgroundColor: '#fff'
    },
    inputsArea: {
        flex: 2,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    buttonArea: {
        flex: 0.2,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    buttonKeyboardAvoidArea: {
        //height: 20,
        backgroundColor: '#fff'
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
        borderRadius: 25,
        justifyContent: 'center',
        marginLeft: 25,
        marginRight: 25,
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
    },
    buttonBack: {
        //backgroundColor: '#000',
    }
})