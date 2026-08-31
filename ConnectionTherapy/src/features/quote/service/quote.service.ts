import { Quote } from "../quote.types";
import { GetRandomeQuoteRes } from "../quote.dto";
import HTTPRequest from "@utils/HTTPRequest";

export async function getRandomQuote() : Promise<Quote> {
    const httpRequest = new HTTPRequest();
    let res: GetRandomeQuoteRes = await httpRequest.SetEndpoint("quote/").Get().Send();
    return res.quote;
}