import * as React from 'react';
import { StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { star } from '../../assets/svg/star.svg';

const styles = StyleSheet.create({
    star: {
    }
})

export default function Star({width, height, fill}){
    return(
        <SvgXml width={width} height={height} xml={star} fill={fill}/>
    )
} 