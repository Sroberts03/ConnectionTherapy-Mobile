import "../../global.css";
import { AuthProvider, useAuth } from "../features/auth/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QuoteProvider } from "../features/quote/QuoteContext";
import { SQLiteProvider } from "expo-sqlite";
import { PillarProvider } from "../features/dashboard/PillarContext";
import { HabitProvider } from "../features/habits/HabitContext";
import { JournalProvider } from "../features/journal/journal.context";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import { db } from "../db/index";


function IntialLayout() {
    const { session, loadingAuth, user } = useAuth();

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
            <Stack.Screen name="(journal)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    const { success, error } = useMigrations(db, migrations);

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Migration error: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563eb" />
                <Text className="mt-4">Updating Database...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SQLiteProvider databaseName="connectionTherapy.db">
                <AuthProvider>
                    <QuoteProvider>
                        <PillarProvider>
                            <HabitProvider>
                                <JournalProvider>
                                    <IntialLayout />
                                </JournalProvider>
                            </HabitProvider>
                        </PillarProvider>
                    </QuoteProvider>
                </AuthProvider>
            </SQLiteProvider>
        </GestureHandlerRootView>
    );
}