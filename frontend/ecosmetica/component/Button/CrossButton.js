import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Cross from '../../assets/svg/cross-sign.svg';

const styles = StyleSheet.create({
    cross: {
    }
})

export default function CrossButton(props) {
    let colorFill = props.fill;
    if (colorFill === null) {
        colorFill = '#fff'
    }
    return (
        <View style={styles.cross}>
            <SvgXml width="25" height="25" xml={Cross} fill={colorFill} />
        </View>
    )
} 