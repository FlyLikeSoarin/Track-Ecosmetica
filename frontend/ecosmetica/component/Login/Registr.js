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
            last_name: ''
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
            'Forum': require('../../assets/fonts/Forum.ttf')
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
                fontSize: 30,
                fontFamily: 'Forum'
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
                        last_name: ''
                    })
                    this.state.navigation.navigate('Home')

                } else {
                    console.log('fail')
                }
            })
        if (token !== null) {
            await AsyncStorage.setItem('token', token);
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
                        <TextInput style={styles.input}
                            value={this.state.repeated_password}
                            onChangeText={this.handlerRepeatedPassword}
                            placeholder='Repeat Password'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
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
    }

})