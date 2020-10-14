import * as React from 'react';
import * as Font from 'expo-font';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView} from 'react-native';
import { SvgXml } from 'react-native-svg';

import CrossButton from '../Button/CrossButton';
import Balm from '../ProductNotFound/Balm'
import Star from './Score'
import risk from '../../assets/svg/biohazard.svg'
import allergy from '../../assets/svg/coronavirus.svg'


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
        padding: 25,
     },
     name: {
        position: 'absolute',
        top: 20,
        left: 20,
     },
     nameText: {
         color: '#467354',
         fontFamily: 'Forum',
         fontSize: 30
     },
     metrics: {
        flexDirection: 'row',
        position: 'absolute',
        top: 100,
        left: 20
     },
     metrica: {
         flex:1,
         flexDirection: 'row',
         alignItems: 'center'
     },
     riskScore: {
        color: '#C94052',
        fontFamily: 'Forum',
        marginLeft: 10,
        fontSize: 20
     },
     allergyScore: {
        color: '#8E6F00',
        fontFamily: 'Forum',
        marginLeft: 10,
        fontSize: 20
     },
     ingregientsArea: {
         flex: 1,
         flexDirection: 'column',
     },
    ingredientTitle: {
        fontFamily: 'Forum',
        fontSize: 20,
        color: '#467354',
        margin: 10
    },
    ingregientBlock: {
        backgroundColor: '#C7F9CC',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        margin: 5,
    },
    ingredientName: {
        flex: 1,
        fontFamily: 'Forum',
        fontSize: 20,
        color: '#467354'
    },
    scoreIngregient: {
        fontFamily: 'Forum',
        fontSize: 20,
        color: '#467354'
    },
    contentContainer: {
        flexGrow : 1
    }
})


export default class Product extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            barcode: this.props.route.params.data,
            name: 'Название',
            img_url: '',
            brand: '',
            naturality_score: '',
            risk_score: '20%',
            allergy_score: '50%',
            ewg_score: 10,
            description: '',
            ingredients: ['Ингредиент1', 'Ингредиент2', 'Ингредиент3', 'Ингредиент4', 'Ингредиент5', 'Ингредиент4', 'Ингредиент5'],
        }
    }*/

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            type: this.props.route.params.type,
            barcode: this.props.route.params.barcode,
            name: this.props.route.params.data_.name,
            img_url: '',
            brand: this.props.route.params.data_.brand_name,
            //naturality_score: this.props.route.params.data_.naturality_score,
            risk_score: this.props.route.params.data_.eco_score,
            allergy_score: this.props.route.params.data_.safety_score,
            ewg_score: this.props.route.params.data_.total_score,
            description: this.props.route.params.data_.description,
            ingredients: this.props.route.params.data_.ingredients,
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
        const { name, ewg_score, risk_score, allergy_score, ingredients } = this.state
        //ingredients.json()
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
                        <Star score={ewg_score}/>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>
                            {name}
                        </Text>
                    </View>
                    <View style={styles.metrics}>
                        <View style={styles.metrica}>
                            <SvgXml width="30" height="30" xml={risk} />
                            <Text style={styles.riskScore}>
                                {risk_score}
                            </Text>
                        </View>
                        <View style={styles.metrica}>
                            <SvgXml width="30" height="30" xml={allergy} />
                            <Text style={styles.allergyScore}>
                                {allergy_score}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <ScrollView decelerationRate="fast" contentContainerStyle={styles.contentContainer}>
                            <View style={styles.ingregientsArea}>
                                <Text style={styles.ingredientTitle}>
                                    Ингредиенты:
                                </Text>
                                {ingredients.map(ingredient => {
                                    return (
                                        <View style={styles.ingregientBlock}>
                                            <Text style={styles.ingredientName}>
                                                {ingredient}
                                            </Text>
                                            <Text style={styles.scoreIngregient}>
                                            10
                                            </Text>
                                        </View>
                                    );
                                 })}
                            </View>
                        </ScrollView >
                    </View>
                </View>
            </View>
        );
    }
}