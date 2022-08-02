import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth as firebaseAuth } from '../firebase';

interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  isLoading: boolean;
  auth: Auth;
}

export const AuthContext = createContext<Auth>({
  loggedIn: false,
});

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] =
    useState<AuthInit>({
      isLoading: true,
      auth: { loggedIn: false },
    });

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(
      (firebaseUser) => {
        const auth = firebaseUser
          ? {
              loggedIn: true,
              userId: firebaseUser.uid,
            }
          : { loggedIn: false };

        setAuthInit({ isLoading: false, auth });
      }
    );
  }, []);

  return authInit;
}
