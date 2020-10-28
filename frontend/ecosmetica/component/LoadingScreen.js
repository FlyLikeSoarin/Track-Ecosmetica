import * as React from 'react';
import { useLayoutEffect } from 'react';
import { 
  Text,
  View, 
  StyleSheet, 
} from 'react-native';

const LoadingScreen = ({navigation}) => {
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
              <Text style={styles.textFake}>Eco</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#C4C4C4',
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
    },
    bigTextEnd: {
        color: '#FFFFFF',
        fontSize: 40,
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