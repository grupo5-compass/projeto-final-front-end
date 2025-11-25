import { useCallback, useEffect, useState } from "react";

export default function useVisibilityPrefs(userKey) {
    const storageKey = `visibility_prefs:${userKey || "default"}`;
    const [prefs, setPrefs] = useState({});

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            setPrefs(raw ? JSON.parse(raw) : {});
        } catch (e) {
            setPrefs({});
        }
    }, [storageKey]);

    const setStatus = useCallback((institutionId, status) => {
        setPrefs((prev) => {
            const next = { ...prev, [institutionId]: status };
            localStorage.setItem(storageKey, JSON.stringify(next));
            return next;
        });
    }, [storageKey]);

    const getStatus = useCallback((institutionId) => {
        return prefs[institutionId] || "active";
    }, [prefs]);

    const clearStatus = useCallback((institutionId) => {
        setPrefs((prev) => {
            const next = { ...prev };
            delete next[institutionId];
            localStorage.setItem(storageKey, JSON.stringify(next));
            return next;
        });
    }, [storageKey]);

    return { prefs, setStatus, getStatus, clearStatus };
}
