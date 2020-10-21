import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Button,
    Image, 
} from 'react-native';
import EmptyHistoryImage from '../static/EmtyHistory.jpg'

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200,
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
    }
});

const EmptyHistory = () => {
    return(
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={EmptyHistoryImage}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>У вас пока нет отсканированных продуктов</Text>
            <Button title='Сканировать' color='#009E4E'></Button>
          </View>         
        </View>
  
        
        )
}

export default EmptyHistory