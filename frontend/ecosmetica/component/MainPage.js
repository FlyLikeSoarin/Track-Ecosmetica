import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import barchartImage from '../static/plus-positive-add-mathematical-symbol.svg';
import backgroundImage from '../static/bottles-mock.jpg';
import { HeaderBackground } from '@react-navigation/stack';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#9ae7af',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Forum -apple-system',
    textAlign: 'center',
  },
  productImage: {
    flex: 5,
  },
  containerProductText: {
    padding: 20,
  },
  productText: {
    color: '#467354',
    fontSize: 40,
    fontFamily: 'Forum -apple-system',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonMenuContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#9ae7af',
  },
  buttonImage: {
    color:'#9ae7af',
  },
  img: {
    width: 80,
    height: 80,
  },
})

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
    };
  } 

  componentDidMount(){
    this.state.navigation.setOptions({ 
      headerTitle: 'Ecosmetica',
      headerStyle: {
        backgroundColor: '#9ae7af',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <Button title='Search' onPress={()=> this.state.navigation.navigate('Search')}/>
      ),
    });
  }
 
  render() {
    return (
      <View style={styles.container}>
        {/* Body */}
        <View style={styles.productImage}>
          <ImageBackground source={backgroundImage} style={styles.image}>
          <View></View>
          </ImageBackground>
        </View>
        <View style={styles.containerProductText}>
          <Text style={styles.productText}>У вас пока нет отсканированных продуктов</Text>
        </View>

        {/* Footer */}
        <View style={styles.buttonMenuContainer}>
            <Text>Home</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Scanner')}
            >
              <Text>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              <Text>Profile</Text>
            </TouchableOpacity> 
        </View>   
      </View>
    );
  }
}
