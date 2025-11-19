import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function useCurrentUser() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        
        if (!token) {
            setLoading(false);
            navigate("/", { replace: true });
            return;
        }

        // Garante header Authorization padrão
        api.defaults.headers.Authorization = `Bearer ${token}`;

        api
            .get("/checkUser")
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do usuário:", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                }
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    return { user, loading, error, token };
}