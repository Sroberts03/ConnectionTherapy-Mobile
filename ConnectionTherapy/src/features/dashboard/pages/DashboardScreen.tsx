import { ScrollView, View } from 'react-native'
import QuoteCard from '../../quote/components/QuoteCard'
import { useQuote } from '../../quote/QuoteContext'
import { useAuth } from '../../auth/AuthContext'
import { useEffect } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import ConnectionPillars from '../components/ConnectionPillars'
import { usePillarContext } from '../PillarContext';
import LoadingPillars from '../components/LoadingPillars'
import TopHabitsContainer from '../components/TopHabitsContainer'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DashboardScreen() {
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
            className="flex-1 bg-primary-50 px-4 py-4"
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <View className="ios:mb-16">
                    <DashboardHeader />
                    <QuoteCard />
                    {loadingPillars ? 
                        <LoadingPillars loadingPillars={loadingPillars} /> : 
                        <ConnectionPillars pillars={pillars} />
                    }
                    <TopHabitsContainer/>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}