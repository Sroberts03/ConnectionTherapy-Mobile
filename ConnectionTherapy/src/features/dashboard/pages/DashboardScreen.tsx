import { ScrollView, View, Text, Platform } from 'react-native'
import QuoteCard from '../../quote/components/QuoteCard'
import { useQuote } from '../../quote/QuoteContext'
import { useAuth } from '../../auth/AuthContext'
import { useEffect, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import ConnectionPillars from '../components/ConnectionPillars'
import { useSQLiteContext } from 'expo-sqlite';
import { usePillarContext } from '../PillarContext';
import LoadingPillars from '../components/LoadingPillars'
import TopHabitsContainer from '../components/TopHabitsContainer'

export default function DashboardScreen() {
    const db = useSQLiteContext();
    const { getQuote } = useQuote()
    const { session } = useAuth()
    const { pillars, loadingPillars, getPillars } = usePillarContext()

    useEffect(() => {
        if (session) {
            getQuote()
            getPillars()
        }
    }, [session])

    return (
        <ScrollView 
            className="flex-1 bg-primary-50"
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="mb-8">
                <DashboardHeader />
                <QuoteCard />
                {loadingPillars ? 
                    <LoadingPillars loadingPillars={loadingPillars} /> : 
                    <ConnectionPillars pillars={pillars} />
                }
                <TopHabitsContainer/>
            </View>
        </ScrollView>
    )
}