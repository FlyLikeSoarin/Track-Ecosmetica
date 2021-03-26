import * as React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import headerTail from '../../assets/svg/headerTail.svg';


export default function HeaderPart(){
    return(
        <View>
            <SvgXml width="150" height="150" xml={headerTail} />
        </View>
    )
} 