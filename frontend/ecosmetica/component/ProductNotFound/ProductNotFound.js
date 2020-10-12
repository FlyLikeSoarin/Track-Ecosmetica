import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import CrossButton from '../Button/CrossButton';
import Balm from './Balm';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
    header: {
        flex: 2,
        backgroundColor: '#9ae7af',
        flexDirection: 'column',
    },
    body: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#C1E1A0',
        color: '#467354',
        width: 200,
        height: 50,
        justifyContent: 'space-around',
        marginTop:30,
    },
    bigText: {
        color: '#467354',
        fontFamily: 'Forum',
        fontSize: 40,
    },
    smallText: {
        position: 'absolute',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 140,
        color: '#467354',
        fontFamily: 'Forum',
        fontSize: 20,
    },
    buttonText: {
        color: '#467354',
        fontFamily: 'Forum',
        textAlign: 'center',
    },
    crossArea: {
        alignItems: 'flex-end',
    },
    headerPart: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    headerTail: {
        width: 0,
        height: 0,
        borderTopWidth: 100,
        borderTopColor: '#9ae7af',
        borderLeftColor: 'transparent',
        borderLeftWidth: 100,
        borderRightColor: '#9ae7af',
        borderRightWidth: 100,
        borderBottomColor: 'transparent',
        borderBottomWidth: 100, 
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    headerTailBefore: {
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        height: 200,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 200,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        transform: [
          {rotate: '0deg'}
        ]
    },
    bigTextWrap: {
        position: 'absolute',
        flexDirection: 'column',
        top: 20,
        right: 20,
    }
});

export default class ProductNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            data: this.props.route.params.data,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Forum': require('../../assets/fonts/Forum.ttf')
        });

        this.state.navigation.setOptions({
          headerShown: false
        })
      }

    render() {
        const {type, data} = this.state
        return(
            <View style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity 
                        style={styles.crossArea}
                        onPress={()=>this.state.navigation.navigate('Scanner')}>
                        <CrossButton />
                    </TouchableOpacity>
                    <Balm />
                </View>
                <View style={styles.body}>
                    <View style={styles.headerPart}>
                        <View style={styles.headerTail} />
                        <View style={styles.headerTailBefore} />
                        <View style={styles.bigTextWrap}>
                            <Text style={styles.bigText}>Штрих-код</Text>
                            <Text style={styles.bigText}>не найден</Text>
                        </View>
                    </View>
                    <Text style={styles.smallText}>Помогите нам добавить этот продукт в нашу базу</Text>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={()=>this.state.navigation.navigate('AddProduct', {data: data, type: type})}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Добавить штрих-код</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}