import * as React from 'react';
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { profileImageMock } from '../../assets/svg/profile-image.svg';



export default function ProfileImageMock(){
    return(
        <View>
            <SvgXml width="60" height="60" xml={profileImageMock} />
        </View>
    )
} 