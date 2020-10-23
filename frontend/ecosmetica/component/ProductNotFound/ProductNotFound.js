import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Back from '../Button/BackButton';
import Balm from './Balm';
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'
import ShampooSvg from './ShampooSvg'


export default class ProductNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            data: this.props.route.params.data,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

        this.state.navigation.setOptions({
            headerShown: false
        })
    }

    render() {
        const { type, data } = this.state
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
                    <View style={styles.infoArea}>
                        <Text style={styles.bigText}>
                            Штрих-код не найден
                        </Text>
                        <Text style={styles.smallText}>
                            Помогите нам добавить этот продукт в нашу базу
                        </Text>
                    </View>
                    <View style={styles.buttonAddArea}>
                        <TouchableOpacity onPress={() => this.state.navigation.navigate('AddProduct', { data: data, type: type })}>
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
        );
        /*return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity
                        style={styles.crossArea}
                        onPress={() => this.state.navigation.navigate('Scanner')}>
                        <Back />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.headerPart}>
                        <View style={styles.headerTail} />
                        <View style={styles.headerTailBefore} />
                        <View style={styles.bigTextWrap}>
                            <Text style={styles.bigText}>Штрих-код</Text>
                            <Text style={styles.bigText}>не найден</Text>
                        </View>
                    </View>
                    <Text style={styles.smallText}>Помогите нам добавить этот продукт в нашу базу</Text>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => this.state.navigation.navigate('AddProduct', { data: data, type: type })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Добавить штрих-код</Text>
                            </View>
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
    },
    infoArea: {
        flex: 1,
        padding: 25,
        paddingRight: 80,
        alignItems: 'center'
    },
    buttonAddArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    /**  infoArea **/
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



    /*bigText: {
        color: '#467354',
        fontFamily: 'Forum',
        fontSize: 40,
    },
    smallText: {
        position: 'absolute',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 140,
        color: '#467354',
        fontFamily: 'Forum',
        fontSize: 20,
    },
    buttonText: {
        color: '#467354',
        fontFamily: 'Forum',
        textAlign: 'center',
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
    bigTextWrap: {
        position: 'absolute',
        flexDirection: 'column',
        top: 20,
        right: 20,
    }*/
});