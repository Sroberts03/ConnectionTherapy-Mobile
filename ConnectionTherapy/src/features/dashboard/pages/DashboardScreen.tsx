import { ScrollView, View, Text } from 'react-native'
import QuoteCard from '../../quote/components/QuoteCard'
import { useQuote } from '../../quote/QuoteContext'
import { useAuth } from '../../auth/AuthContext'
import { useEffect } from 'react'
import { getFirstName } from '../../../utils/getFirstName'

export default function DashboardScreen() {
    const { getQuote } = useQuote()
    const { user, session } = useAuth()

    useEffect(() => {        
        if (session) {
            getQuote()
        }
    }, [session])

    return (
        <ScrollView className="flex-1 bg-primary-50">
            <QuoteCard />
            <View className="m-4">
                <Text className="text-2xl font-semibold">
                    Welcome back, {getFirstName(user?.user_metadata.display_name)}!
                </Text>
            </View>
        </ScrollView>
    )
}