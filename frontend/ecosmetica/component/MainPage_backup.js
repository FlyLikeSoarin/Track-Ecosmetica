 
import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import barchartImage from '../static/plus-positive-add-mathematical-symbol.svg';
import backgroundImage from '../static/bottles-mock.jpg';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#9ae7af',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Forum',
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
    fontFamily: 'Forum',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-center',
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
 
  render() {
    return (
<<<<<<< HEAD
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.header}>
          <Text style={styles.textHeader}> Ecosmetica </Text>
        </View>
        <View style={styles.body}>
        </View>
        <View style={styles.footer}>
          <Button
            title={'Scan'}
            onPress={this.props.openScan}
          />
        </View>
=======
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Продукт</Text>
        </View>
        <View style={styles.productImage}>
          <ImageBackground source={backgroundImage} style={styles.image}>
          <View></View>
          </ImageBackground>
        </View>
        <View style={styles.containerProductText}>
          <Text style={styles.productText}>У вас пока нет отсканированных продуктов</Text>
        </View>
        <View style={styles.buttonMenuContainer}>
            <TouchableOpacity
              title={'Scan'}
              onPress={this.props.openScan}
            >
              <img width={70} heigth={70} src={barchartImage}/>
            </TouchableOpacity>  
        </View>   
>>>>>>> origin/masha
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#c4ffd1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  body: {
    flex: 10,
    backgroundColor: '#fffde5',
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  button: {
    margin: 20,
    width: 50,
    height: 50,
  },
  scan: {
    width: 150,
    height: 150,
  }
});