import { ScrollView, View, Text, Platform } from 'react-native'
import QuoteCard from '../../quote/components/QuoteCard'
import { useQuote } from '../../quote/QuoteContext'
import { useAuth } from '../../auth/AuthContext'
import { useEffect, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import ConnectionPillars from '../components/ConnectionPillars'
import { ConnectionPillar } from '../dashboard.types'
import { getDashboardPillars, getFullPillars } from '../services/dashboard.service'
import { HabitCategory } from '../../habits/habits.types'
import { useSQLiteContext } from 'expo-sqlite';

export default function DashboardScreen() {
    const db = useSQLiteContext();
    const { getQuote } = useQuote()
    const { user, session } = useAuth()
    const [ fullPillars, setFullPillars ] = useState<Map<HabitCategory, ConnectionPillar>>(new Map())

    const getPillars = async () => {
        if (!session) {
            return
        }
        try {
            const pillars: Pick<
                ConnectionPillar,
                | 'id'
                | 'name'
                | 'color'
                | 'icon'
            >[] = await getDashboardPillars(session)
            if (pillars.length > 0) {
                setFullPillars(await getFullPillars(pillars, db))
            }
        } catch (error) {
            console.error('Error fetching pillars:', error)
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (session) {
                getQuote()
                await getPillars()
            }
        }       
        fetchData()
    }, [session])

    return (
        <ScrollView 
            className="flex-1 bg-primary-50"
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <DashboardHeader />
            <QuoteCard />
            <ConnectionPillars pillars={fullPillars} />
        </ScrollView>
    )
}