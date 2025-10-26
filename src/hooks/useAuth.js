// Faz chamadas na API para tratar da autenticação
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage();

    // Função responsável pela chamada do cadastro
    async function register(user) {
        let msgTxt = "Usuário criado com sucesso!";
        let msgType = "success";

        try {
            const data = await api.post("/user", user).then((response) => {
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

    return { register };
}
