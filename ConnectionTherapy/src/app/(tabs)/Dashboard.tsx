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
        <SafeAreaView edges={["top"]} className="flex-1 bg-primary-50">
            <ScrollView 
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="ios:mb-32">
                    <DashboardHeader />
                    <QuoteCard />
                    {loadingPillars ? 
                        <LoadingPillars loadingPillars={loadingPillars} /> : 
                        <ConnectionPillars pillars={pillars} />
                    }
                    <TopHabitsContainer/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}