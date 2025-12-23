import { Stack } from 'expo-router';

export default function FeedLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="feedback" options={{ title: 'Give Feedback', headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Post Details', headerShown: false }} />
        </Stack>
    );
}
