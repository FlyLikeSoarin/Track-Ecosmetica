import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Button, 
    ImageBackground, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    SectionList 
} from 'react-native';
import product1img from '../static/lRWynXU__sg.jpg';

const styles = StyleSheet.create({
    header: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    product: {
        backgroundColor: '#c7f9cc',
        padding: 20,
    },
    container: {
        flex: 1,
    },
    item:{
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#9ae7af',
    },
});

const DATA = [{
    data: ['product1', 'product1', 'product3']
}];


const ListI = () => {
    return(
        <SafeAreaView>
        <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item+index}
        renderItem={(item)=><div>{item}</div>}
        renderSectionHeader={'1'}
        />
        </SafeAreaView>
    )
}
const Product = ({title, image}) => {
    return (
        <View style={styles.product}>
          <img width={70} heigth={70} src={image}/>
          <Text>{title}</Text>
        </View>
    )
}

export default class Profile extends React.Component {
 
    render() {
      return (
        <View style={styles.container}>
            <Product title='product1' image={product1img}/>
            <Product title='product2' image={product1img}/>
            <Product title='product3' image={product1img}/>
            <Product title='product4' image={product1img}/>
        </View>
      );
    }
  }