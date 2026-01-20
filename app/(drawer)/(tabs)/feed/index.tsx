import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function FeedScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Feed (Index Tab)</Text>

            <View style={styles.section}>
                <Button title="View Post #1" onPress={() => router.push('/(drawer)/(tabs)/feed/123?sort=popular&filter=videos&page=2')} />
                <Button title="View Post #2" onPress={() => router.push('/(drawer)/(tabs)/feed/456?sort=oldest&filter=images&page=3')} />
            </View>

            <View style={styles.section}>
                <Button title='Feedback' onPress={() => router.push('/(drawer)/(tabs)/feed/feedback')} />
                <Button
                    title="➕ Create Post (Modal)"
                    onPress={() => router.push('/create-post')}
                    color="#34C759"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    section: {
        gap: 10,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 40,
    },
});
