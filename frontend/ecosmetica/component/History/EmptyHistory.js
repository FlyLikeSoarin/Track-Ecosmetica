import * as React from 'react';
import * as Font from 'expo-font'
import { 
    Text, 
    View, 
    StyleSheet, 
    Button,
    Image, 
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import EmptyHistoryImage from '../../static/EmtyHistory.jpg'

import ScanButton from '../Button/ScanButton'

var {scrWidth, scrHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 290,
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 28,
        color: '#676767',
        padding: 50,
        fontFamily: 'NotoSanaTamilLight',
    },
    buttonsArea: {
      flex: 0.6,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      paddingRight: 60,
      paddingLeft: 60,
      paddingVertical: 20,
  },
    scanButton: {
      backgroundColor: '#009E4E',
      borderRadius: 25,
      padding: 10,
      alignItems: 'center'
    },
    scanButtonText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'NotoSanaTamilLight',
    },
});

const EmptyHistory = ({navigation, updateHistory}) => {
    React.useEffect(() => {
        async function loadFont() {
          await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
          });
        }
    
        loadFont()
      }, []);
    return(
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={EmptyHistoryImage}/>
          </View>
            <Text style={styles.text}>У вас пока нет отсканированных продуктов</Text>
            <View style={styles.buttonsArea}>
            <TouchableOpacity style={styles.scanButton}
              onPress={() => navigation.navigate('Scanner', {updateHistory : updateHistory})}
            >
              <Text style={styles.scanButtonText} >Сканировать</Text>
            </TouchableOpacity>
          </View>         
        </View>
  
        
        )
}

export default EmptyHistory