import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import BarcodeScannerComponent from './component/Scanner';
import MainPage from './component/MainPage';

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
        { openScan && <BarcodeScannerComponent closeScan={() => this.setState({ openScan: !openScan })}/>}
        { !openScan && <MainPage
            openScan={() => this.setState({ openScan: !openScan })}
          />
        }

      </View>
    );
  }
}