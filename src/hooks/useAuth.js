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
        let msgTxt = "Bem-vindo(a)! Sua conta foi criada com sucesso.";
        let msgType = "success";

        try {
            // Cadastrar usuário
            await api.post("/user", user);

            // Fazer login automaticamente após cadastro
            const loginData = await api.post("/auth", {
                email: user.email,
                senha: user.senha
            }).then((response) => response.data);

            // Autenticar e redirecionar para o dashboard
            await authUser(loginData);
            
            setFlashMessage(msgTxt, msgType);
            return; // Sair da função após sucesso
        } catch (error) {
            // tratar erro
            console.log(error);
            msgTxt = error.response?.data?.message || error.response?.data?.err || "Erro ao cadastrar";
            msgType = "error";
            setFlashMessage(msgTxt, msgType);
        }
    }

    // Função responsável pela chamada do login
    async function login(user) {
        let msgTxt = "Login realizado com sucesso!";
        let msgType = "success";

        try {
            const data = await api.post("/auth", user).then((response) => {
                return response.data;
            });

            await authUser(data);

            // Teste de resposta da api
            console.log(data);
        } catch (error) {
            // tratar erro
            console.log(error);
            msgTxt = error.response?.data?.message || error.response?.data?.err || "Erro ao fazer login";
            msgType = "error";
        }

        setFlashMessage(msgTxt, msgType);
    }

    // Função responsável pela autenticação
    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem("token", data.token);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        navigate("/user/dashboard");
    }

    // Função responsável pela logout
    function logout() {
        let msgTxt = "Logout realizado com sucesso!";
        let msgType = "success";

        setAuthenticated(false);
        localStorage.removeItem("token");

        api.defaults.headers.Authorization = undefined;

        navigate("/");

        setFlashMessage(msgTxt, msgType);
        console.log("authenticated:", setAuthenticated(false));
        console.log("token:", api.defaults.headers.Authorization);
    }

    return { authenticated, register, login, logout };
}
