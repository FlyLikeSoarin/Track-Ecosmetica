import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Font from 'expo-font';

import bookmark from '../../assets/svg/bookmark.svg';

Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
});


const styles = StyleSheet.create({
    starArea: {
    },
    star: {
    },
    ingredientScoreText: {
        fontSize: 20,
        color: '#fff',//'#323131',
        fontFamily: 'NotoSanaTamilLight',
    },
})

function colorScore(score){
    if (0 <= score && score <= 4) {
        return '#FF4D00'
    } else if (5 <= score && score <= 7) {
        return '#FFA21F'
    } else if (8 <= score && score <= 10) {
        return '#009E4E'
    } else {
        return '#C4C4C4'
    }
}

function Bookmark() {

}

export default function Score(props){
    return(
        <View style={
            {
                backgroundColor: colorScore(props.score),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                width: 45,
                height: 45,
                marginTop: 20,
                marginRight: 15
            }
        }>
            {/* <SvgXml xml={bookmark} fill='#C4C4C4'/> */}
            <Text style={styles.ingredientScoreText}>
            {props.score}
            </Text>
        </View>
    )
} 