import * as React from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import add from '../../assets/svg/add.svg';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009E4E',
        width: 120,
        height: 120,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'NotoSanaTamilExtraLight',
        textAlign: 'center',
        justifyContent: 'center',
    }
})

export default function AddPhoto() {
    React.useEffect(() => {
        Font.loadAsync({
            'NotoSanaTamilExtraLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });
    })
    return (
        <View style={styles.container}>
            <SvgXml width="60" height="60" xml={add} />
            <Text style={styles.text}>
                Загрузить фото
            </Text>
            <Text style={styles.text}>
                продукта
            </Text>
        </View>
    )
} 