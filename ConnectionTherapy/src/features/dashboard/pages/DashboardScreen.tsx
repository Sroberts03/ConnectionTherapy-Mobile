import { ScrollView, View, Text } from 'react-native'
import QuoteCard from '../../quote/components/QuoteCard'
import { useQuote } from '../../quote/QuoteContext'
import { useAuth } from '../../auth/AuthContext'
import { useEffect } from 'react'
import DashboardHeader from '../components/DashboardHeader'

export default function DashboardScreen() {
    const { getQuote } = useQuote()
    const { user, session } = useAuth()

    useEffect(() => {        
        if (session) {
            getQuote()
        }
    }, [session])

    return (
        <ScrollView 
            className="flex-1 bg-transparent"
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <DashboardHeader />
            <QuoteCard />
        </ScrollView>
    )
}