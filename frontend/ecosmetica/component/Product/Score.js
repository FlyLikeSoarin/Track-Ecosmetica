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
    },
    star: {
    },
    score: {
    }
})

export default function Star(props){
    return(
        <View style={styles.starArea}>
            <SvgXml style={styles.star} width="15" height="15" fill={props.fill} xml={star} />
        </View>
    )
} 