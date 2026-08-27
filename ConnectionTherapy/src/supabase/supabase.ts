import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

let supabaseUrl = process.env[ 'EXPO_PUBLIC_SUPABASE_URL' ];
if (Platform.OS === 'android') {
    supabaseUrl = supabaseUrl.replace('127.0.0.1', '10.0.2.2').replace('localhost', '10.0.2.2');
}
const supabaseAnonKey = process.env[ 'EXPO_PUBLIC_SUPABASE_KEY' ]!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});