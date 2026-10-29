import { Stack } from "expo-router";

export default function DailyCheckLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DailyCheck" />
        </Stack>
    );
}