import { useEffect, useRef, useState } from "react";
import api from "../utils/api";

export default function useInstitutions(token) {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    const fetchInstitutions = () => {
        if (!token) return Promise.resolve();
        setLoading(true);
        setError(null);
        return api
            .get("/institutions/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setInstitutions(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!token || fetchedRef.current) return;
        fetchedRef.current = true;
        fetchInstitutions();
    }, [token]);

    return { institutions, loading, error, refetch: fetchInstitutions };
}
