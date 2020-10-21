import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import Shampoo from '../../assets/svg/shampoo.svg';


export default function ShampooSvg(){
    return(
        <SvgXml xml={Shampoo}/>
    )
} 