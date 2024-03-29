import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import Balm from './Balm';
import { HomeButton, ScanButton, ProfileButton, BackButton } from '../Button'
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
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.state.navigation.navigate('Scanner', { updateHistory: this.props.route.params.updateHistory})}>
                        <BackButton />
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
                            Добавьте этот продукт в нашу базу, чтобы получить информацию об ингридиентах в его составе
                        </Text>
                    </View>
                    <View style={styles.buttonAddArea}>
                        <TouchableOpacity onPress={() => this.state.navigation.navigate('AddProduct', { data: data, type: type,  updateHistory: this.props.route.params.updateHistory })}>
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
                        onPress={() => this.props.navigation.navigate('Scanner', { updateHistory: this.props.route.params.updateHistory})}
                    >
                        <ScanButton />
                        <Text style={styles.buttonText} >Сканировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Profile', {updateHistory: this.props.route.params.updateHistory})}
                    >
                        <ProfileButton fill='#929292'/>
                        <Text style={styles.buttonText}>Профиль</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
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
        flex: 1.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
    },
    infoArea: {
        flex: 1.8,
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
        fontSize: 24,
    },
    smallText: {
        marginTop: 20,
        color: '#929292',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 16,
    },
    /**  buttonAddArea **/
    buttonAdd: {
        backgroundColor: '#009E4E',
        height: 40,
        alignItems: 'center',
        borderRadius: 25,
        justifyContent: 'center',
        marginLeft: 60,
        marginRight: 60
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
});