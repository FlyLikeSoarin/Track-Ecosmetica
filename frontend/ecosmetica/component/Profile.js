import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';

const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    productImage: {
      flex: 5,
      backgroundColor: '#9ae7af',
    },
});

export default class Profile extends React.Component {
 
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Продукт</Text>
          </View>
          <View style={styles.productImage}>
            <Text>5555</Text>
          </View>
  
        </View>
      );
    }
  }