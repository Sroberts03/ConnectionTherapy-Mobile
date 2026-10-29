import { supabase } from "../../../supabase/supabase";
import { OAuthProvider } from "../auth.types";

export async function loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: fullName,
            },
        },
    });
    if (error) throw error;
    return data;
}

export async function oauthLogin(provider: OAuthProvider) {
    // Surfaces through AuthContext's error state instead of failing silently
    throw new Error(`Signing in with ${provider} isn't available yet.`);
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function forgotPassword(email: string) {
    console.log("forgot password", email);
}