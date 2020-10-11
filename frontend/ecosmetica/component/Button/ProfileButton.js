import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Profile from '../../assets/svg/facial-treatment.svg';

export default function ProfileButton(){
    return(
        <SvgXml width="50" height="50" xml={Profile} />
    )
} 