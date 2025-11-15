import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./BankListPage.module.css";

const banks = [
    { id: 1, name: "Banco do Brasil" },
    { id: 2, name: "Caixa Econômica Federal" },
    { id: 3, name: "Itaú" },
    { id: 4, name: "Bradesco" },
    { id: 5, name: "Nubank" },
];

function BankListPage() {
    const [selectedBanks, setSelectedBanks] = useState([]);
    const navigate = useNavigate();

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

        console.log("Bancos selecionados:", selectedBanks);
        navigate("/connected");
    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Open Finance</h1>
            <div className={styles.card}>
                <header className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <img
                            src="logo2.png"
                            alt="Logo ComCredit"
                            className={styles.logo}
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
                                        checked={selectedBanks.includes(bank.id)}
                                        onChange={() => handleSelectBank(bank.id)}
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
