import { Text, TouchableOpacity, View } from "react-native";
import { useQuote } from "../QuoteContext";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import QuoteLoading from "./QuoteLoading";
import { Ionicons } from "@expo/vector-icons";

export default function QuoteCard() {
    const { quote, quoteLoading, quoteError, getQuote } = useQuote();

    return (
        <View 
            className="bg-white p-8 border border-gray-100 rounded-3xl items-center justify-center min-h-[160px]"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2
            }}
        >
            {quoteLoading ? (
                <QuoteLoading loading={quoteLoading} />
            ) : quote ? (
                <>
                    <TouchableOpacity className="absolute top-2 right-2" onPress={getQuote}>
                        <Ionicons name="refresh" size={20} color="#999" />
                    </TouchableOpacity>
                    <Text className="text-xl font-medium text-neutral-800 text-center leading-relaxed italic mb-6">"{quote.text}"</Text>
                    <View className="h-px w-12 bg-neutral-300 mb-4" />
                    <Text className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center" >{quote.author}</Text>
                </>
            ) : (
                <ErrorLoading loading={false} error={quoteError} />
            )}
        </View>
    )
}