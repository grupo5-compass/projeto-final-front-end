import { useEffect, useState, useRef } from "react";
import api from "../utils/api";

export default function useDashboardData(token, { limit = 4, page = 1 } = {}) {
    const [dash, setDash] = useState(null);
    const [tx, setTx] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchedRef = useRef(false);

    const fetchData = () => {
        if (!token) return Promise.resolve();
        setLoading(true);
        setError(null);

        const p1 = api.get("/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const p2 = api.get("/transactions/me", {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit, page },
        });

        return Promise.all([p1, p2])
            .then(([dRes, tRes]) => {
                setDash(dRes.data);
                const items = tRes.data?.data?.items || [];
                setTx(items);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!token || fetchedRef.current) return;
        fetchedRef.current = true;
        fetchData();
    }, [token, limit, page]);

    return { dash, tx, loading, error, refetch: fetchData };
}
