import * as React from 'react';
import { StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import star from '../../assets/svg/star_1.svg';

const styles = StyleSheet.create({
    star: {
    }
})

export default function Star({width, height, fill, fillOpacity}){
    return(
        <SvgXml width={width} height={height} xml={star} fill={fill} fillOpacity={fillOpacity}/>
    )
} 