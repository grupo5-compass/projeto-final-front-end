import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PiBankDuotone } from "react-icons/pi";
import { FiPlay, FiPause, FiTrash2, FiLink } from "react-icons/fi";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useVisibilityPrefs from "../../../hooks/useVisibilityPrefs";
import useFlashMessage from "../../../hooks/useFlashMessage";
import useInstitutions from "../../../hooks/useInstitutions";
import useDashboardData from "../../../hooks/useDashboardData";
import { formatBRL } from "../../../utils/format";

import styles from "./BankListPage.module.css";

function BankListPage() {
    const { user, token } = useCurrentUser();
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    const [modal, setModal] = useState({ open: false, bankId: null, action: null });
    const { getStatus, setStatus } = useVisibilityPrefs(user?.email || user?.nome || "user");
    const { institutions, error } = useInstitutions(token);
    const { dash } = useDashboardData(token);
    const errorShownRef = useRef(false);

    useEffect(() => {
        if (!error || errorShownRef.current) return;
        errorShownRef.current = true;
        const msg =
            error?.response?.data?.message ||
            error?.response?.data?.err ||
            "Erro ao buscar instituições.";
        setFlashMessage(msg, "error");
    }, [error]);

    const banks = institutions.map((inst) => {
        // Usa os mesmos valores do Dashboard
        const totalLimit = dash?.creditCardLimit || 0;
        const totalSpent = dash?.billThisMonth || 0;
        const available = dash?.availableLimit || 0;
        const percentUsed = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

        return {
            id: inst.id ?? inst._id,
            name: inst.nome ?? inst.name,
            status: getStatus(inst.id ?? inst._id),
            totalLimit,
            totalSpent,
            available,
            percentUsed,
        };
    });

    function openModal(bankId, action) {
        setModal({ open: true, bankId, action });
    }

    function confirmAction() {
        if (!modal.bankId || !modal.action) return;
        const map = {
            iniciar: "active",
            pausar: "paused",
            deletar: "hidden",
        };
        const next = map[modal.action];
        setStatus(modal.bankId, next);
        setFlashMessage(
            `Compartilhamento ${modal.action} com sucesso`,
            "success"
        );
        setModal({ open: false, bankId: null, action: null });
    }

    function closeModal() {
        setModal({ open: false, bankId: null, action: null });
    }

    function handleBack() {
        navigate("/user/dashboard");
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Instituições  conectadas</h1>
                <p className={styles.subtitle}>Gerencie conexões e visualize limites agregados para cada instituição.</p>


                <div className={styles.content}>
                    {banks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FiLink size={48} />
                            <p>Nenhuma instituição conectada ainda.</p>
                            <button type="button" className={styles.ctaConnect}>
                                Conectar via Open Finance
                            </button>
                        </div>
                    ) : (
                        <ul className={styles.list}>
                            {banks.map((bank) => (
                                <li
                                    key={bank.id}
                                    className={`${styles.item} ${
                                        bank.status === "paused"
                                            ? styles.itemPaused
                                            : bank.status === "hidden"
                                            ? styles.itemHidden
                                            : ""
                                    }`}
                                >
                                    <div className={styles.bankHeader}>
                                        <div className={styles.bankInfo}>
                                            <div className={styles.bankIcon}>
                                                <PiBankDuotone size={24} />
                                            </div>
                                            <div className={styles.bankNameSection}>
                                                <span className={styles.bankName}>{bank.name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.limitSection}>
                                        <div className={styles.limitHeader}>
                                            <span className={styles.limitLabel}>Limite Disponível</span>
                                            <span className={styles.limitAmount}>{formatBRL(bank.available)}</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div 
                                                className={styles.progressFill} 
                                                style={{ width: `${Math.min(bank.percentUsed, 100)}%` }}
                                            />
                                        </div>
                                        <div className={styles.limitFooter}>
                                            <span className={styles.percentUsed}>{bank.percentUsed.toFixed(1)}% utilizado</span>
                                            <span className={styles.totalLimit}>Total: {formatBRL(bank.totalLimit)}</span>
                                        </div>
                                    </div>

                                    <div className={styles.actionsDivider}></div>
                                    
                                    <div className={styles.actions}>
                                        <button
                                            type="button"
                                            className={styles.actionButton}
                                            onClick={() => openModal(bank.id, "iniciar")}
                                        >
                                            <FiPlay size={18} />
                                            Iniciar
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.actionPauseButton}
                                            onClick={() => openModal(bank.id, "pausar")}
                                        >
                                            <FiPause size={18} />
                                            Pausar
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.actionButtonDanger}
                                            onClick={() => openModal(bank.id, "deletar")}
                                        >
                                            <FiTrash2 size={18} />
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.footerActions}>
                        <button type="button" className={styles.cta} onClick={handleBack}>
                            Voltar para o início
                        </button>
                    </div>
                </div>
            </div>
            {modal.open && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Confirmar ação</h2>
                        <p>Deseja {modal.action} o compartilhamento desta instituição?</p>
                        <div className={styles.modalActions}>
                            <button type="button" className={styles.actionButton} onClick={confirmAction}>
                                Confirmar
                            </button>
                            <button type="button" className={styles.secondaryCta} onClick={closeModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default BankListPage;
