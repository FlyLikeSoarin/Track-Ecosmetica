import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Image as Img } from 'react-native-svg';
import profileImage from '../static/9HL2MCfxlio.jpg';
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'white',
  },
  header: {
      flex: 2,
      backgroundColor: '#9ae7af',
      flexDirection: 'column',
  },
  body: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
  },
  bottom: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  imageArea: {
    marginTop: 50,
    marginLeft: 30,
  },
  button: {
      backgroundColor: '#C1E1A0',
      color: '#467354',
      width: 200,
      height: 50,
      justifyContent: 'space-around',
      marginTop:30,
  },
  bigText: {
      color: '#467354',
      fontFamily: 'Forum',
      fontSize: 40,
  },
  smallText: {
      position: 'absolute',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 140,
      color: '#467354',
      fontFamily: 'Forum',
      fontSize: 20,
  },
  buttonText: {
      color: '#467354',
      fontFamily: 'Forum',
      textAlign: 'center',
  },
  crossArea: {
      alignItems: 'flex-end',
  },
  headerPart: {
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
  },
  headerTail: {
      width: 0,
      height: 0,
      borderTopWidth: 100,
      borderTopColor: '#9ae7af',
      borderLeftColor: 'transparent',
      borderLeftWidth: 100,
      borderRightColor: '#9ae7af',
      borderRightWidth: 100,
      borderBottomColor: 'transparent',
      borderBottomWidth: 100, 
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
  },
  headerTailBefore: {
      position: 'absolute',
      right: 1,
      top: 0,
      height: 200,
      width: 200,
      backgroundColor: 'white',
      borderRadius: 200,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
      transform: [
        {rotate: '0deg'}
      ]
  },
  bigTextWrap: {
      position: 'absolute',
      flexDirection: 'column',
      top: 50,
      right: 150,
  },
  img: {
    width: 150,
    height: 150,
  },
});


const renderItem = ({item}) => {
  return(
    <View>
      <Text>{item.title}</Text>
    </View>
  )
};

const ItemList = ({data}) => {
  return(
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}
  
export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
    };
  }  
   
      render() {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.imageArea}>
              <Image style={styles.img} source={profileImage}/>
              {/* <SvgXml width={80} height={80} xml={headerTail}> */}
                
              {/* </SvgXml> */}
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.headerPart}>
                <View style={styles.headerTail} />
                <View style={styles.headerTailBefore} />
                <View style={styles.bigTextWrap}>
                  <Text style={styles.bigText}>Ирен Адлер</Text>
                </View>
              </View>
              <Text style={styles.smallText}>Исключенные ингридиенты</Text>
                    <ItemList data={this.state.ingridients}/>
                    <View style={styles.bottom}>
                      <TouchableOpacity onPress={()=>this.state.navigation.navigate('AddIngridient')}>
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>Исключить ингридиент</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.state.navigation.navigate('Home')}>
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>Оценить ванную</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
            </View>
          </View>
        );
      }
    }