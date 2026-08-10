import { Text, View } from "react-native";
import { useQuote } from "../QuoteContext";
import ErrorLoading from "../../../globalComponents/ErrorLoading";

export default function QuoteCard() {
    const { quote, quoteLoading, quoteError } = useQuote();

    return (
        <View className="text-center items-center justify-center bg-secondary-100 p-3 mt-3 mx-3 rounded-xl">
            {quote ? (
                <>
                    <Text className="text-lg font-semibold mb-3 text-center">"{quote.text}"</Text>
                    <Text className="text-md font-medium text-center" >- {quote.author}</Text>
                </>
            ) : (
                <ErrorLoading loading={quoteLoading} error={quoteError} />
            )}
        </View>
    )
}