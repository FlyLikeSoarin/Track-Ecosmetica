import * as React from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import add from '../../assets/svg/add.svg';


var width = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009E4E',
        width: width-0.7*width,
        height: width-0.7*width,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
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