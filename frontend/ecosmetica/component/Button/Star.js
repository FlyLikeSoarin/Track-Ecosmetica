import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import star from '../../assets/svg/star.svg';

const styles = StyleSheet.create({
    star: {
    }
})

export default function Star(){
    return(
        <View style={styles.cross}>
            <SvgXml width="30" height="30" xml={star} />
        </View>
    )
} 