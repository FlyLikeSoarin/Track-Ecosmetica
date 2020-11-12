import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import ImageWindow1 from '../assets/svg/intro-window1.svg'
import SadBoy from '../assets/svg/sed-girl.svg'
import ImageWindow2 from '../assets/svg/intro-window2.svg'
import ImageWindow3 from '../assets/svg/intro-window3_3.svg'
import Logo from '../assets/svg/logo_1.svg'


const IntroWindows = ({ navigation, hideIntroWindows, setToken }) => {
    React.useEffect(() => {
        Font.loadAsync({
            'NotoSansTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
        });
    })
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const [showWindow1, setShowWindow1] = React.useState(true)
    const [showWindow2, setShowWindow2] = React.useState(false)
    const [showWindow3, setShowWindow3] = React.useState(false)
    const [showWindow4, setShowWindow4] = React.useState(false)
    const [showWindow5, setShowWindow5] = React.useState(false)

    return (
        <View style={styles.body}>
            {showWindow1 && (<View style={styles.container}>
                <View style={styles.emptyArea} />
                <View style={styles.imageWrap}>
                    <SvgXml xml={ImageWindow1} />
                </View>
                <View style={styles.textWrap}>
                    <View style={styles.textSmallWrap}>
                    <Text style={styles.ecoText}>
                    Eco
                    </Text>
                    <Text style={styles.textInfo}>
                        smetica - сервис, который
                    </Text>
                    </View>
                    <Text style={styles.textInfo}>
                        поможет проверить вашу косметику
                        на натуральность и безопасность
                    </Text>
                </View>
                <View style={styles.buttonsArea}>
                    <TouchableOpacity style={styles.beginButton}
                        onPress={() => hideIntroWindows()}
                    >
                        <Text style={styles.beginText}>
                            Начать
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.howItWorksButton}
                        onPress={() => {
                            setShowWindow1(false)
                            setShowWindow2(true)
                        }}
                    >
                        <Text style={styles.howItWorcksText}>
                            Как это работает?
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>)}
            {showWindow2 && (
                <View style={styles.container}>
                    <View style={styles.emptyArea} />
                    <View style={styles.imageWrap}>
                        <SvgXml xml={SadBoy} />
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textInfo}>
                            Узнайте, как влияют на организм
                            ингредиенты,входящие в состав вашей
                            косметики или средства гигиены
                    </Text>
                    </View>
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity style={styles.beginButton}
                            onPress={() => {
                                setShowWindow2(false)
                                setShowWindow3(true)
                            }}
                        >
                            <Text style={styles.beginText}>
                                Дальше
                        </Text>
                        </TouchableOpacity>
                        <View style={styles.circleWrap}>
                            <View style={styles.fillCircle} />
                            <View style={styles.emptyCircle} />
                            <View style={styles.emptyCircle} />
                            <View style={styles.emptyCircle} />
                        </View>
                    </View>
                </View>
            )}
            {showWindow3 && (
                <View style={styles.container}>
                    <View style={styles.emptyArea} />
                    <View style={styles.imageWrap}>
                        <SvgXml xml={ImageWindow2} />
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textInfo}>
                            Сканируйте штрих-код или состав любого
                            косметического  или гигиенического
                            средства , чтобы узнать все
                            об ингредиентах в нём
                </Text>
                    </View>
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity style={styles.beginButton}
                            onPress={() => {
                                setShowWindow3(false)
                                setShowWindow4(true)
                            }}
                        >
                            <Text style={styles.beginText}>
                                Дальше
                        </Text>
                        </TouchableOpacity>
                        <View style={styles.circleWrap}>
                            <View style={styles.emptyCircle} />
                            <View style={styles.fillCircle} />
                            <View style={styles.emptyCircle} />
                            <View style={styles.emptyCircle} />
                        </View>
                    </View>
                </View>
            )}
            {showWindow4 && (
                <View style={styles.container}>
                    <View style={styles.emptyArea} />
                    <View style={styles.imageWrap}>
                        <SvgXml xml={ImageWindow3} />
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textInfo}>
                            Каждый продукт имеет рейтинг, основанный
                            на безопасности и экологичности
                            его состава.
                </Text>
                    </View>
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity style={styles.beginButton}
                            onPress={() => {
                                setShowWindow4(false)
                                setShowWindow5(true)
                            }}
                        >
                            <Text style={styles.beginText}>
                                Дальше
                        </Text>
                        </TouchableOpacity>
                        <View style={styles.circleWrap}>
                            <View style={styles.emptyCircle} />
                            <View style={styles.emptyCircle} />
                            <View style={styles.fillCircle} />
                            <View style={styles.emptyCircle} />
                        </View>
                    </View>
                </View>
            )}
            {showWindow5 && (
                <View style={styles.container}>
                    <View style={styles.emptyArea} />
                    <View style={styles.imageWrap}>
                        <SvgXml xml={Logo} />
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textInfo}>
                            Создайте аккаунт, чтобы иметь возможность
                            добавлять продукты в избранное и
                            исключать нежелательные ингредиенты.
                        </Text>
                    </View>
                    <View style={styles.buttonsArea}>
                        <TouchableOpacity style={styles.beginButton}
                            onPress={() => {
                                setShowWindow5(false)
                                navigation.navigate('Registr', {setToken: setToken})
                            }}
                        >
                            <Text style={styles.beginText}>
                                Зарегистрироваться
                    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.howItWorksButton}
                            onPress={() => {
                                setShowWindow5(false)
                                hideIntroWindows()
                            }}
                        >
                            <Text style={styles.howItWorcksText}>
                                Продлжить без регистрации
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch',
    },
    emptyArea: {
        flex: 0.5
    },
    container: {
        flex: 1
    },
    imageWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    textSmallWrap: {
        flexDirection: 'row'
    },
    textInfo: {
        textAlign: 'center',
        fontFamily: 'NotoSansTamilLight',
        fontSize: 16
    },
    ecoText: {
        textAlign: 'center',
        fontFamily: 'NotoSansTamilLight',
        fontSize: 16,
        color: '#009E4E'
    },
    buttonsArea: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingRight: 40,
        paddingLeft: 40,
    },
    beginButton: {
        backgroundColor: '#009E4E',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center'
    },
    beginText: {
        fontFamily: 'NotoSansTamilLight',
        fontSize: 18,
        color: '#fff'
    },
    howItWorksButton: {
        borderWidth: 1,
        borderColor: '#009E4E',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        marginTop: 20
    },
    howItWorcksText: {
        fontFamily: 'NotoSansTamilLight',
        fontSize: 18,
        color: '#009E4E'
    },
    circleWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    fillCircle: {
        width: 11,
        height: 11,
        backgroundColor: '#009E4E',
        borderRadius: 100,
        margin: 5,
    },
    emptyCircle: {
        width: 11,
        height: 11,
        borderColor: '#009E4E',
        borderWidth: 1,
        borderRadius: 100,
        margin: 5
    },
})

export default IntroWindows