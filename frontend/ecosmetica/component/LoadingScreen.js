import * as React from 'react';
import * as Font from 'expo-font';
import { useLayoutEffect } from 'react';
import { 
  Text,
  View, 
  StyleSheet, 
} from 'react-native';

const LoadingScreen = ({navigation}) => {

    React.useEffect(() => {
        Font.loadAsync({
            'NotoSanaTamilExtraBold': require('../assets/fonts/NotoSansTamil-Light.ttf')
        });
    })
    useLayoutEffect(() => {        
        navigation.setOptions({headerShown: false})
    }, [navigation])
    return(
        <View style={styles.body}>
            <View style={styles.bigTextWrap}>
              <Text style={styles.bigTextStart}>Eco</Text>
              <Text style={styles.bigTextEnd}>smetica</Text>
            </View>
            <View style={styles.textFakeWrap}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigTextWrap: {
        flex: 3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    bigTextStart: {
        color: '#009E4E',
        fontSize: 40,
        fontFamily: 'NotoSanaTamilExtraBold'
    },
    bigTextEnd: {
        color: '#000',
        fontSize: 40,
        fontFamily: 'NotoSanaTamilExtraBold'
    },
    textFakeWrap: {
        flex: 1,
    },
    textFake: {
        color: '#C4C4C4',
        fontSize: 40,
    },
})

export default LoadingScreen