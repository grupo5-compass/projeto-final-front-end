import { useContext, useState } from "react";
import { PiUserCircleCheckDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { FiLink, FiShield, FiAlertTriangle } from "react-icons/fi";
import styles from "./Profile.module.css";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Context } from "../../../context/UserContext";

function Profile() {
    const { user } = useCurrentUser();
    const { logout } = useContext(Context);
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    const [modal, setModal] = useState({ open: false, type: null });

    function openModal(type) {
        setModal({ open: true, type });
    }

    function closeModal() {
        setModal({ open: false, type: null });
    }

    function confirmModal() {
        if (modal.type === "delete") {
            Object.keys(localStorage).forEach((k) => {
                if (k.startsWith("visibility_prefs:")) localStorage.removeItem(k);
            });
            setFlashMessage("Conta removida da visualização local", "success");
            logout();
            navigate("/");
        } else if (modal.type === "password") {
            setFlashMessage("Enviaremos instruções de alteração de senha por e-mail", "success");
            closeModal();
        }
    }

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
            <h2 className={styles.sectionTitle}>Configurações</h2>
            <div className={styles.cardsGrid}>
                <article className={styles.card}>
                    <header className={styles.cardHeader}>
                        <div className={styles.cardIcon}>
                            <FiLink size={22} />
                        </div>
                        <span className={styles.cardTitle}>Integrações</span>
                    </header>
                    <p className={styles.cardText}>Gerencie as instituições conectadas ao aplicativo.</p>
                    <div className={styles.cardActions}>
                        <Link to="/banklist" className={styles.primaryBtn}>Gerenciar integrações</Link>
                    </div>
                </article>

                <article className={styles.card}>
                    <header className={styles.cardHeader}>
                        <div className={styles.cardIcon}>
                            <FiShield size={22} />
                        </div>
                        <span className={styles.cardTitle}>Privacidade & Segurança</span>
                    </header>
                    <p className={styles.cardText}>Ajuste preferências de segurança e sua conta.</p>
                    <div className={styles.cardActions}>
                        <button type="button" className={styles.primaryBtn} onClick={() => openModal("password")}>Alterar senha</button>
                        <button type="button" className={styles.secondaryBtn} onClick={logout}>Encerrar sessão</button>
                    </div>
                </article>

                <article className={styles.cardDanger}>
                    <header className={styles.cardHeader}>
                        <div className={styles.cardIconDanger}>
                            <FiAlertTriangle size={22} />
                        </div>
                        <span className={styles.cardTitle}>Zona de Risco</span>
                    </header>
                    <p className={styles.cardText}>Excluir sua conta não é recomendado. Que tal pausar integrações?</p>
                    <div className={styles.cardActions}>
                        <button type="button" className={styles.dangerBtn} onClick={() => openModal("delete")}>Excluir conta</button>
                    </div>
                </article>
            </div>
            <div className={styles.backButtonContainer}>
                <Link to="/user/dashboard">Voltar para o inicio</Link>
            </div>
            {modal.open && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        {modal.type === "delete" && (
                            <>
                                <h3>Você já vai? 😢</h3>
                                <p>Sentiremos sua falta. Em vez de excluir, você pode pausar integrações. Esperamos seu retorno em breve.</p>
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.dangerBtn} onClick={confirmModal}>Excluir</button>
                                    <button type="button" className={styles.secondaryBtn} onClick={closeModal}>Cancelar</button>
                                </div>
                            </>
                        )}
                        {modal.type === "password" && (
                            <>
                                <h3>Alterar senha</h3>
                                <p>Enviaremos instruções para seu e-mail cadastrado.</p>
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.primaryBtn} onClick={confirmModal}>Confirmar</button>
                                    <button type="button" className={styles.secondaryBtn} onClick={closeModal}>Cancelar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
export default Profile;
