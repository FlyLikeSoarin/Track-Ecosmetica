import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import back from '../../assets/svg/back_new.svg';

export default function BackButton(props) {
  let colorFill = props.fill;
  if (colorFill === null) {
    colorFill = '#fff'
  }
  return (
  	<View style={ styles.back }>
     <SvgXml xml={back} fill={colorFill}/>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
      marginLeft: 20,
      marginRight: 20,
  }
})
