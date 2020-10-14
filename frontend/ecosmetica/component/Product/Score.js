import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Font from 'expo-font';

import star from '../../assets/svg/star.svg';

Font.loadAsync({
            'Forum': require('../../assets/fonts/Forum.ttf')
        });


const styles = StyleSheet.create({
    starArea: {
        position: 'absolute',
        left: 10,
        top: -50
    },
    star: {
    },
    score: {
        fontSize: 40,
        fontFamily: 'Forum',
        position: 'absolute',
        top: 50,
        right: 50
    }
})

export default function Star(props){
    return(
        <View style={styles.starArea}>
            <SvgXml style={styles.star} width="140" height="140" xml={star} />
            <Text style={styles.score}>
                {props.score}
            </Text>
        </View>
    )
} 