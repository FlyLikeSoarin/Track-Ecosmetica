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
    Modal,
    ScrollView
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import StarRating from 'react-native-star-rating';
import AwesomeAlert from 'react-native-awesome-alerts';
import Heart from '../../assets/svg/heart.svg'
import ReviewIcon from '../../assets/svg/comment-white-oval-bubble.svg'
import { profileImageMock } from '../../assets/svg/profile-image.svg';
import LikeIcon from '../../assets/svg/like.svg'
import fillHeart from '../../assets/svg/fill-heart.svg'
import Score from './Score'
import Back from '../Button/BackButton'
import HomeButton from '../Button/HomeButton'
import ScanButton from '../Button/ScanButton'
import ProfileButton from '../Button/ProfileButton'
import StarScore from '../History/StarScore'
import UserRaiting from './UserRaiting'
import ProfileImageMock from '../Button/ProfileImageMock';
import InputReview from './InputReview'
import InfoScore from './InfoScore'

import config from '../../config'


var width = Dimensions.get('window').width;


Font.loadAsync({
    'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf'),
    'NotoSanaTamilBold': require('../../assets/fonts/NotoSansTamilUI-Bold.ttf')
});

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
            isFavorite: this.props.route.params.data_.favorite,
            //userScore: this.props.route.params.data_.user_score,
            userScore: 0,
            countScores: this.props.route.params.data_.review_count,
            showReviews: false,
            colorsTabsPanel: {
                ingredientsTop: '#009E4E',
                ingredientsBackground: '#fff',
                reviewsTop: '#929292',
                reviewsBackground: '#F1F1F1'
            },
            reviews: [
                {
                    //review: 'comment text',
                    //rating: 3.5,
                    //user: 'Ivan Ivanov',
                    //date: '29 нояб. 2020г.',
                    //likes: 123,
                    "id": 6,
                    "product": "Conditioner with hemp oil",
                    "rating": 3,
                    "review": "ир",
                    "timestamp": "2020-11-13T12:24:27.550687Z".slice(0, 11),
                    "title": "",
                    "user": "name",
                },
            ],
            /*reviews: []*/
            modalVisible: false,
            modalScoreInfoVisible: false,
            username: '',
            user_avatar: '',
            token: null,
            id_user: null,
            userMakedReview: false,
            prevReview: null,
            history: null
        }
        this.setReviews = this.setReviews.bind(this)
        this.hideModalScoreInfo = this.hideModalScoreInfo.bind(this)
    }
    async componentDidMount() {
        console.log(this.props.route.params.barcode)
        await Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf'),
            'NotoSanaTamilBold': require('../../assets/fonts/NotoSansTamilUI-Bold.ttf')
        });

        //console.log("sorted", ingredients_sorted)
        /*this.setState({
          ingredients: ingredients_sorted
        })*/

        this.state.navigation.setOptions({
            headerShown: false
        })
        let token = null
        try {
            token = await AsyncStorage.getItem('token');
        } catch (e) {
            console.log(e)
        }
        try {
            let history = await AsyncStorage.getItem('history');
            this.setState({ history: JSON.parse(history) })
        } catch (e) {
            console.log(e)
        }
        if (token !== null) {
            this.setState({
                token: token,
            })
            this.loadUserData(token)
        }
        await fetch(`${config.SERVER_URL}/product/review/?code=${this.state.barcode}&product=${this.state.name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((ans) => {
                console.log(ans)
                this.setState({
                    reviews: ans
                })
                console.log("from fetch")
                this.checkUserMakedReview(ans)
            })
            .catch(() => {
                console.log("fail get reviews")
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.route.params.data_ != this.props.route.params.data_) {
            this.setState({
                navigation: this.props.navigation,
                type: this.props.route.params.type,
                barcode: this.props.route.params.barcode,
                name: this.props.route.params.data_.name,
                img_url: this.props.route.params.data_.img_url,
                brand: this.props.route.params.data_.brand_name,
                total_score: this.props.route.params.data_.total_score,
                ingredients: this.props.route.params.data_.ingredients,
                product: this.props.route.params.data_,
                isFavorite: this.props.route.params.data_.favorite,
                userScore: this.props.route.params.data_.user_score,
                countScores: this.props.route.params.data_.review_count,
            })
        }
    }
    checkUserMakedReview(reviews) {
        //console.log(reviews)
        //console.log("чек ревью", this.state.id_user)
        let total_score = 0
        //if (this.state.id_user !== null) {
        const id_user = this.state.id_user
        for (var i = 0; i < reviews.length; ++i) {
            const item = reviews[i]
            //console.log(item)
            total_score += item.rating
            if (item.user == id_user) {
                this.setState({
                    userMakedReview: true,
                    prevReview: item
                })
            }
        }
        if (reviews.length != 0) {
            total_score = total_score / reviews.length
        }
        this.setState({
            userScore: total_score
        })
        console.log("checkUserMakedReview", total_score)
        //}
    }
    async loadUserData(token) {
        await fetch(`${config.SERVER_URL}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((ans) => {
                console.log('user')
                console.log(ans)
                const username = ans.first_name + " " + ans.last_name
                this.setState({
                    username: username,
                    id_user: ans.id,
                    user_avatar: ans.profile_img_url
                })
            })
            .catch(e => console.log(e))
    }
    async setReviews(rating, textReview, user_avatar) {
        let day = new Date().getDate()
        let month = new Date().getMonth()
        let year = new Date().getFullYear()
        let oldReviews = this.state.reviews
        //console.log("umr", this.state.userMakedReview)
        //console.log('prev', this.state.prevReview)
        let old_number_reviews = this.state.countScores;
        let old_user_score = this.state.userScore;
        if (this.state.userMakedReview && this.state.prevReview !== null) {
            const index = oldReviews.indexOf(this.state.prevReview)
            //console.log("id", index)
            if (index !== -1) {
                oldReviews.splice(index, 1)
            }
            const sum = old_number_reviews * old_user_score - this.state.prevReview.rating
            old_number_reviews -= 1
            old_user_score = sum / old_number_reviews
            if (old_number_reviews !== 0) {
                old_user_score = sum / old_number_reviews
            } else {
                old_user_score = 0
            }
        }
        //console.log(oldReviews)

        let review = {
            "id": 0,
            "product": "",
            "rating": rating,
            "review": textReview,
            "timestamp": year + '-' + month + '-' + day + 'T12:24:27.550687Z', //"2020-11-13T12:24:27.550687Z",
            "title": "",
            "user_full_name": this.state.username,
            "user": this.state.id_user,
            "profile_img_url": user_avatar
        }
        //console.log(review)
        oldReviews = oldReviews.concat([review])
        const new_user_score = ((old_user_score * old_number_reviews) + rating) / (old_number_reviews + 1)
        this.setState({
            reviews: oldReviews,
            countScores: old_number_reviews + 1,
            userScore: new_user_score,
            userMakedReview: true,
            prevReview: review
        })
        const token = this.state.token
        console.log(token)
        console.log(JSON.stringify({
            title: '',
            review: textReview,
            rating: rating
        }))
        console.log("barcode", this.state.barcode)
        await fetch(`${config.SERVER_URL}/product/review/?code=${this.state.barcode}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                title: '',
                review: textReview,
                rating: rating
            })
        })
            .then((resp) => {
                console.log(resp.status)
                return resp.json()
            })
            .then((ans) => {
                console.log(ans)
            })
            .catch(() => {
                console.log("fail get reviews")
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
    async addToFavorites() {
        if (this.state.token != null) {
            const prevIsFavoite = this.state.isFavorite
            this.setState({
                isFavorite: !prevIsFavoite
            })
            let body = {}
            if (prevIsFavoite) {
                body = {
                    in_favorite: false
                }
            }
            console.log('barcode', this.state.barcode)
            await fetch(`${config.SERVER_URL}/product/make_favorite/?code=${this.state.barcode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.state.token}`,
                },
                body: JSON.stringify(body)
            })
                .then((resp) => {
                    console.log(resp.status)
                    return resp.json()
                })
                .then((ans) => {
                    console.log(ans)
                })
                .catch(() => {
                    console.log("fail add to favorite")
                })
        } else {
            this.setState({
                showAuthError: true
            })
        }
    }
    handleAddReview() {
        if (this.state.token != null) {
            this.setState({
                modalVisible: true,
            })
        } else {
            this.setState({
                showAuthError: true
            })
        }
    }
    hideModalScoreInfo() {
        this.setState({
            modalScoreInfoVisible: false
        })
    }

    reloadHistory() {
        const oldHistory = (this.state.history == null) ? [] : this.state.history;
        const newProduct = [{
            product: {
                name: this.state.name,
                brand_name: this.state.brand,
                favorite: this.state.isFavorite,
                total_score: this.state.total_score,
                img_url: this.state.img_url
            },
            barcode: this.state.barcode
        }];
        for (let i = 0; i < oldHistory.length; i++) {
            if (newProduct[0].barcode === oldHistory[i].barcode) {
                oldHistory.splice(i, 1);
                break;
            }
        }
        let newHistory = newProduct.concat(oldHistory);
        AsyncStorage.setItem('history', JSON.stringify(newHistory))
        this.props.route.params.updateHistory(newHistory)
    }
    goHome() {
        this.reloadHistory()
        this.props.navigation.navigate('Home')
    }

    render() {
        let {
            img_url, brand, name,
            total_score, ingredients, reviews,
            modalVisible, token, barcode, isFavorite, countScores,
            modalScoreInfoVisible, userMakedReview } = this.state
        let user_raiting = this.state.userScore;
        if (user_raiting == -1) {
            user_raiting = 0
        }
        const user_scores = this.state.userScore;
        if (total_score < 0) total_score = 0;
        if (img_url == "") {
            img_url = 'https://static.ewg.org/skindeep/img/ewg_missing_product.png'
        }
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => this.goHome()}>
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
                            <TouchableOpacity style={styles.scoreArea}
                                onPress={() => this.setState({ modalScoreInfoVisible: true })}
                            >
                                <Score score={total_score} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomImageArea}>
                            <View style={styles.userRaitingArea}>
                                <UserRaiting score={user_raiting} number={countScores} />
                            </View>
                            <View style={styles.addToFavoritArea}>
                                <TouchableOpacity style={styles.addToFavoritesButton}
                                    onPress={() => this.addToFavorites()}
                                >
                                    {!isFavorite && (<SvgXml xml={Heart} width={25} height={25} />)}
                                    {isFavorite && <SvgXml xml={fillHeart} width={25} height={25} />}
                                    {!isFavorite && (<Text style={styles.addToFavoritText}>
                                        В избранное
                                    </Text>)}
                                    {isFavorite && (<Text style={styles.addToFavoritText}>
                                        Удалить
                                    </Text>)}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addReviewArea}>
                                <TouchableOpacity style={styles.addToFavoritesButton}
                                    onPress={() => this.handleAddReview()}
                                >
                                    <SvgXml xml={ReviewIcon} width={25} height={25} fill='#FFA21F' />
                                    {!userMakedReview && <Text style={styles.addToFavoritText}>
                                        Оставить отзыв
                                    </Text>}
                                    {userMakedReview && <Text style={styles.addToFavoritText}>
                                        Изменить отзыв
                                    </Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*<View style={styles.scoreStarArea}>
                            {StarScore(total_score, styles.scoreArea, 15)}
                        </View>*/}
                    </View>
                    <ScrollView style={styles.scrollView} >
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
                                        Ингредиенты
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
                                            key={item => { item.id }}
                                            renderItem={renderItemReview}
                                        />
                                    </SafeAreaView>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => this.goHome()}
                    >
                        <HomeButton fill='#929292' />
                        <Text style={styles.buttonText}>Домой</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => {
                            this.props.navigation.navigate('Scanner', { updateHistory: this.props.route.params.updateHistory })
                            this.reloadHistory();
                        }}>
                        <ScanButton />
                        <Text style={styles.buttonText} >Сканировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonArea}
                        onPress={() => {
                            this.props.navigation.navigate('Profile', { logOut: () => { console.log('logout') }, token: this.state.token, updateHistory: this.props.route.params.updateHistory })
                            this.reloadHistory();
                        }}
                    >
                        <ProfileButton fill='#929292' />
                        <Text style={styles.buttonText}>Профиль</Text>
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={this.state.showAuthError}
                    showProgress={false}
                    title="Вы не авторизованны"
                    message="Опция доступна только авторизованным пользователям"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.setState({
                            showAuthError: false
                        })
                    }}
                />
                <AwesomeAlert
                    show={this.state.showAuthError2}
                    showProgress={false}
                    title="Отзыв уже есть"
                    message="Отзывы могут оставлять только авторизованные пользователи"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.setState({
                            showAuthError2: false
                        })
                    }}
                />
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
                        prevReview={this.state.prevReview}
                        user_avatar={this.state.user_avatar}
                    />
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalScoreInfoVisible}
                    onRequestClose={() => {
                        console.log("close")
                    }}
                >
                    <InfoScore hideModalScoreInfo={() => this.setState({
                        modalScoreInfoVisible: false
                    })} />
                </Modal>
            </SafeAreaView>
        );
    }
}
function colorScore(score) {
    if (1 <= score && score <= 4) {
        return '#FF4D00'
    } else if (5 <= score && score <= 7) {
        return '#FFA21F'
    } else if (8 <= score && score <= 10) {
        return '#009E4E'
    } else {
        return '#C4C4C4'
    }
}
function colorBackgroundInfo(score) {
    if (0 <= score && score <= 4) {
        return '#FFD5C2'
    } else if (5 <= score && score <= 7) {
        return '#FFEDD3'
    } else if (8 <= score && score <= 10) {
        return '#E3FFF1'
    } else {
        return '#F1F1F1'
    }
}
function IngregientBlock({ item }) {
    const [showInfo, setShowInfo] = React.useState(false);
    let description = item.cosmetics_info_description;
    if (description === "") {
        description = "Информация отсутствует"
    }
    const ingredient_name = item.inci_name;
    return (
        <View style={styles.wrapIngredientBlock}>
            <TouchableOpacity style={styles.ingredientBlock}
                onPress={() => {setShowInfo(!showInfo) }}
            >
                <View style={
                    {
                        backgroundColor: colorScore(item.score),
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100
                    }
                }>
                    <Text style={styles.ingredientScoreText}>
                        {item.score}
                    </Text>
                </View>
                <Text style={styles.ingredientText}>
                    {ingredient_name}
                </Text>
            </TouchableOpacity>
            {(showInfo && item.score !== 0)  && (
                <View style={{
                    backgroundColor: '#F1F1F1',//colorBackgroundInfo(item[1]),
                    alignSelf: 'stretch',
                    padding: 10,
                    marginTop: 5
                }}>
                    <View style={{ flexDirection: 'column', paddingBottom: 10 }}>

                        <Text style={styles.ingredientText}>
                            Безопасность:  {item.safety}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.ingredientText}>
                            Применение:  {item.usage}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.ingredientText}>
                            Происхождение:  {item.background}
                        </Text>
                    </View>
                </View>
            )}
            {(showInfo && item.score === 0)  && (
                <View style={{
                    backgroundColor: '#F1F1F1',//colorBackgroundInfo(item[1]),
                    alignSelf: 'stretch',
                    padding: 10,
                    marginTop: 5
                }}>
                    <View style={{ flexDirection: 'column', paddingBottom: 10 }}>

                        <Text style={styles.ingredientText}>
                            Информация об ингредиенте отсутствует.
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
const renderItem = ({ item }) => {
    return (
        <IngregientBlock item={item} />
    );
}
const renderItemReview = ({ item }) => {
    let color_like = '#676767';
    let background_color = '#fff'
    /*if (item.like_it) {
        background_color = '#FFA21F'
        color_like = '#fff'
    }*/
    let date = item.timestamp;
    date = date.slice(0, 10)
    const url = item.profile_img_url

    return (
        <View style={styles.reviewBlock}>
            <View style={styles.wrapRevewText}>
                <Text style={styles.textReview}>
                    {item.review}
                </Text>
            </View>
            <View style={styles.bottomReviewBlock}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.rating}
                    starSize={10}
                    fullStarColor='#FFA21F'
                    emptyStarColor='#FFA21F'
                />
                <View style={styles.userInfoAndLikes}>
                    <View style={styles.userInfoArea}>
                        {(url === "") && <SvgXml width="30" height="30" xml={profileImageMock} />}
                        {(url !== "") && <Image style={{ width: 30, height: 30, borderRadius: 100 }} source={{ uri: `${url}` }} />}
                        <View style={styles.nameAndDateArea}>
                            <Text style={styles.userNameText}>
                                {item.user_full_name}
                            </Text>
                            <Text style={styles.dateText}>
                                {date}
                            </Text>
                        </View>
                    </View>
                    {/*<TouchableOpacity
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
                    </TouchableOpacity>*/}
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
        flex: 0.5,
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
        flexDirection: 'row-reverse',
    },
    bottomImageArea: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 5
    },
    userRaitingArea: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
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
        fontSize: 12,
        fontWeight: 'bold',
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
        height: width - 0.7 * width,
        width: width - 0.7 * width,
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

        alignItems: 'stretch',
    },
    scrollView: {
        flex: 2
    },
    nameText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 22,
        marginLeft: 25,
        marginRight: 10,
        color: '#4F4F4F',
        marginTop: 10
    },
    brandText: {
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 16,
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
        fontSize: 16,
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
        paddingBottom: 0
    },
    innerScroll: {
        marginBottom: 100
    },
    ingredientBlock: {
        borderBottomWidth: 0.5,
        borderColor: '#929292',
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientText: {
        flex: 14,
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 14,
        color: '#676767',
        paddingLeft: 10,
        paddingBottom: 10
    },
    ingredientBoldText: {
        fontFamily: 'NotoSanaTamilBold',
        fontSize: 14,
        color: '#676767',
        paddingLeft: 10,
        paddingBottom: 10,
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