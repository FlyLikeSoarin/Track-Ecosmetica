import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    AsyncStorage,
    Image,
    FlatList,
    SafeAreaView,
    Modal
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import StarRating from 'react-native-star-rating';

import Heart from '../../assets/svg/heart.svg'
//import HeartFill from '../../assets/svg/heart_fill.svg'
import ReviewIcon from '../../assets/svg/review.svg'
import { profileImageMock } from '../../assets/svg/profile-image.svg';
import LikeIcon from '../../assets/svg/like.svg'

import Score from './Score'
import Back from '../Button/BackButton'
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'
import StarScore from '../History/StarScore'
import UserRaiting from './UserRaiting'
import ProfileImageMock from '../Button/ProfileImageMock';
import InputReview from './InputReview'

var width = Dimensions.get('window').width;
const URL = 'http://185.148.82.169:8005';

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
            total_score: this.props.route.params.data_.total_score,
            ingredients: this.props.route.params.data_.ingredients,
            product: this.props.route.params.data_,

            showReviews: false,
            colorsTabsPanel: {
                ingredientsTop: '#009E4E',
                ingredientsBackground: '#fff',
                reviewsTop: '#929292',
                reviewsBackground: '#F1F1F1'
            },
            reviews: [{
                review: {
                    text: 'comment text',
                    score: 3.5,
                    user_name: 'Ivan Ivanov',
                    date: '29 нояб. 2020г.',
                    likes: 123,
                },
                like_it: true
            }],
            /*reviews: []*/
            modalVisible: false,
        }

        this.setReviews = this.setReviews.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
        });

        this.state.navigation.setOptions({
            headerShown: false
        })

        let token = null
        try {
            token = await AsyncStorage.getItem('token');
            console.log('Profile', token)
        } catch (e) {
            console.log(e)
        }
        if (token !== null) {
            this.setState({
                token: token,
            })

        }

        /*await fetch(`${URL}/product/review/?code=${this.state.barcode}`, {
             method: 'GET',
             headers: {'Content-Type': 'application/json'}
           })
           .then((resp) => {
               return resp.json()
           })
           .then((ans) => {
               console.log(ans)
           })
           .catch(() => {
               console.log("fail get reviews")
           })*/

    }

    setReviews(rating, textReview) {
        let day = new Date().getDate()
        let month = new Date().getMonth()
        let year = new Date().getFullYear()

        let oldReviews = this.state.reviews
        let review = {
            text: textReview,
            score: rating,
            user_name: 'Tanya',
            date: day + '.' + month + '.' + year,
            likes: 0
        }
        console.log(review)
        oldReviews = oldReviews.concat({
            review: review,
            like_it: false
        })
        this.setState({
            reviews: oldReviews
        })
    }

    showReviews() {
        this.setState({
            showReviews: true,
            colorsTabsPanel: {
                ingredientsTop: '#929292',
                ingredientsBackground: '#F1F1F1',
                reviewsTop: '#009E4E',
                reviewsBackground: '#fff'
            }
        })
    }
    hideReviews() {
        this.setState({
            showReviews: false,
            colorsTabsPanel: {
                ingredientsTop: '#009E4E',
                ingredientsBackground: '#fff',
                reviewsTop: '#929292',
                reviewsBackground: '#F1F1F1'
            }
        })
    }


    render() {
        const {
            img_url, brand, name,
            total_score, ingredients, reviews,
            modalVisible, token, barcode } = this.state
        const user_raiting = 5;
        const number_user_scores = 123;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.state.navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <View style={styles.topInfoArea}>
                        <View style={styles.imageAndScore}>
                            <View style={styles.emptyArea} />
                            <View style={styles.imageArea}>
                                <Image style={styles.image} source={{ uri: `${img_url}` }} />
                            </View>
                            <View style={styles.scoreArea}>
                                <Score score={total_score} />
                            </View>
                        </View>
                        <View style={styles.bottomImageArea}>
                            <View style={styles.userRaitingArea}>
                                <UserRaiting score={user_raiting} number={number_user_scores} />
                            </View>
                            <View style={styles.addToFavoritArea}>
                                <TouchableOpacity style={styles.addToFavoritesButton}>
                                    <SvgXml xml={Heart} />
                                    <Text style={styles.addToFavoritText}>
                                        В избранное
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addReviewArea}>
                                <TouchableOpacity style={styles.addToFavoritesButton}
                                    onPress={() => this.setState({
                                        modalVisible: true,
                                    })}
                                >
                                    <SvgXml xml={ReviewIcon} />
                                    <Text style={styles.addToFavoritText}>
                                        Оставить отзыв
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*<View style={styles.scoreStarArea}>
                            {StarScore(total_score, styles.scoreArea, 15)}
                        </View>*/}

                    </View>
                    <View style={styles.infoArea}>
                        <View style={styles.nameWrap}>
                            <Text style={styles.nameText}>
                                {name}
                            </Text>
                            <Text style={styles.brandText}>
                                {brand}
                            </Text>
                        </View>
                        <View style={styles.tabsArea}>
                            <TouchableOpacity style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopWidth: 3,
                                borderTopColor: this.state.colorsTabsPanel.ingredientsTop,
                                backgroundColor: this.state.colorsTabsPanel.ingredientsBackground,
                                borderBottomRightRadius: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: this.state.colorsTabsPanel.ingredientsBackground
                            }}
                                onPress={() => this.hideReviews()}
                            >
                                <Text style={styles.tabsText}>
                                    Ингридиенты
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopWidth: 3,
                                borderTopColor: this.state.colorsTabsPanel.reviewsTop,
                                backgroundColor: this.state.colorsTabsPanel.reviewsBackground,
                                borderBottomLeftRadius: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: this.state.colorsTabsPanel.reviewsBackground,
                            }}
                                onPress={() => this.showReviews()}
                            >
                                <Text style={styles.tabsText}>
                                    Отзывы
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {!this.state.showReviews && (
                            <View style={styles.ingregients}>
                                <SafeAreaView style={styles.scroll}>
                                    <FlatList
                                        style={styles.innerScroll}
                                        data={ingredients}
                                        key={item => { item[0] }}
                                        renderItem={renderItem}
                                    />
                                </SafeAreaView>
                            </View>
                        )}
                        {this.state.showReviews && (
                            <View style={styles.reviews}>
                                {reviews.length === 0 && (
                                    <View style={styles.wrapEmptyReviewText}>
                                        <Text style={styles.emptyReviewsText}>
                                            Отзывы отсутствуют
                                        </Text>
                                    </View>
                                )}
                                <SafeAreaView style={styles.scroll}>
                                    <FlatList
                                        style={styles.innerScroll}
                                        data={reviews}
                                        key={item => { item.text }}
                                        renderItem={renderItemReview}
                                    />
                                </SafeAreaView>

                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonArea}
                    onPress={() => this.props.navigation.navigate('Home')}
                    >
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        console.log("close")
                    }}
                >
                    <InputReview hideModal={() => this.setState({
                        modalVisible: false,
                    })}
                        barcode={this.state.barcode}
                        token={this.state.token}
                        product={this.state.product}
                        setReviews={this.setReviews}
                    />
                </Modal>
            </View>
        );
    }
}

function colorScore(score) {
    if (0 <= score && score <= 4) {
        return '#FF4D00'
    } else if (5 <= score && score <= 7) {
        return '#FFA21F'
    } else if (8 <= score && score <= 10) {
        return '#009E4E'
    } else {
        return '#C4C4C4'
    }
}

const renderItem = ({ item }) => {
    return (
        <View style={styles.ingredientBlock}>
            <View style={
                {
                    backgroundColor: colorScore(item[1]),
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100
                }
            }>
                <Text style={styles.ingredientScoreText}>
                    {item[1]}
                </Text>
            </View>
            <Text style={styles.ingredientText}>
                {item[0].toUpperCase()}
            </Text>
        </View>
    );
}

const renderItemReview = ({ item }) => {
    let color_like = '#676767';
    let background_color = '#fff'
    if (item.like_it) {
        background_color = '#FFA21F'
        color_like = '#fff'
    }
    return (
        <View style={styles.reviewBlock}>
            <View style={styles.wrapRevewText}>
                <Text style={styles.textReview}>
                    {item.review.text}
                </Text>
            </View>
            <View style={styles.bottomReviewBlock}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.review.score}
                    starSize={10}
                    fullStarColor='#FFA21F'
                    emptyStarColor='#FFA21F'
                />
                <View style={styles.userInfoAndLikes}>
                    <View style={styles.userInfoArea}>
                        <SvgXml width="30" height="30" xml={profileImageMock} />
                        <View style={styles.nameAndDateArea}>
                            <Text style={styles.userNameText}>
                                {item.review.user_name}
                            </Text>
                            <Text style={styles.dateText}>
                                {item.review.date}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            margin: 10,
                            borderWidth: 0.5,
                            borderColor: color_like,
                            backgroundColor: background_color,
                            borderRadius: 5,
                            padding: 5,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                        
                    >
                        <SvgXml width="20" height="15" xml={LikeIcon} fill={color_like} />
                        <Text style={{
                            fontSize: 9,
                            fontFamily: 'NotoSanaTamilLight',
                            color: color_like
                        }}>
                            {item.review.likes}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginTop: 22,
    },
    header: {
        flex: 0.7,
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
        alignSelf: 'flex-start'
    },
    /*body*/
    topInfoArea: {
        flex: 1.2,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderBottomColor: '#929292',
        borderBottomWidth: 0.5,
    },
    imageAndScore: {
        flex: 2,
        flexDirection: 'row',
    },
    emptyArea: {
        flex: 1,
    },
    imageArea: {
        flex: 1,
        padding: 10
    },
    scoreArea: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    bottomImageArea: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 5
    },
    userRaitingArea: {
        flex: 1
    },
    addToFavoritArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    addReviewArea: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    addToFavoritText: {
        color: '#FFA21F',
        fontSize: 10,
        fontFamily: 'NotoSanaTamilLight'
    },
    addToFavoritesButton: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    scoreStarArea: {
        width: width,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: '#000',
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 20,
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
        fontSize: 14,
        marginLeft: 25,
        color: '#4F4F4F',
        marginTop: 10
    },
    brandText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 12,
        marginLeft: 25,
        color: '#606060',
    },
    nameWrap: {
        paddingBottom: 10
    },
    tabsArea: {
        flexDirection: 'row',
        height: 30,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderColor: '#929292',
        borderTopWidth: 3,
        borderTopColor: '#009E4E',
        borderBottomWidth: 0,
        backgroundColor: '#F1F1F1'
    },
    tabsText: {
        color: '#4F4F4F',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 12,
    },
    ingredientsAndReview: {
        flex: 2,
        alignItems: 'stretch',
    },
    ingregients: {
        marginTop: 10
    },
    scroll: {
        alignItems: 'stretch',
    },
    innerScroll: {
        marginBottom: 100
    },
    ingredientBlock: {
        borderBottomWidth: 0.5,
        borderColor: '#929292',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientText: {
        flex: 12,
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

    reviews: {
        marginTop: 10
    },
    reviewBlock: {

    },
    wrapRevewText: {
        flex: 2,
        padding: 20
    },
    textReview: {
        fontFamily: 'NotoSanaTamilLight',
        color: '#676767',
        fontSize: 15
    },
    bottomReviewBlock: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#929292',

    },
    userInfoAndLikes: {
        flexDirection: 'row',
        marginTop: 5,
    },
    userInfoArea: {
        flex: 1,
        flexDirection: 'row',
        margin: 0,
        marginLeft: 0,

        alignItems: 'center'
    },
    nameAndDateArea: {
        margin: 10,
    },
    userNameText: {
        color: '#009E4E',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 9,
    },
    dateText: {
        fontSize: 7,
        fontFamily: 'NotoSanaTamilLight',
        color: '#676767'
    },
    likesArea: {
        margin: 10,
        borderWidth: 0.5,
        borderColor: '#676767',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    likesText: {
        fontSize: 9,
        fontFamily: 'NotoSanaTamilLight',
        color: '#676767'
    },
    emptyReviewsText: {
        color: '#979797',
        fontSize: 24,
        fontFamily: 'NotoSanaTamilLight',
    },
    wrapEmptyReviewText: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginTop: 100,
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