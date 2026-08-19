import { useAuth } from "../../auth/AuthContext"
import { getFirstName } from "../../../utils/getFirstName"
import { View, Text } from "react-native"

export default function DashBoardHeader() {
    const { user } = useAuth()

    const timeOfDay = () => {
        const hour = new Date().getHours()
        if (hour < 12) {
            return 'morning'
        } else if (hour < 18) {
            return 'afternoon'
        } else {
            return 'evening'
        }
    }
    
    return (
        <View className="mb-8 mt-2">
            <Text className="text-3xl font-bold text-neutral-900 tracking-tight text-center">
                Good {timeOfDay()}, {getFirstName(user?.user_metadata.display_name)}!
            </Text>
            <Text className="text-neutral-600 text-base mt-3 leading-relaxed text-center">
                Your resilience is a quiet, powerful force. Take this moment to ground yourself.
            </Text>
        </View>
    )
}