import {
    FiTrendingUp,
    FiCreditCard,
    FiCalendar,
    FiArrowUpRight,
} from "react-icons/fi";

import useCurrentUser from "../../../hooks/useCurrentUser";
import SummaryCard from "../../ui/SummaryCard";
import styles from "./Dashboard.module.css";

const summaryCards = [
    {
        id: "spent",
        title: "Gastos do Mês",
        amount: "R$ 3.847,32",
        subtitle: "+15% vs mês anterior",
        Icon: FiTrendingUp,
        iconBgColor: "#e9f4ff",
        iconColor: "#0f5ddb",
        bgColor: "#ffffff",
        textColor: "#0f172a",
        subtitleColor: "#5f6b7f",
    },
    {
        id: "limit",
        title: "Limite Disponível",
        amount: "R$ 12.152,68",
        subtitle: "de R$ 16.000,00",
        Icon: FiCreditCard,
        iconBgColor: "rgba(255,255,255,0.25)",
        iconColor: "#ffffff",
        bgColor: "#1f9a60",
        textColor: "#ffffff",
        subtitleColor: "rgba(255,255,255,0.85)",
    },
    {
        id: "invoice",
        title: "Próxima Fatura",
        amount: "R$ 4.231,89",
        subtitle: "Vence em 15 dias",
        Icon: FiCalendar,
        iconBgColor: "rgba(255,255,255,0.25)",
        iconColor: "#ffffff",
        bgColor: "#f19a2a",
        textColor: "#ffffff",
        subtitleColor: "rgba(255,255,255,0.9)",
    },
];

const transactions = [
    {
        id: 1,
        merchant: "Supermercado Zaffari",
        category: "Alimentação",
        when: "Hoje, 14:32",
        amount: "R$ 234,50",
    },
    {
        id: 2,
        merchant: "Netflix",
        category: "Entretenimento",
        when: "Hoje, 10:15",
        amount: "R$ 39,90",
    },
    {
        id: 3,
        merchant: "Posto Shell",
        category: "Transporte",
        when: "Ontem, 18:45",
        amount: "R$ 180,00",
    },
    {
        id: 4,
        merchant: "Lancheria do Parque",
        category: "Alimentação",
        when: "Ontem, 13:20",
        amount: "R$ 127,80",
    },
];

function Dashboard() {
    const { user, token, loading, error } = useCurrentUser();

    return (
        <section className={styles.dashboard}>
            <div className={styles.hero}>
                <p className={styles.greeting}>
                    Olá, {user.nome || "Usuário"}!{" "}

                </p>
                <p className={styles.subtitle}>
                    Aqui está o resumo da sua gestão financeira
                </p>
            </div>

            <div className={styles.cardsGrid}>
                {summaryCards.map((card) => (
                    <SummaryCard key={card.id} {...card} />
                ))}
            </div>

            <div className={styles.transactions}>
                <header className={styles.transactionsHeader}>
                    <div>
                        <h2>Transações Recentes</h2>
                        <p>Últimas movimentações nas suas contas</p>
                    </div>
                    <button type="button" className={styles.linkButton}>
                        Ver todas
                        <FiArrowUpRight />
                    </button>
                </header>

                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <div className={styles.txnIcon}>
                                <FiCreditCard />
                            </div>
                            <div className={styles.txnBody}>
                                <strong>{transaction.merchant}</strong>
                                <span>
                                    {transaction.category} • {transaction.when}
                                </span>
                            </div>
                            <span className={styles.txnAmount}>
                                {transaction.amount}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Dashboard;

