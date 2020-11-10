import * as React from 'react';
import * as Font from 'expo-font';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import StarRating from 'react-native-star-rating';
import AwesomeAlert from 'react-native-awesome-alerts';
import { LinearGradient } from 'expo-linear-gradient';

import ProfileImageMock from '../Button/ProfileImageMock';
import CrossButton from '../Button/CrossButton'

Font.loadAsync({
    'NotoSanaTamilBold': require('../../assets/fonts/NotoSansTamil-Light.ttf')
});


const URL = 'http://185.148.82.169:8005';

export default class Product extends React.Component {
    /*props: hideModal, token, barcode, product, setReviews*/
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            accssedLength: 512,
            rating: 0,
            reviewText: '',
            showAlertZeroRating: false,
            barcode: this.props.barcode,
            product: this.props.product
        }

        this.handleReview = this.handleReview.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }

    onStarRatingPress(rating) {
        this.setState({
            rating: rating
        });
    }

    handleReview(text) {
        const len = text.length
        const prevAccssedLength = this.state.accssedLength;
        if (prevAccssedLength > 0 || len <= 512) {
            this.setState({
                reviewText: text,
                accssedLength: 512 - len
            })
        }
    }

    async handleSend() {
        if (this.state.rating === 0) {
            this.setState({
                showAlertZeroRating: true
            });
        } else {
            //console.log(this.state.token)
            //console.log(this.state.product)
            token = this.state.token
            product = this.state.product
            await fetch(`${URL}/product/review/?product=${product}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                    review: this.state.reviewText,
                    rating: this.state.rating,
                    title: ''
                })
            })
                .then((resp) => {
                    status = resp.status
                    console.log(status)
                    return resp.json()
                })
                .then((ans) => {
                    console.log(ans)
                })
                .catch(() => {
                })
            this.props.setReviews(this.state.rating, this.state.reviewText)
            this.props.hideModal();
        }
    }

    render() {
        const { accssedLength, reviewText } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <LinearGradient 
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 160,
                    }}/>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => this.props.hideModal()}>
                        <CrossButton />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton}
                        onPress={() => this.handleSend()}
                    >
                        <Text style={styles.submitReviewText}>
                            Отправить
                            </Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.body}
                >
                    <View style={styles.ratingArea}>
                        <StarRating
                            disabled={false}
                            rating={this.state.rating}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor='#FFA21F'
                            emptyStarColor='#FFA21F'
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <ProfileImageMock />
                        <TextInput
                            style={styles.inputText}
                            value={reviewText}
                            placeholder='Напишите ваш отзыв'
                            placeholderTextColor="#8B8B8B"
                            autoCapitalize="none"
                            multiline={true}
                            autoFocus={true}
                            onChangeText={this.handleReview}
                        />
                    </View>
                    <View style={styles.numberSymbolsArea}>
                        <Text style={{color: '#979797'}}>
                            {accssedLength}
                        </Text>
                    </View>
                </KeyboardAvoidingView>
                <AwesomeAlert
                    show={this.state.showAlertZeroRating}
                    title=""
                    message="Пожалуйста, добавте оценку"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="ОК"
                    confirmButtonColor="#009E4E"
                    onConfirmPressed={() => {
                        this.setState({
                            showAlertZeroRating: false
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    header: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    closeButton: {
        marginTop: 10
    },
    submitButton: {
        marginTop: 10
    },
    submitReviewText: {
        color: '#fff',
        fontFamily: 'NotoSanaTamilBold',
        fontSize: 16
    },
    body: {
        flex: 6,
        backgroundColor: '#fff'
    },
    ratingArea: {
        backgroundColor: '#F4F4F4',
        padding: 20
    },
    inputArea: {
        flex: 10,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    inputText: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
    numberSymbolsArea: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 10,
    },
})
