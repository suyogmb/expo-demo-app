import { StyleSheet, Text, View } from 'react-native';

const PaymentScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Payment</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default PaymentScreen;
