import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { PiUserCircleCheckDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
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
        <section>
            <h1 className={styles.title}>Perfil</h1>
            <div className={styles.userCard}>
                <div className={styles.userHeader}>
                    <div className={styles.iconWrapper}>
                        <PiUserCircleCheckDuotone size={50} color="#ffffff" />
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.welcomeText}>Seja bem-vindo,</p>
                        <p className={styles.userName} name="nome">
                            {user.nome}!
                        </p>
                    </div>
                </div>
                <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Nome:</span>
                        <span className={styles.infoValue} name="nome">
                            {user.nome}
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue} name="email">
                            {user.email}
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>CPF:</span>
                        <span className={styles.infoValue} name="cpf">
                            {user.cpf}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.backButtonContainer}>
                <Link to="/user/dashboard">Voltar para o inicio</Link>
            </div>
        </section>
    );
}
export default Profile;
