import * as React from 'react';
import { 
  Text,
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList 
} from 'react-native';
import ProfileImageMock from './Button/ProfileImageMock';
import Star from './Button/Star'
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'flex-end', 
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#C4C4C4',
    borderTopColor: '#C4C4C4',      
  },
  imageWrap: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTextWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
   // marginVertical: 10,
    //paddingBottom: 5,
  },
  bigText: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'NotoSanaTamilLight',
  },
  body: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoWrap: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  bathScoreWrap: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  textScore: {
    color: '#4F4F4F',
    fontSize: 18,
    fontFamily: 'NotoSanaTamilLight',
  },
  imageScore: {
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textScoreNumber: {
    color: '#4F4F4F',
    fontSize: 20,
    fontFamily: 'NotoSanaTamilLight',
    padding: 10,
  },
  buttonAddBefore: {
    backgroundColor: '#E5E5E5',
    height: 48,
    width: 260,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonAddAfter: {
    backgroundColor: '#E5E5E5',
    height: 48,
    width: 260,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonTextBefore: {
    color: '#009E4E',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'NotoSanaTamilLight',
  },
  buttonTextAfter: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'NotoSanaTamilLight',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ButtonTemplate = ({title, onPress, style, styleText}) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        <Text style={styleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
  
export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      bathScore: '',
      excelledIngridiends: [],
    };
  }  
   
  async componentDidMount() {
    await Font.loadAsync({
        'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });
  }
      render() {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.imageWrap}>
                <ProfileImageMock/>
              </View>
              <View style={styles.bigTextWrap}>
                  <Text style={styles.bigText}>Ирен Адлер</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.infoWrap}>
                {(this.state.bathScore!=='')&&(
                  <View>
                    <View style={styles.bathScoreWrap}>
                      <Text style={styles.textScore}>Оценка ванной</Text>
                      <View style={styles.imageScore}>
                        <Star width='40' height='40' fill='#009E4E'/>
                        <Text style={styles.textScoreNumber}>{this.state.bathScore}</Text>
                      </View>
                    </View>
                    <ButtonTemplate 
                      title='Оценить заново' 
                      style={styles.buttonAddAfter}
                      styleText={styles.buttonTextAfter}
                      onPress={()=>this.setState({bathScore: 9})} />
                  </View>)}
                {(this.state.bathScore=='')&&
                  <ButtonTemplate 
                    title='Оценить ванную' 
                    style={styles.buttonAddBefore}
                    styleText={styles.buttonTextBefore}
                    onPress={()=>this.setState({bathScore: 10})} />}
              </View>
              <View style={styles.infoWrap}>
                <ButtonTemplate 
                title='Исключить ингридиент'
                style={styles.buttonAddBefore}
                styleText={styles.buttonTextBefore}
                onPress={()=>this.state.navigation.navigate('AddIngridient')} />
              </View>
            </View>
          </View>
        );
      }
    }
