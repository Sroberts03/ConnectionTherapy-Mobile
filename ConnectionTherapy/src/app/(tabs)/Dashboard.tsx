import { useAuth } from "@src/features/auth/AuthContext"
import ConnectionPillars from "@src/features/dashboard/components/ConnectionPillars"
import DashboardHeader from "@src/features/dashboard/components/DashboardHeader"
import LoadingPillars from "@src/features/dashboard/components/LoadingPillars"
import TopHabitsContainer from "@src/features/dashboard/components/TopHabitsContainer"
import { usePillarContext } from "@src/features/dashboard/PillarContext"
import QuoteCard from "@src/features/quote/components/QuoteCard"
import { useQuote } from "@src/features/quote/QuoteContext"
import { useEffect } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import GoToDailyCheck from "@src/features/daily-check/components/GoToDailyCheck"

export default function DashBoard() {
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