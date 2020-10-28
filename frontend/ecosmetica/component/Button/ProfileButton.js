import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Profile from '../../assets/svg/profile.svg';

export default function ProfileButton(props){
    return(
        <SvgXml width="30" height="30" xml={Profile} fill={props.fill}/>
    )
} 