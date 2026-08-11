import { Text, View } from "react-native";
import { useQuote } from "../QuoteContext";
import ErrorLoading from "../../../globalComponents/ErrorLoading";

export default function QuoteCard() {
    const { quote, quoteLoading, quoteError } = useQuote();

    return (
        <View className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 items-center justify-center">
            {quote ? (
                <>
                    <Text className="text-xl font-medium text-neutral-800 text-center leading-relaxed italic mb-6">"{quote.text}"</Text>
                    <View className="h-px w-12 bg-neutral-300 mb-4" />
                    <Text className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center" >{quote.author}</Text>
                </>
            ) : (
                <ErrorLoading loading={quoteLoading} error={quoteError} />
            )}
        </View>
    )
}