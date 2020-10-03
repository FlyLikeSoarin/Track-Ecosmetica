import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import back from '../../assets/back.svg';

const BackButton = (props) => {
  return (
  	<View style={ styles.container }>
    <Image
      style={styles.tinyLogo}
      source={ back }
      onClick={ props.closeScan }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default BackButton;