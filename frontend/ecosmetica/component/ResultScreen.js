import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';


export default class ResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.scanAgain = this.props.scanAgain;
    this.state = {
      data: this.props.data,
    };

  }

  render() {
    const { data } = this.state;

    if (data === null) {
      return <Text>data = null</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.name}>{data}</Text>
        <Button
              title={'Tap to Scan Again'}
              onPress={this.scanAgain}
        />
      </View >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  }
});