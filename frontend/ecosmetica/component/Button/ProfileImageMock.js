import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { profileImageMock } from '../../assets/svg/profile-image.svg';

const styles = StyleSheet.create({
    image: {
    }
})

export default function ProfileImageMock(){
    return(
        <View style={styles.image}>
            <SvgXml width="60" height="60" xml={profileImageMock} />
        </View>
    )
} 