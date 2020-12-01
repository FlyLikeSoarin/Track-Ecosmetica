import * as React from 'react';
import * as Font from 'expo-font';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import CrossButton from '../Button/CrossButton'
import ImageWindow3 from '../../assets/svg/infoimage3.svg'

var width = Dimensions.get('window').width;

Font.loadAsync({
    'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    infoArea: {
        backgroundColor: '#fff',
        width: width - 100,
        borderRadius: 10,
    },
    headerInfoArea: {
        flexDirection: 'row-reverse'
    },
    closeButton: {
        padding: 10,
    },
    bodyInfoArea: {

    },
    imageArea: {
        alignItems: 'center',
    },
    textInfoArea: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 30,
    },
    textInfo: {
        textAlign: 'center',
        fontFamily: 'NotoSansTamilLight',
        fontSize: 16
    }
})

/**
 * props: hideModalScoreInfo
 */
export default function InfoSore(props) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoArea}>
                <View style={styles.headerInfoArea}>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => props.hideModalScoreInfo()}>
                        <CrossButton fill='#929292' />
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyInfoArea}>
                    <View style={styles.imageArea}>
                        <SvgXml xml={ImageWindow3} width={width - 250} />
                    </View>
                    <View style={styles.textInfoArea}>
                        <Text style={styles.textInfo}>
                            Каждый продукт имеет рейтинг, основанный
                            на безопасности
                            его состава.
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
} 
