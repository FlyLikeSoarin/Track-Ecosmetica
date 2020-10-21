import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    Image,
    FlatList,
    SafeAreaView
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import CrossButton from '../Button/CrossButton';
import Balm from '../ProductNotFound/Balm'
import Star from './Score'
import risk from '../../assets/svg/biohazard.svg'
import allergy from '../../assets/svg/coronavirus.svg'

import Back from '../Button/BackButton'
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'


var width = Dimensions.get('window').width;

/*const styles = StyleSheet.create({
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
})*/


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
            img_url: this.props.route.params.data_.img_url,
            brand: this.props.route.params.data_.brand_name,
            //naturality_score: this.props.route.params.data_.naturality_score,
            risk_score: this.props.route.params.data_.eco_score,
            allergy_score: this.props.route.params.data_.safety_score,
            total_score: this.props.route.params.data_.total_score,
            description: this.props.route.params.data_.description,
            ingredients: this.props.route.params.data_.ingredients,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

        this.state.navigation.setOptions({
            headerShown: false
        })
    }

    render() {
        const { img_url,brand, name, total_score, risk_score, allergy_score, ingredients } = this.state
        console.log(img_url)
        //ingredients.json()
        /*return(
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
                                        <View style={styles.ingregientBlock} key={ingredient}>
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
        );*/
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.state.navigation.navigate('Scanner')}>
                        <Back />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <View style={styles.imageArea}>
                        {/*https://static.ewg.org/skindeep/img/ewg_missing_product.png*/}
                        <Image style={styles.image} source={{ uri: `${img_url}` }} />
                        <View style={styles.scoreArea}>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Text style={styles.score}>
                                {total_score/2}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoArea}>
                        <Text style={styles.nameText}>
                            {name}
                        </Text>
                        <Text style={styles.brandText}>
                            {brand}
                        </Text>
                        <View style={styles.ingregients}>
                            <SafeAreaView style={styles.scroll}>
                                <FlatList
                                    data={ingredients}
                                    renderItem={renderItem}
                                    keyExtractor={item => { item[1] }}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonArea}>
                        <HomeButton fill='#929292' />
                        <Text style={styles.buttonText}>Домой</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Scanner')}
                    >
                        <ScanButton />
                        <Text style={styles.buttonText} >Сканировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <ProfileButton />
                        <Text style={styles.buttonText}>Профиль</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const renderItem = ({ item }) => {
    return (
        <View style={styles.ingredientBlock}>
            <View>
                <Text style={styles.ingredientScoreText}>
                {item[0]}
                </Text>
            </View>
            <Text style={styles.ingredientText}>
                {item[1]}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'flex-end',
        backgroundColor: 'white',
        alignItems: 'stretch',
    },
    header: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
    body: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopColor: '#929292',
        borderTopWidth: 0.5
    },
    /*header*/
    backButton: {
        marginTop: 15
    },
    /*body*/
    imageArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
    },
    image: {
        height: 150,
        width: 150
    },
    scoreArea: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        marginRight: 25,
    },
    score: {
        color: '#FFA21F',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 14,
        paddingLeft: 5
    },
    infoArea: {
        flex: 2,
        alignItems: 'stretch',
    },
    nameText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 26,
        marginLeft: 25,
        color: '#4F4F4F',
        marginTop: 10
    },
    brandText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 18,
        marginLeft: 25,
        color: '#606060',
    },
    ingregients: {
        marginTop: 25
    },
    scroll: {
        alignItems: 'stretch'
    },
    ingredientBlock: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#929292',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 15,
        color: '#676767',
    },
    ingredientScoreText: {
        fontSize: 15,
        color: '#676767',
        fontFamily: 'NotoSanaTamilLight',
        marginRight: 10
    },

    /*buttom*/
    buttonArea: {
        flex: 1,
        alignItems: 'center'
    },
    buttonText: {
        color: '#929292',
        fontSize: 10,
        fontFamily: 'NotoSanaTamilLight',
        textAlign: 'center',
        justifyContent: 'center',
    }
})