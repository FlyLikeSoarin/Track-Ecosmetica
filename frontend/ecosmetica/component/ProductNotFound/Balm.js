import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { SvgXml } from 'react-native-svg';
import balm from '../../assets/svg/balm.svg';

const styles = StyleSheet.create({
    balmArea: {
        marginLeft: 50,
    }
})

export default function Balm(){
    return(
        <View style={styles.balmArea}>
            <SvgXml width="150" height="150" xml={balm} />
        </View>
    )
} 