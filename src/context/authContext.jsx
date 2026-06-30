import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Trigger Google Pop-up Login Authentication Flow
    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Standard Email and Password Registration
    const registerWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Clear Session Workspace
    const logout = () => {
        return signOut(auth);
    };

    // Subcribes to internal state session mutations across windows
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, loginWithGoogle, loginWithEmail, registerWithEmail, logout}}>
            {!authLoading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside an AuthProvider");
    return context;
}