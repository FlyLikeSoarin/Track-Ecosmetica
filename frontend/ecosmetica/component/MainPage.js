import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import barchartImage from '../static/GKQKMxrWAK0.jpg';
import im from '../static/B12Ha_j6nzc.jpg';


export default class MainPage extends React.Component {

 
  render() {
    //const image = { uri: '../static/B12Ha_j6nzc.jpg'};
    //const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
              flex: 5,
          }}
        >
          <ImageBackground source={im}/>
        </View>
        <View
          style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexGrow: 1,
          }}>
        
          <Button
            title={'Scan'}
            onPress={this.props.openScan}
            color={'red'}
          >
            <ImageBackground source={barchartImage}></ImageBackground>
          </Button>
          <img width={80} height={80} src = {barchartImage}/>
        </View>
      </View>
    );
  }
}