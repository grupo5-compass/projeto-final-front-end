import api from "../../utils/api"
import { useState, useEffect } from "react";

function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/checkUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados do usuário:", error);
                    // Se houver erro de autenticação, redirecionar para login
                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }
                });
        } else {
            // Se não há token, redirecionar para login
            window.location.href = "/login";
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>usuário logado no sistema, {user.nome || "Usuário"}!</p>
        </div>
    );
}
export default Home;
