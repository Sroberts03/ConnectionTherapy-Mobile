import { TouchableOpacity, View, Text } from "react-native";

interface BackToTodayButtonProps {
    isVisible: boolean
    setDate: (date: Date) => void
    today: Date
}

export default function BackToTodayButton({ isVisible, setDate, today }: BackToTodayButtonProps) {
    const setToToday = () => {
        setDate(today);
    }

    if (!isVisible) return null;

    return (
        <View className="flex-row items-center justify-center w-11/12 self-center mt-2">
            <TouchableOpacity onPress={setToToday} className="flex-row items-center justify-center bg-neutral-100 rounded-[2rem] px-6 py-4 w-full shadow-sm border border-neutral-100">
                <Text className="text-xl font-bold text-neutral-600 ml-4">Back To Today</Text>
            </TouchableOpacity>
        </View>
    )
}