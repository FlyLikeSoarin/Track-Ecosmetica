import * as React from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
    },
});

export default class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            data: {
                name: this.props.route.params.name,
                brand_name: props.route.params.brand_name,
                img_url: props.route.params.img_url,
                description: props.route.params.description,
                ingredients: props.route.params.ingredients,
                eco_score: props.route.params.eco_score,
                safety_score: props.route.params.safety_score,
                zoo_score: props.route.params.zoo_score,
                total_score: props.route.params.total_score,
            }
        }
    }

    render() {
        //const {data} = this.state.data;
        return(
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>ProductInfo</Text>
                <Text>{this.state.data.name}</Text>
                <Text>{this.state.data.brand_name}</Text>
                <Text>{this.state.data.img_url}</Text>
                <Text>{this.state.data.description}</Text>
                <Text>{this.state.data.ingredients}</Text>
                <Text>{this.state.data.eco_score}</Text>
                <Text>{this.state.data.safety_score}</Text>
                <Text>{this.state.data.zoo_score}</Text>
                <Text>{this.state.data.natotal_score}</Text>
              </View>
            </View>
        );
    }
}