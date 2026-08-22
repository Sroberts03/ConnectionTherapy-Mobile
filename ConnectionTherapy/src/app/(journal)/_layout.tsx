import { Stack } from "expo-router";

export default function JournalLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CreateNew" />
            <Stack.Screen name="view/[id]" />
            <Stack.Screen name="edit/[id]" />
        </Stack>
    );
}