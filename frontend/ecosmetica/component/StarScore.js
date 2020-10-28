import * as React from 'react';
import * as Font from 'expo-font'
import { 
    Text, 
    View, 
    StyleSheet, 
} from 'react-native';
import Star from './Button/Star'

const badScoreColor='#FF4D00';
const averageScoreColor = '#FFA21F';
const averageScoreColorLight = '#FFDDAE';
const goodScoreCOlor = '#009E4E';
  
const styles = StyleSheet.create({
    metricsTextWrap: {
      flex: 1,
    },
});


  
const StarScore = (score, styleWrap, size) => {
  function colorScore(score) {
    if (score == 0)
      return '#009E4E'
    else if (0 < score && 2 >= score) {
        return '#FF4D00'
    } else if (3 <= score && score < 4) {
        return '#FFA21F'
    } else {
        //return goodScoreCOlor;
        return '#FFA21F'
    }
  }
    let starsScore = 0;
    if(score > 0)
      starsScore = Math.floor(score/2);
    const scoreColor=colorScore(starsScore); 
    let result = [0,0,0,0,0].map(
      (item, index)=>{return <Star key={index} width={size} height={size} fill={scoreColor} fillOpacity={100}/>});
    if (starsScore>0) {
      result = [0,0,0,0,0].map((item, index)=>{
        if (index<starsScore) return <Star key={index} width={size} height={size} fill={scoreColor}/>
        else return <Star key={index} width={size} height={size} fill={scoreColor} fillOpacity={90}/>
    })}
    return(
      <View style={styleWrap}>
        {result}
        <View style={styles.metricsTextWrap}>
          <Text style={{
            color: scoreColor,
            fontSize: 14,
            padding: 4,
            fontFamily: 'NotoSanaTamilLight',
            }}>{starsScore}</Text>
        </View>
      </View>
)}

export default StarScore