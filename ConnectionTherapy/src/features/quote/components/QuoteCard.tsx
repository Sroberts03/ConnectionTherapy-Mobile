import { Text, View } from "react-native";
import { useQuote } from "../QuoteContext";
import ErrorLoading from "../../../globalComponents/ErrorLoading";

export default function QuoteCard() {
    const { quote, quoteLoading, quoteError } = useQuote();

    return (
        <View 
            className="bg-white p-8 border border-gray-100 rounded-3xl items-center justify-center"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2
            }}
        >
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