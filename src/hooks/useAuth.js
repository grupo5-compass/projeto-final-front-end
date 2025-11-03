// Faz chamadas na API para tratar da autenticação
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }
    }, []);

    // Função responsável pela chamada do cadastro
    async function register(user) {
        let msgTxt = "Usuário criado com sucesso!";
        let msgType = "success";

        try {
            const data = await api.post("/api/user", user).then((response) => {
                return response.data;
            });

            // Teste de resposta da api
            console.log(data);
        } catch (error) {
            // tratar erro
            console.log(error);
            msgTxt = error.response.data.message;
            msgType = "error";
        }

        setFlashMessage(msgTxt, msgType);
    }

    // Função responsável pela chamada do login
    async function login(user) {
        let msgTxt = "Login realizado com sucesso!";
        let msgType = "success";

        try {
            const data = await api.post("/api/auth", user).then((response) => {
                return response.data;
            });

            await authUser(data);

            // Teste de resposta da api
            console.log(data);
        } catch (error) {
            // tratar erro
            console.log(error);
            msgTxt = error.response.data.message;
            msgType = "error";
        }

        setFlashMessage(msgTxt, msgType);
    }

    // Função responsável pela autenticação
    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem("token", data.token);
        navigate("/");
    }

    // Função responsável pela logout
    function logout() {
        let msgTxt = "Logout realizado com sucesso!";
        let msgType = "success";

        setAuthenticated(false);
        localStorage.removeItem("token");

        api.defaults.headers.Authorization = undefined;

        navigate("/api/login");

        setFlashMessage(msgTxt, msgType);
        console.log("authenticated:", setAuthenticated(false));
        console.log("token:", api.defaults.headers.Authorization);
    }

    return { authenticated, register, login, logout };
}
