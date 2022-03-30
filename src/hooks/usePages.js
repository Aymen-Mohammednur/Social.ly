import { db } from '../shared/service/firebase';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const usePages = userId => {
    const [pages, setPages] = useState();
    // const linkRef = collection(db, "linkPages")
    // const q = query(linkRef, where("userId", "==", userId));
    // query(collection(db, "linkPages"), where("userId", "==", userId));

    useEffect(() => {
        const unsubscribe = userId
            ? onSnapshot(query(collection(db, "linkPages"), where("userId", "==", userId)), (snap) => {
                const _pages = [];
                snap.forEach(s => {
                    _pages.push({
                        ...s.data(),
                        id: s.id,
                    });
                });
                setPages(_pages);
            })
            : undefined;
        return unsubscribe;
    }, [userId]);

    return pages;
};