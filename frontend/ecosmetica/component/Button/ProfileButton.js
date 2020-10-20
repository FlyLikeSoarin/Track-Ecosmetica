import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Profile from '../../assets/svg/profile.svg';

export default function ProfileButton(){
    return(
        <SvgXml xml={Profile} />
    )
} 