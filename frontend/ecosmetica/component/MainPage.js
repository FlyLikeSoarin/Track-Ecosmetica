import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';


export default class MainPage extends React.Component {

  render() {

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>

        <Button
            title={'Scan'}
            onPress={this.props.openScan}
          />
      </View>
    );
  }
}