import * as React from 'react';
import * as Font from 'expo-font';
import {View, StyleSheet, Text} from 'react-native';
import StarRating from 'react-native-star-rating';


Font.loadAsync({
    'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
});

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        alignItems: 'flex-start'
    },
    scoreArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    scoreText: {
        color: "#4F4F4F",
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 18
    },
    numberScoresText: {
        color: '#676767',
        fontFamily: 'NotoSanaTamilLight',
        fontSize: 10
    }
})

/**
 * props: score - пользовательская оценка, number - кол-во оценок
 */ 
export default function UserRaiting(props){
    const score = props.score;
    const number_scores = props.number;
    //console.log(props)
    
    return(
        <View style={styles.container}>
            <Text style={styles.scoreText}>
                {score}
            </Text>
            <StarRating 
                disabled={false}
                maxStars={5}
                rating={score}
                starSize={15}
                fullStarColor='#FFA21F'
                emptyStarColor='#FFA21F'
            />
            <Text style={styles.numberScoresText}>
                {number_scores} оценок
            </Text>
        </View>
    )
} 
