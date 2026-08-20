import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { Quote } from "./quote.types";
import { getRandomQuote } from "./service/quote.service";

interface QuoteContextType {
    quote: Quote
    getQuote: () => void
    quoteLoading: boolean
    quoteError: string
}

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
    const { session } = useAuth();
    const [quote, setQuote] = useState<Quote | null>(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteError, setQuoteError] = useState("");

    async function getQuote() {
        if (!session) return;
        setQuoteLoading(true);
        try {
            const quote = await getRandomQuote();
            setQuote(quote);
        } catch (err) {
            setQuoteError(err instanceof Error ? err.message : "Failed to load quote");
        } finally {
            setQuoteLoading(false);
        }
    }

    useEffect(() => {
        getQuote();
    }, [session]);

    return (
        <QuoteContext.Provider
            value={{
                quote: quote!,
                getQuote,
                quoteLoading,
                quoteError
            }}
        >
            {children}
        </QuoteContext.Provider>
    );
}

export const useQuote = () => {
    const context = useContext(QuoteContext);
    if (context === undefined) {
        throw new Error("useQuote must be used within a QuoteProvider");
    }
    return context;
};