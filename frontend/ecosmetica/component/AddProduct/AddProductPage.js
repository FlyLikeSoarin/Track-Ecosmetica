import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';

import CrossButton from '../Button/CrossButton';
import AddPhoto from './AddPhotoArea'
import PhotoButton from './PhotoButton'

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
    input: {
        backgroundColor: 'white',
        margin: 15,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 40,
        color: '#467354'
     },
     bottom: {
        alignItems: 'stretch',
        position: 'absolute',
        top: 160,
        width: width,
     },
     submitButton: {
        backgroundColor: '#C1E1A0',
        color: '#467354',
        width: 200,
        height: 50,
        justifyContent: 'space-around',
        marginTop:30,
        alignSelf: 'center'
     },
     submitButtonText: {
        color: '#467354',
        fontFamily: 'Forum',
        textAlign: 'center',
     },
     textArea: {
        alignItems: 'stretch',
        flexDirection: 'column',
     },
     headerTextArea: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        flexDirection: 'row',

     },
     titleTextArea: {
        flex: 1,
        fontFamily: 'Forum',
        color: '#467354',
     },
     textAreaInput: {
        borderWidth: 4,
        backgroundColor: 'white',
        borderColor: '#C1E1A0',
        borderRadius: 20,
        marginRight: 25,
        marginLeft: 25,
        padding: 10,
        height: 60,
        color: '#467354'
     }
})

export default class ProductNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            barcode: this.props.route.params.data,
            name: '',
            brand: '',
        }
        this.handleBarcode = this.handleBarcode.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleBrand = this.handleBrand.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Forum': require('../../assets/fonts/Forum.ttf')
        });

        this.state.navigation.setOptions({
          headerShown: false
        })
    }

    handleBarcode(text) {
        this.setState({
            barcode: text
        });
    }
    handleName(text) {
        this.setState({
            name: text
        });
    }
    handleBrand(text) {
        this.setState({
            brand: text
        });
    }
    handleSubmit() {
        // Отправляем данные на бэк
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.crossArea}
                        onPress={()=>this.state.navigation.navigate('Scanner')}>
                        <CrossButton />
                    </TouchableOpacity>
                    <TextInput style={styles.input}
                        value={this.state.barcode}
                        placeholder='Штрих-код'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleBarcode}
                        />
                    <TextInput style={styles.input}
                        placeholder='Название'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleName}/>
                    <TextInput style={styles.input}
                        placeholder='Бренд'
                        placeholderTextColor = "#DCDCDC"
                        autoCapitalize = "none"
                        onChangeText={this.handleBrand}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.headerPart}>
                        <View style={styles.headerTail} />
                        <View style={styles.headerTailBefore} />
                        <AddPhoto />
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.textArea}>
                            <View style={styles.headerTextArea}>
                                <Text style={styles.titleTextArea}>Ингредиенты:</Text>
                                <PhotoButton/>
                            </View>
                            <TextInput
                                style={styles.textAreaInput}
                                autoCapitalize = "none"
                            />
                        </View>
                        <View style={styles.textArea}>
                            <View style={styles.headerTextArea}>
                                <Text style={styles.titleTextArea}>Описание:</Text>
                                <PhotoButton/>
                            </View>
                            <TextInput
                                style={styles.textAreaInput}
                                autoCapitalize = "none"
                            />
                        </View>
                        <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={() => this.handleSubmit()}>
                            <Text style={styles.submitButtonText}>Добавить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}