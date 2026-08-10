import "../../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../features/auth/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function IntialLayout() {
    const { session, error, loadingAuth, user } = useAuth();

    useEffect(() => {
        if (loadingAuth) return;
        if (!session) {
            console.log("No session");
            router.replace('/(auth)/Login');
        } else {
            console.log("Session");
            router.replace('/(tabs)/Dashboard');
        }
    }, [session, loadingAuth, user]);

    if (loadingAuth) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-background">
                <AuthProvider>
                    <IntialLayout />
                </AuthProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}