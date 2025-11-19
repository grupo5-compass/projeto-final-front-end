import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ComCardLogo } from "../../ui/ComCardLogo";
import api from "../../../utils/api";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useFlashMessage from "../../../hooks/useFlashMessage";

import styles from "./BankListPage.module.css";

function BankListPage() {
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [myBanks, setMyBanks] = useState([]);
    const { token } = useCurrentUser();
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    const fetchedRef = useRef(false);

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
    }));

    function handleSelectBank(bankId) {
        if (selectedBanks.includes(bankId)) {
            setSelectedBanks(selectedBanks.filter((id) => id !== bankId));
        } else {
            setSelectedBanks([...selectedBanks, bankId]);
        }
    }

    function handleConnect() {
        if (selectedBanks.length === 0) {
            alert("Por favor, selecione ao menos um banco antes de continuar!");
            return;
        }

        // futura função post para pausar compartilhamento de instituições
        console.log("Bancos selecionados:", selectedBanks);
        navigate("/");
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
                        <h2>Selecione as instituições que deseja conectar</h2>
                        <span>
                            Você pode alterar essa seleção a qualquer momento.
                        </span>
                    </div>
                </header>

                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>Bancos disponíveis</h2>
                    <ul className={styles.list}>
                        {banks.map((bank) => (
                            <li
                                key={bank.id}
                                className={`${styles.item} ${
                                    selectedBanks.includes(bank.id)
                                        ? styles.itemSelected
                                        : ""
                                }`}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedBanks.includes(
                                            bank.id
                                        )}
                                        onChange={() =>
                                            handleSelectBank(bank.id)
                                        }
                                    />
                                    <span>{bank.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className={styles.cta}
                        onClick={handleConnect}
                    >
                        Conectar instituições selecionadas
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BankListPage;
