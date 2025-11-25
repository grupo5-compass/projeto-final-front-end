import { useEffect, useState } from "react";
import {
    FiTrendingUp,
    FiCreditCard,
    FiCalendar,
    FiArrowUpRight,
} from "react-icons/fi";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useDashboardData from "../../../hooks/useDashboardData";
import { formatBRL, formatGrowth, formatWhen } from "../../../utils/format";
import SummaryCard from "../../ui/SummaryCard";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const { user, token } = useCurrentUser();
    const { dash, tx } = useDashboardData(token, { limit: 4, page: 1 });

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
                {[
                    {
                        id: "spent",
                        title: "Gastos do Mês",
                        amount: formatBRL(dash?.billThisMonth || 0),
                        subtitle: formatGrowth(dash?.growth),
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
                        amount: formatBRL(dash?.availableLimit || 0),
                        subtitle: `de ${formatBRL(dash?.creditCardLimit || 0)}`,
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
                        amount: formatBRL(dash?.billThisMonth || 0),
                        subtitle: "Estimado com base nas transações",
                        Icon: FiCalendar,
                        iconBgColor: "rgba(255,255,255,0.25)",
                        iconColor: "#ffffff",
                        bgColor: "#f19a2a",
                        textColor: "#ffffff",
                        subtitleColor: "rgba(255,255,255,0.9)",
                    },
                ].map((card) => (
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
                    {tx.map((t) => (
                        <li key={t._id}>
                            <div className={styles.txnIcon}>
                                <FiCreditCard />
                            </div>
                            <div className={styles.txnBody}>
                                <strong>{t.description}</strong>
                                <span>
                                    {t.category} • {formatWhen(t.date)}
                                </span>
                            </div>
                            <span className={styles.txnAmount}>
                                {formatBRL(t.amount)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Dashboard;

