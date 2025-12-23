import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CreatePostModal() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Post</Text>
            <Text style={styles.content}>This is a global modal that covers everything.</Text>
            <Button title="Dismiss" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
    },
});
