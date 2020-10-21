import * as React from 'react';
import * as Font from 'expo-font'
import { 
  Text,
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  FlatList 
} from 'react-native';
 import { SvgXml } from 'react-native-svg';
// import { Image as Img } from 'react-native-svg';
 import ProfileImageMock from './Button/ProfileImageMock';

 import BackButton from './Button/BackButton'
  
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
    justifyContent: 'center', 
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#C4C4C4',
    borderTopColor: '#C4C4C4',      
  },
  imageWrap: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTextWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    color: '#676767',
    fontFamily: 'NotoSanaTamilLight',
    fontSize: 24,
  },
  body: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  BathScoreWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  button: {
    backgroundColor: '#FFA21F',
    color: '#FFFFFF',
    width: 200,
    height: 50,
    justifyContent: 'space-around',
    marginTop:30,
  },
  buttonAddFirst: {
    backgroundColor: '#FFA21F',
    height: 40,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  buttonAddOther: {
    backgroundColor: '#E5E5E5',
    height: 40,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'NotoSanaTamilLight'
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/*
const profileImageMock = (
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="60" r="60" fill="#FF4D00"/>
<path d="M93.054 96.5108C89.0971 88.2914 81.9748 81.8345 73.3417 78.5791V73.3813C77.5863 73.1475 85.5899 72.0683 90.2842 67.2662C90.8777 66.6547 91.1115 65.7734 90.8957 64.946C90.6799 64.1187 90.0324 63.4712 89.205 63.2374C89.1331 63.2194 82.946 61.0971 84.1871 48.4352C84.7266 43.0396 84.6367 38.1835 83.9353 34.0108C83.1259 29.2266 81.5072 25.4676 79.1511 22.8417C76.5971 20.018 73.2698 18.5791 69.259 18.5791C69.0971 18.5791 68.9353 18.5791 68.7914 18.5791C67.2626 17.2482 63.9173 15 58.7914 15C56.3993 15 53.8993 15.4856 51.3453 16.4748L51.2374 16.5108C49.223 17.2662 45.482 18.6871 42.3165 22.8957C38.6295 27.7878 36.8669 35.036 37.0827 44.4245C37.2986 53.8309 35.7518 58.4352 34.4209 60.6475C33.3237 62.464 32.2806 62.8237 32.0108 62.8957C31.0935 62.8237 30.3561 63.2914 29.8885 64.0827C29.4029 64.8921 29.5827 65.9173 30.1223 66.7086C30.3381 67.0324 31.5971 68.723 34.6367 70.3597C38.1079 72.2302 42.4424 73.2914 47.5683 73.5072V78.4532C39.0432 81.6906 31.9568 88.2014 27.946 96.5288C27.5863 97.2842 27.6403 98.1655 28.0719 98.8669C28.5216 99.5683 29.295 100 30.1223 100H90.8777C91.705 100 92.4964 99.5683 92.9281 98.8669C93.3597 98.1475 93.4137 97.2662 93.054 96.5108ZM34.259 95.1259C38.1439 89.1547 43.9712 84.6403 50.7158 82.464C51.723 82.1403 52.4065 81.205 52.4065 80.1619V71.1151C52.4065 70.4676 52.1547 69.8381 51.6871 69.3885C51.2194 68.9388 50.6079 68.6691 49.9604 68.687C42.964 68.759 38.7374 67.1583 36.4353 65.7914C36.5971 65.6295 36.777 65.4676 36.9568 65.2878C40.5 61.6007 42.1727 54.5504 41.9389 44.3165C41.4712 25.4137 49.5108 22.3561 52.9281 21.0612L53.036 21.0252C55.0504 20.2698 56.9748 19.8741 58.7554 19.8741C63.3957 19.8741 65.7698 22.4281 65.9676 22.6619C66.4712 23.2914 67.2446 23.5971 68.054 23.5252C68.4496 23.4892 68.8453 23.4712 69.223 23.4712C71.8309 23.4712 73.8993 24.3345 75.518 26.1331C78.9353 29.9101 80.3381 37.8777 79.3309 47.9856C78.3237 58.1834 81.5072 63.2914 84.259 65.7734C80.554 67.8237 75.2842 68.5971 71.3094 68.5971C71.0935 68.5971 70.9676 68.5971 70.9496 68.5971C70.3022 68.5791 69.6547 68.8309 69.1871 69.2806C68.7194 69.7302 68.4496 70.3597 68.4496 71.0252V80.3237C68.4496 81.3849 69.1331 82.3022 70.1403 82.6259C76.9748 84.8381 82.8201 89.2986 86.6871 95.1619H34.259V95.1259Z" fill="white"/>
</svg>
)
*/

// const renderItem = ({item}) => {
//   return(
//     <View>
//       <Text>{item.title}</Text>
//     </View>
//   )
// };

// const ItemList = ({data}) => {
//   return(
//     <SafeAreaView>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   )
// }

const ButtonTemplate = ({title, onPress, style}) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
  
export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      bathScore: false,
      excelledIngridiends: [],
    };
  } 

  async componentDidMount() {
    await Font.loadAsync({
      'NotoSanaTamilLight': require('../assets/fonts/NotoSansTamil-Light.ttf')
    });

    /* Кастомизация хедера */
    this.state.navigation.setOptions({
      headerTitle: 'Профиль',
      headerStyle: {
          backgroundColor: '#fff',
          borderBottomColor: '#929292',
          borderBottomWidth: 0.5
      },
      headerTintColor: '#929292',
      headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          fontFamily: 'NotoSanaTamilLight'
      },
      headerLeft: () => (
          <TouchableOpacity onPress={() => this.state.navigation.navigate('Home')}>
              <BackButton />
          </TouchableOpacity>
      ),
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
              <View style={styles.BathScoreWrap}>
                
                {this.state.bathScore && (
                  <View>
                    <Text>10</Text>
                    <ButtonTemplate 
                      title='Оценить ванную' 
                      style={styles.buttonAddOther}
                      onPress={()=>this.setState({bathScore: 9})} />
                  </View>)
                  }
                {!this.state.bathScore && <ButtonTemplate 
                title='Оценить ванную' 
                style={styles.buttonAddFirst}
                onPress={()=>this.setState({bathScore: 10})} />}
              </View>
              <View style={styles.BathScoreWrap}>
                <ButtonTemplate 
                title='Исключить ингридиент'
                style={styles.buttonAddFirst}
                onPress={()=>this.state.navigation.navigate('AddIngridient')} />
              </View>
            </View>
          </View>
        );
      }
    }