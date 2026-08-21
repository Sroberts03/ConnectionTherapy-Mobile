import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Session, AuthChangeEvent, User } from '@supabase/supabase-js';
import { OAuthProvider } from './auth.types';
import { supabase } from '../../supabase/supabase';
import { loginWithEmail as authServiceLogin, signUpWithEmail as authServiceSignUp, oauthLogin as authServiceOAuthLogin, signOut as authServiceSignOut } from './services/auth.service';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loadingAuth: boolean;
  error: string | null;
  clearError: () => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  oauthLogin: (provider: OAuthProvider) => Promise<void>;
  finishSignUp: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        if (currentSession?.user) {
          setUser(await currentSession.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load session');
      } finally {
        setLoadingAuth(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [supabase]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshAuthState = useCallback(async (nextSession: Session | null = null) => {
    const currentSession = nextSession ?? (await supabase.auth.getSession()).data.session;
    setSession(currentSession);

    if (currentSession?.user) {
      setUser(currentSession.user);
      return;
    }

    setUser(null);
  }, [supabase]);

  const validateEmailAndPassword = (email: string, password: string): boolean => {
    if (!email || !password) {
      setError('Please provide email and password');
      return false;
    }
    return true;
  };

  const handleError = (err: any, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
  };

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    setError(null);
    if (!validateEmailAndPassword(email, password)) {
      return;
    }
    try {
      await authServiceLogin(email, password);
      await refreshAuthState();
    } catch (err) {
      handleError(err, 'Login failed');
    }
  }, [refreshAuthState]);

  const signupWithEmail = useCallback(async (email: string, password: string, fullName: string) => {
    setError(null);
    if (!validateEmailAndPassword(email, password)) {
      return;
    }
    if (!fullName) {
      setError('Please provide a full name');
      return;
    }
    try {
      await authServiceSignUp(email, password, fullName);
      await refreshAuthState();
    } catch (err) {
      handleError(err, 'Sign up failed');
    }
  }, [refreshAuthState]);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      await authServiceSignOut();
      await refreshAuthState();
    } catch (err) {
      handleError(err, 'Sign out failed');
    }
  }, [refreshAuthState]);

  const oauthLogin = useCallback(async (provider: OAuthProvider) => {
    setError(null);
    try {
      await authServiceOAuthLogin(provider);
    } catch (err) {
      handleError(err, 'OAuth login failed');
    }
  }, []);

  const finishSignUp = useCallback(async () => {
    setError(null);
    try {
      setLoadingAuth(true);
      await refreshAuthState();
    } catch (err) {
      handleError(err, 'Sign up failed');
    } finally {
      setLoadingAuth(false);
    }
  }, [refreshAuthState]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loadingAuth,
        error,
        clearError,
        loginWithEmail,
        signupWithEmail,
        signOut,
        oauthLogin,
        finishSignUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
