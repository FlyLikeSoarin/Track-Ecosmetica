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
const goodScoreCOlor = '#009E4E';
  
const styles = StyleSheet.create({
    metricsTextWrap: {
      flex: 1,
    },
});

const colorScore = (score) => {
    if (0 <= score && score <= 2) {
        return '#FF4D00'
    } else if (3 <= score && score < 4) {
        return '#FFA21F'
    } else {
        return '#009E4E'
    }
  }
  
const StarScore = (score, styleWrap) => {
    const starsScore = 0;
    if(score > 0)
      starsScore = Math.floor(score/2);
    const scoreColor=colorScore(starsScore);
    let result = [0,0,0,0,0].map((item, index)=>{
      if (index<starsScore) return <Star key={index} width='20' height='20' fill={scoreColor}/>
      else return <Star key={index} width='20' height='20' fill={scoreColor} fillOpacity={90}/>
    })
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