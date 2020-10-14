import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Home from '../../assets/svg/home.svg';


export default function HomeButton(){
    return(
        <SvgXml width="50" height="50" xml={Home} />
    )
} 