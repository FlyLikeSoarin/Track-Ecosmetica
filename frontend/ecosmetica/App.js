import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import BarcodeScannerComponent from './component/Scanner';

export default class App extends React.Component {

  state = {
    openScan: false,
  };

  render() {
    const { openScan } = this.state;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        { openScan && <BarcodeScannerComponent />}
        <Button
            title={'Scan'}
            onPress={() => this.setState({ openScan: !openScan })}
          />
      </View>
    );
  }
}