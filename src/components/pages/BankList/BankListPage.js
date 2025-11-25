import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ComCardLogo } from "../../ui/ComCardLogo";
import api from "../../../utils/api";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useVisibilityPrefs from "../../../hooks/useVisibilityPrefs";
import useFlashMessage from "../../../hooks/useFlashMessage";

import styles from "./BankListPage.module.css";

function BankListPage() {
    const [myBanks, setMyBanks] = useState([]);
    const { user, token } = useCurrentUser();
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    const fetchedRef = useRef(false);
    const [modal, setModal] = useState({ open: false, bankId: null, action: null });
    const { getStatus, setStatus } = useVisibilityPrefs(user?.email || user?.nome || "user");

    useEffect(() => {
        if (!token || fetchedRef.current) return;
        fetchedRef.current = true;

        api.get("/institutions/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setMyBanks(response.data);
            })
            .catch((error) => {
                const msg =
                    error?.response?.data?.message ||
                    error?.response?.data?.err ||
                    "Erro ao buscar instituições.";
                setFlashMessage(msg, "error");
            });
    }, [token]);

    const banks = myBanks.map((inst) => ({
        id: inst.id ?? inst._id,
        name: inst.nome ?? inst.name,
        status: getStatus(inst.id ?? inst._id),
    }));

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

    function handleDone() {
        setFlashMessage("Concluído", "success");
        navigate("/user/dashboard");
    }

    function handleBack() {
        navigate("/user/dashboard");
    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Open Finance</h1>
            <div className={styles.card}>
                <header className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <ComCardLogo
                            variant="dark"
                            size={72}
                            showText={false}
                        />
                    </div>
                    <div>
                        <h2>Instituições integradas</h2>
                        <span>Gerencie o compartilhamento de dados por instituição.</span>
                    </div>
                </header>

                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>Bancos</h2>
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
                                <div className={styles.bankRow}>
                                    <span className={styles.bankName}>{bank.name}</span>
                                    <span className={`${styles.statusBadge} ${
                                        bank.status === "active"
                                            ? styles.statusActive
                                            : bank.status === "paused"
                                            ? styles.statusPaused
                                            : styles.statusHidden
                                    }`}>
                                        {bank.status === "active" && "Ativo"}
                                        {bank.status === "paused" && "Pausado"}
                                        {bank.status === "hidden" && "Oculto"}
                                    </span>
                                </div>
                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        className={styles.actionButton}
                                        onClick={() => openModal(bank.id, "iniciar")}
                                    >
                                        Iniciar
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.actionPauseButton}
                                        onClick={() => openModal(bank.id, "pausar")}
                                    >
                                        Pausar
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.actionButtonDanger}
                                        onClick={() => openModal(bank.id, "deletar")}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.footerActions}>
                        <button type="button" className={styles.cta} onClick={handleDone}>
                            Concluído
                        </button>
                        <button type="button" className={styles.secondaryCta} onClick={handleBack}>
                            Voltar para o início
                        </button>
                    </div>
                </div>
            </div>
            {modal.open && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Confirmar ação</h3>
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
