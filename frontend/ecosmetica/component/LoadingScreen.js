import * as React from 'react';
import * as Font from 'expo-font';
import { useLayoutEffect } from 'react';
import { 
  Text,
  View, 
  StyleSheet, 
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import Logo from '../assets/svg/logo.svg'

const LoadingScreen = ({navigation}) => {

    React.useEffect(() => {
        Font.loadAsync({
            'NotoSansTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
        });
    })
    useLayoutEffect(() => {        
        navigation.setOptions({headerShown: false})
    }, [navigation])
    return(
        <View style={styles.body}>
            <SvgXml xml={Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigTextWrap: {
        flex: 3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    bigTextStart: {
        color: '#009E4E',
        fontSize: 40,
        fontFamily: 'NotoSansTamilLight'
    },
    bigTextEnd: {
        color: '#000',
        fontSize: 40,
        fontFamily: 'NotoSansTamilLight'
    },
    textFakeWrap: {
        flex: 1,
    },
    textFake: {
        color: '#C4C4C4',
        fontSize: 40,
    },
})

export default LoadingScreen