import { Session } from "@supabase/supabase-js";
import { Platform } from "react-native";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "NOT_SET";

type HttpRequestType = {
    Method: HTTPMethod;
    Endpoint: string;
    NeedsAuth: boolean;
    Session?: Session;
    Body?: object;
}

export default class HTTPRequest {
    backendOrigin: string;
    HttpReq: HttpRequestType;

    constructor() {
        this.backendOrigin = process.env['EXPO_PUBLIC_BACKEND_ORIGIN'] || '';
        const platformOS = Platform.OS;
        if (!this.backendOrigin) {
            console.log("EXPO_PUBLIC_BACKEND_ORIGIN environment variable is not set");
            throw new Error("An unknown error occured. Please try again later.");
        }
        if (platformOS === 'android') {
            this.backendOrigin = this.backendOrigin.replace('127.0.0.1', '10.0.2.2').replace('localhost', '10.0.2.2');
        }
        this.HttpReq = {
            Method: 'NOT_SET',
            Endpoint: '',
            NeedsAuth: false,
        };
    }

    NeedsAuth(session: Session) {
        this.HttpReq.NeedsAuth = true;
        this.HttpReq.Session = session;
        return this;
    }

    SetEndpoint(endpoint: string) {
        this.HttpReq.Endpoint = endpoint;
        return this;
    }

    Get() {
        this.HttpReq.Method = 'GET';
        return this;
    }

    Post<httpBody extends object>(body?: httpBody) {
        this.HttpReq.Method = 'POST';
        if (body !== undefined) {        
            this.HttpReq.Body = body;
        }
        return this;
    }

    Put<httpBody extends object>(body?: httpBody) {
        this.HttpReq.Method = 'PUT';
        if (body !== undefined) {
            this.HttpReq.Body = body;
        }
        return this;
    }

    Delete() {
        this.HttpReq.Method = 'DELETE';
        return this;
    }

    async Send<T>(): Promise<T> {
        const requestOptions: RequestInit = this.createRequestOptions();
        const response = await fetch(`${this.backendOrigin}/${this.HttpReq.Endpoint}`, requestOptions);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.body.message);
        }

        return response.json();
    }

    private needsAuthAndHasNoSessionCheck() {
        if (this.HttpReq.NeedsAuth && !this.HttpReq.Session) {
            console.log("Authenticated request made without a session");
            throw new Error("An unknown error occured. Please try again later.");
        }
        return;
    }

    private createHeaders(): HeadersInit {
        this.needsAuthAndHasNoSessionCheck();
        return {
            "Content-Type": "application/json",
            ...(this.HttpReq.NeedsAuth ? { "Authorization": `Bearer ${this.HttpReq.Session?.access_token}` } : {}),
        };
    }

    private createRequestOptions(): RequestInit {
        const headers: HeadersInit = this.createHeaders();
        if (this.HttpReq.Method === 'NOT_SET') {
            console.log("HTTP method not set");
            throw new Error("An unknown error occured. Please try again later.");
        }

        return {
            method: this.HttpReq.Method,
            headers: headers,
            ...(this.HttpReq.Body ? { body: JSON.stringify(this.HttpReq.Body) } : {}),
        };
    }
}