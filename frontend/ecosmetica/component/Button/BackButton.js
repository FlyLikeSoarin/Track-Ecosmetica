import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import back from '../../assets/svg/back_new.svg';

export default function BackButton() {
  return (
  	<View style={ styles.back }>
     <SvgXml xml={back} />
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
      marginLeft: 20
  }
})
