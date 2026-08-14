import { Session } from "@supabase/supabase-js";
import { Platform } from "react-native";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export default async function HTTPRequest(
    method: HTTPMethod,
    endpoint: string,
    needsAuth: boolean,
    session?: Session,
    body?: Object,
) {
    let currentOrigin = process.env.EXPO_PUBLIC_BACKEND_ORIGIN;
    if (currentOrigin && Platform.OS === 'android') {
        currentOrigin = currentOrigin.replace('127.0.0.1', '10.0.2.2').replace('localhost', '10.0.2.2');
    }

    if (!currentOrigin) {
        throw new Error("EXPO_PUBLIC_BACKEND_ORIGIN environment variable is not set");
    }
    if (needsAuth && !session) {
        throw new Error("No session provided for authenticated request");
    }
    const response = await fetch(`${currentOrigin}/${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...(needsAuth ? { "Authorization": "Bearer " + session?.access_token } : {})
        },
        body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.body.message);
    }
    const res = await response.json();
    return res;
}