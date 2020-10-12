import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { SvgXml } from 'react-native-svg';
import headerTail from '../../assets/svg/headerTail.svg';

const styles = StyleSheet.create({
    header: {
        
    }
})

export default function HeaderPart(){
    return(
        <View style={styles.header}>
            <SvgXml width="150" height="150" xml={headerTail} />
        </View>
    )
} 