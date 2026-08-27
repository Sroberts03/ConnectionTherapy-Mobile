import { Session } from "@supabase/supabase-js";
import { Platform } from "react-native";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

function resolveBackendOrigin(platformOS: typeof Platform.OS = Platform.OS): string {
    const origin = process.env[ 'EXPO_PUBLIC_BACKEND_ORIGIN' ];
    if (!origin) {
        throw new Error("EXPO_PUBLIC_BACKEND_ORIGIN environment variable is not set");
    }
    if (platformOS !== 'android') {
        return origin;
    }
    return origin.replace('127.0.0.1', '10.0.2.2').replace('localhost', '10.0.2.2');
}

function needsAuthAndHasNoSession(needsAuth: boolean, session?: Session): boolean {
    return needsAuth && !session;
}

function buildRequestHeaders(needsAuth: boolean, session?: Session): HeadersInit {
    if (needsAuthAndHasNoSession(needsAuth, session)) {
        throw new Error("No session provided for authenticated request");
    }
    return {
        "Content-Type": "application/json",
        ...(needsAuth ? { "Authorization": `Bearer ${session?.access_token}` } : {}),
    };
}

async function parseErrorMessage(response: Response): Promise<string> {
    const errorData = await response.json();
    return errorData.body.message;
}

function createRequest(method: HTTPMethod, headers: HeadersInit, body?: Object): {
    method: HTTPMethod;
    headers: HeadersInit;
    body?: string;
} {
    if (body) {
        return {
            method,
            headers,
            body: JSON.stringify(body),
        };
    }
    return {
        method,
        headers,
    };
}

export default async function HTTPRequest(
    method: HTTPMethod,
    endpoint: string,
    needsAuth: boolean,
    session?: Session,
    body?: Object,
) {
    const origin = resolveBackendOrigin();
    const headers = buildRequestHeaders(needsAuth, session);
    const request = createRequest(method, headers, body);
    
    const response = await fetch(`${origin}/${endpoint}`, request);

    if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
    }

    return response.json();
}