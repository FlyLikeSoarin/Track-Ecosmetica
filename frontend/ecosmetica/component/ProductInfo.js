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
            productID: this.props.route.params.productID,
        }
    }

    render() {
        const {productID} = this.state;
        return(
            <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>ProductInfo</Text>
                <Text>{productID}</Text>
              </View>
            </View>
        );
    }
}