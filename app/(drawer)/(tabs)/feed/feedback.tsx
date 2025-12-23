import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function FeedbackScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Feedback Form</Text>
            <Text>Tell us what you think about the feed!</Text>
            <Button title="Go to Payment" onPress={() => router.replace('/(drawer)/(tabs)/payment')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
