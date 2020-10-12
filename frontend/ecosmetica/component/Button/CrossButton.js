import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Cross from '../../assets/svg/cross-sign.svg';

const styles = StyleSheet.create({
    cross: {
        marginLeft: 30,
        marginTop: 40,
        marginRight: 30,
    }
})

export default function CrossButton(){
    return(
        <View style={styles.cross}>
            <SvgXml width="30" height="30" xml={Cross} />
        </View>
    )
} 