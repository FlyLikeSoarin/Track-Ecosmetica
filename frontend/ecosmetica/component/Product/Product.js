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

export default class Product extends React.Component {

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
                                    style={styles.innerScroll}
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

function colorScore(score){
    if (0 <= score && score <= 4) {
        return '#FF4D00'
    } else if (5 <= score && score <= 7) {
        return '#FFA21F'
    } else {
        return '#009E4E'
    }
}

const renderItem = ({ item }) => {
    return (
        <View style={styles.ingredientBlock}>
            <View style={
                {
                    backgroundColor: colorScore(item[0]),
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100
                }
            }>
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
        paddingLeft: 5,
        fontWeight: 'bold'
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
        alignItems: 'stretch',
    },
    innerScroll: {
        marginBottom: 100
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
        flex: 16,
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 15,
        color: '#676767',
        paddingLeft: 10
    },
    ingredientScoreText: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'NotoSanaTamilLight',
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