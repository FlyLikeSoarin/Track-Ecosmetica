import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';

import CrossButton from '../Button/CrossButton';
import Balm from '../ProductNotFound/Balm'


var width = Dimensions.get('window').width;

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
    bottom: {
        alignItems: 'stretch',
        position: 'absolute',
        top: 160,
        width: width,
     },
})


export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            barcode: this.props.route.params.data,
            name: '',
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
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.crossArea}
                        onPress={()=>this.state.navigation.navigate('Home')}>
                        <CrossButton />
                    </TouchableOpacity>
                    <Balm />
                </View>
                <View style={styles.body}>
                    <View style={styles.headerPart}>
                        <View style={styles.headerTail} />
                        <View style={styles.headerTailBefore} />
                    </View>
                    <View style={styles.bottom}>
                    
                    </View>
                </View>
            </View>
        );
    }
}