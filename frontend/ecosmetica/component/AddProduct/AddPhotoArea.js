import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { SvgXml } from 'react-native-svg';
import add from '../../assets/svg/add.svg';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#009E4E',
        width: 120,
        height: 120,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default function AddPhoto(){
    return(
        <View style={styles.container}>
            <SvgXml width="80" height="80" xml={add} />
        </View>
    )
} 