import { auth } from '../shared/service/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
    const [isAuthed, setIsAuthed] = useState();
    const [authUser, setAuthUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setAuthUser(user);
                setIsAuthed(true);
            } else {
                setAuthUser(null);
                setIsAuthed(false);
            }
        });
        return unsubscribe;
    }, []);

    return {
        isAuthed,
        authUser,
    };
};