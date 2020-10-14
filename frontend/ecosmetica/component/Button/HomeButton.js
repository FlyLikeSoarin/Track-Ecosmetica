import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import Home from '../../assets/svg/home.svg';

function HomeButton() {
    return(
        <View>
            <Text>HOME</Text>
            <SvgXml width="50" height="50" xml={Home} />
        </View>
    )}

export default HomeButton;