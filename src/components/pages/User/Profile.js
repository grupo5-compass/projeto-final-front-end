import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    FiShield, 
    FiTrash2, 
    FiUser, 
    FiMail, 
    FiCreditCard, 
    FiCalendar,
    FiLock,
    FiSmartphone
} from "react-icons/fi";
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

    // Formatar CPF
    const formatCPF = (cpf) => {
        if (!cpf) return "";
        const cleaned = cpf.replace(/\D/g, "");
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    // Obter ano de criação
    const getMemberYear = () => {
        if (!user.createdAt) return new Date().getFullYear();
        return new Date(user.createdAt).getFullYear();
    };

    return (
        <section className={styles.profileContainer}>
            <h1 className={styles.title}>Minha conta</h1>
            <p className={styles.subtitle}>Gerencie suas informações e preferências</p>
            
            <div className={styles.profileGrid}>
                {/* Card de Perfil do Usuário */}
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatarWrapper}>
                            <FiUser size={48} />
                        </div>
                    </div>
                    <div className={styles.profileBody}>
                        <h2 className={styles.userName}>{user.nome || "Usuário"}</h2>
                        <p className={styles.memberSince}>Membro desde {getMemberYear()}</p>
                        
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <FiMail size={18} />
                                </div>
                                <div className={styles.infoContent}>
                                    <span className={styles.infoLabel}>EMAIL</span>
                                    <span className={styles.infoValue}>{user.email}</span>
                                </div>
                            </div>
                            
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <FiCreditCard size={18} />
                                </div>
                                <div className={styles.infoContent}>
                                    <span className={styles.infoLabel}>CPF</span>
                                    <span className={styles.infoValue}>{formatCPF(user.cpf)}</span>
                                </div>
                            </div>
                            
                            <div className={styles.infoItem}>
                                <div className={styles.infoIcon}>
                                    <FiCalendar size={18} />
                                </div>
                                <div className={styles.infoContent}>
                                    <span className={styles.infoLabel}>CRIAÇÃO DA CONTA</span>
                                    <span className={styles.infoValue}>
                                        {user.createdAt 
                                            ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                                            : "Data não disponível"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna de Configurações */}
                <div className={styles.settingsColumn}>
                    {/* Card Privacidade & Segurança */}
                    <div className={styles.settingsCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.settingsIconYellow}>
                                <FiShield size={20} />
                            </div>
                            <div className={styles.settingsInfo}>
                                <h3 className={styles.settingsTitle}>Segurança</h3>
                                <p className={styles.settingsText}>
                                    Ajuste suas preferências de senha. Recomenda-se a utilização da autenticação 2FA.
                                </p>
                            </div>
                        </div>
                        <div className={styles.buttonRow}>
                            <button 
                                type="button" 
                                className={styles.outlineBtn} 
                                onClick={() => openModal("password")}
                            >
                                <FiLock size={16} />
                                Alterar senha
                            </button>
                            <button 
                                type="button" 
                                className={styles.primaryBtn}
                                onClick={() => openModal("2fa")}
                            >
                                <FiSmartphone size={16} />
                                Autenticação 2FA
                            </button>
                        </div>
                    </div>

                    {/* Card Zona de Risco */}
                    <div className={styles.dangerCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.dangerIcon}>
                                <FiTrash2 size={20} />
                            </div>
                            <div className={styles.settingsInfo}>
                                <h3 className={styles.dangerTitle}>Zona de Risco</h3>
                                <p className={styles.dangerText}>
                                    Excluir sua conta é uma ação irreversível. Todos os seus dados serão removidos permanentemente.
                                </p>
                            </div>
                        </div>
                        <button 
                            type="button" 
                            className={styles.dangerBtn} 
                            onClick={() => openModal("delete")}
                        >
                            Excluir conta
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.backButtonContainer}>
                <Link to="/user/dashboard" className={styles.backButton}>Voltar para o início</Link>
            </div>

            {modal.open && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        {modal.type === "delete" && (
                            <>
                                <h2>Você já vai? 😢</h2>
                                <p>Sentiremos sua falta. Em vez de excluir, você pode pausar integrações. Esperamos seu retorno em breve.</p>
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.dangerBtn} onClick={confirmModal}>Excluir</button>
                                    <button type="button" className={styles.outlineBtn} onClick={closeModal}>Cancelar</button>
                                </div>
                            </>
                        )}
                        {modal.type === "password" && (
                            <>
                                <h2>Alterar senha</h2>
                                <p>Enviaremos instruções para seu e-mail cadastrado.</p>
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.primaryBtn} onClick={confirmModal}>Confirmar</button>
                                    <button type="button" className={styles.outlineBtn} onClick={closeModal}>Cancelar</button>
                                </div>
                            </>
                        )}
                        {modal.type === "2fa" && (
                            <>
                                <h2>Autenticação 2FA</h2>
                                <p>A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta. Você receberá um código no seu celular a cada login.</p>
                                <div className={styles.modalActions}>
                                    <button type="button" className={styles.primaryBtn} onClick={closeModal}>Ativar 2FA</button>
                                    <button type="button" className={styles.outlineBtn} onClick={closeModal}>Cancelar</button>
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
