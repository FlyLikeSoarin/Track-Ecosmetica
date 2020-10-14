import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';

import photo from '../../assets/svg/photo-camera-interface-symbol-for-button.svg';

const styles = StyleSheet.create({
    cross: {
        marginRight: 10
    }
})

export default function PhotoButton(){
    return(
        <View style={styles.cross}>
            <SvgXml width="20" height="20" xml={photo} />
        </View>
    )
} 