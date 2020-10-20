import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import Home from '../../assets/svg/home.svg';


const styles = StyleSheet.create({
    home: {
        
    }
})

export default function HomeButton(){
    return(
        <SvgXml width="30" height="30" xml={Home} fill="#009E4E"/>
    )
} 