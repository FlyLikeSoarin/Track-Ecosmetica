import * as React from 'react';
import { View, AppRegistry } from 'react-native';

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