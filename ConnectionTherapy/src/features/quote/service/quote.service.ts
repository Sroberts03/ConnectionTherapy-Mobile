import HTTPRequest from "../../../utils/baseHTTPRequest";
import { Quote } from "../quote.types";
import { GetRandomeQuoteRes } from "../quote.dto";

export async function getRandomQuote() : Promise<Quote> {
    const res: GetRandomeQuoteRes = await HTTPRequest('GET', 'quote/', false, undefined, undefined);
    return res.quote;
}