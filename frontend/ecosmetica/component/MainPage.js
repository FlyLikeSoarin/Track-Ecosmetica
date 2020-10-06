 
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