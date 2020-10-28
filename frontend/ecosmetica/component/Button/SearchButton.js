import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Search from '../../assets/svg/searching.svg';

const styles = StyleSheet.create({
    button: {
        padding: 10
    }
})

export default function SearchButton(){
    return(
        <View style={styles.button} >
            <SvgXml width="24" height="24" fill='#929292' xml={Search} />
        </View>
    )
} 