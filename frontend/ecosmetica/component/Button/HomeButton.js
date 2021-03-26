import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Home from '../../assets/svg/home.svg';


export default function HomeButton(props){
    return(
        <SvgXml width="30" height="30" xml={Home} fill={props.fill}/>
    )
} 
