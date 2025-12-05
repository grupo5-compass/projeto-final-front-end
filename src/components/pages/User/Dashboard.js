import {
    FiTrendingUp,
    FiArrowUpRight,
    FiDollarSign,
    FiPieChart,
    FiArrowDownCircle,
    FiArrowUpCircle,
    FiCalendar,
    FiCreditCard,
    FiClock,
} from "react-icons/fi";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useDashboardData from "../../../hooks/useDashboardData";
import useInstitutions from "../../../hooks/useInstitutions";
import { formatBRL, formatWhen, groupTransactionsByPeriod } from "../../../utils/format";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const { user, token } = useCurrentUser();
    const { dash, tx } = useDashboardData(token, { limit: 10, page: 1 });
    const { institutions } = useInstitutions(token);

    const getInstitutionName = () => {
        if (!institutions || institutions.length === 0) {
            return "Banco";
        }
        const institution = institutions[0];
        return institution?.nome || institution?.name || "Banco";
    };

    const groupedTransactions = groupTransactionsByPeriod(tx);

    return (
        <section className={styles.wrapper}>
            <div className={styles.dashboard}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Olá, {user.nome || "Usuário"}!</h1>
                <p className={styles.subtitle}>
                    Aqui está um resumo de suas finanças e transações recentes.
                </p>
            </div>

            {/* Card destacado de Seus Cartões */}
            <div className={styles.cardsHighlight}>

                <div className={styles.limitsGrid}>
                    <div className={styles.limitItem}>
                        <div className={styles.limitHeader}>
                            <div className={`${styles.limitIcon} ${styles.iconAvailable}`}>
                                <FiDollarSign size={20} />
                            </div>
                            <span className={styles.limitLabel}>Limite total disponível</span>
                        </div>
                        <span className={`${styles.limitAmount} ${styles.amountAvailable}`}>{formatBRL(dash?.availableLimit || 0)}</span>
                    </div>

                    <div className={styles.limitItem}>
                        <div className={styles.limitHeader}>
                            <div className={`${styles.limitIcon} ${styles.iconTotal}`}>
                                <FiPieChart size={20} />
                            </div>
                            <span className={styles.limitLabel}>Limite total dos cartões</span>
                        </div>
                        <span className={`${styles.limitAmount} ${styles.amountTotal}`}>{formatBRL(dash?.creditCardLimit || 0)}</span>
                    </div>

                    <div className={styles.limitItem}>
                        <div className={styles.limitHeader}>
                            <div className={`${styles.limitIcon} ${styles.iconSpent}`}>
                                <FiTrendingUp size={20} />
                            </div>
                            <span className={styles.limitLabel}>Gastos do mês</span>
                        </div>
                        <span className={`${styles.limitAmount} ${styles.amountSpent}`}>{formatBRL(dash?.billThisMonth || 0)}</span>
                    </div>
                </div>
            </div>

            <div className={styles.transactions}>
                <header className={styles.transactionsHeader}>
                    <div>
                        <h2>Transações recentes</h2>
                        <p>Últimas movimentações nas suas contas</p>
                    </div>
                    <button type="button" className={styles.linkButton}>
                        Ver todas
                        <FiArrowUpRight />
                    </button>
                </header>

                <div className={styles.txnGroups}>
                    {groupedTransactions.map((group) => (
                        <div key={group.label} className={styles.txnGroup}>
                            <div className={styles.txnGroupHeader}>
                                <div className={styles.txnGroupIcon}>
                                    <FiCalendar size={18} />
                                </div>
                                <div className={styles.txnGroupInfo}>
                                    <span className={styles.txnGroupTitle}>{group.label}</span>
                                    <span className={styles.txnGroupSummary}>
                                        {group.count} {group.count === 1 ? 'transação' : 'transações'} • Valor movimentado: {formatBRL(group.total)}
                                    </span>
                                </div>
                            </div>
                            <ul>
                                {group.transactions.map((t) => {
                                    const isDebit = t.type === 'debit' || t.type === 'DEBIT';
                                    return (
                        <li key={t._id}>
                                            <div className={`${styles.txnIcon} ${isDebit ? styles.txnIconDebit : styles.txnIconCredit}`}>
                                                {isDebit ? <FiArrowDownCircle /> : <FiArrowUpCircle />}
                            </div>
                            <div className={styles.txnBody}>
                                <strong>{t.description}</strong>
                                                <div className={styles.txnMeta}>
                                                    <span className={styles.txnTime}>
                                                        <FiClock size={12} />
                                                        {formatWhen(t.date)}
                                                    </span>
                                                    <span className={styles.txnBankBadge}>
                                                        <FiCreditCard size={12} />
                                                        {getInstitutionName()}
                                                    </span>
                                                    {t.totalInstallments > 1 && (
                                                        <span className={styles.txnInstallment}>
                                                            <FiCreditCard size={12} />
                                                            Parcelado {t.currentInstallment}/{t.totalInstallments}
                                </span>
                                                    )}
                                                </div>
                            </div>
                                            <span className={`${styles.txnAmount} ${isDebit ? styles.txnAmountDebit : styles.txnAmountCredit}`}>
                                                {formatBRL(Math.abs(t.amount))}
                            </span>
                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
}

export default Dashboard;

