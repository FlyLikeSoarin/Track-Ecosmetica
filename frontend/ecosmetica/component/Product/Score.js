import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Font from 'expo-font';
import Bookmark from '../../assets/svg/bookmark_6.svg';

Font.loadAsync({
            'NotoSanaTamilLight': require('../../assets/fonts/NotoSansTamil-Light.ttf')
});


const styles = StyleSheet.create({
    starArea: {
    },
    star: {
    },
    ingredientScoreText: {
        fontSize: 20,
        color: '#fff',//'#323131',
        fontFamily: 'NotoSanaTamilLight',
    },
    metricText: {
        zIndex: 1,
        paddingRight: 28,
        paddingTop: 15,
      },
      metricImage: {
        position: 'absolute',
        top: 10,
        right: 10,
        //backgroundColor: 'red'
      },
      scoreWrap: {
        //backgroundColor: 'green'
      }
})

function colorScore(score){
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

const ImageScore = ({image, score}) => {
    return(
      <View style={styles.scoreWrap}>
        <View style={styles.metricImage}>
          <SvgXml xml={image} width={50} height={50} fill={colorScore(score)}/>
        </View>
        <View style={styles.metricText}>
          <Text style={{fontSize:18, color: '#323131'}}>{score}</Text>
        </View>
      </View>
    )
  }
  

export default function Score(props){
    return( <ImageScore image={Bookmark} score={props.score}/>)
        // <View style={
        //     {
        //         // backgroundColor: colorScore(props.score),
        //         // alignItems: 'center',
        //         // justifyContent: 'center',
        //         // borderRadius: 100,
        //         // width: 45,
        //         // height: 45,
        //         // marginTop: 20,
        //         // marginRight: 15
        //     }
        // }>
            {/* <SvgXml xml={bookmark} fill='#C4C4C4'/> */}
            // <ImageScore image={Bookmark} score={props.score}/>
            {/* <Text style={styles.ingredientScoreText}>
            {props.score}
            </Text> */}
        // </View>
    //)
} 