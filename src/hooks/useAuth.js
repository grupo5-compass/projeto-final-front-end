// Faz chamadas na API para tratar da autenticação
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
    // Função responsável pela chamada do cadastro
    async function register(user) {
        try {
            const data = await api
                .post("/user", user)
                .then((response) => {
                    return response.data;
                });

            // Teste de resposta da api
            console.log(data);
        } catch (error) {
            // tratar erro
            console.log(error);
        }
    }

    return { register };
}
