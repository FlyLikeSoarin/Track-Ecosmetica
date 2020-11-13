import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Profile from '../../assets/svg/profile.svg';
import User from '../../assets/svg/user.svg';

export default function ProfileButton(props){
    return(
        <SvgXml width="30" height="30" xml={User} fill={props.fill}/>
    )
} 