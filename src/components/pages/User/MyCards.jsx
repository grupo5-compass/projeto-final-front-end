import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCreditCard } from "react-icons/fi";
import styles from "./MyCards.module.css";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useInstitutions from "../../../hooks/useInstitutions";
import useDashboardData from "../../../hooks/useDashboardData";
import api from "../../../utils/api";
import { formatBRL } from "../../../utils/format";

function MyCards() {
    const { token } = useCurrentUser();
    const { institutions } = useInstitutions(token);
    const { dash } = useDashboardData(token);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        api
            .get("/accounts/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const data = res.data?.data || [];
                setCards(data);
            })
            .catch((err) => {
                console.error("Erro ao carregar cartões:", err);
            })
            .finally(() => setLoading(false));
    }, [token]);

    // Função para buscar o nome da instituição (igual ao BankList)
    const getInstitutionName = () => {
        if (!institutions || institutions.length === 0) {
            return "Instituição Financeira";
        }
        const institution = institutions[0];
        return institution?.nome || institution?.name || institution?.id || institution?._id || "Instituição Financeira";
    };

    // Calcula os valores usando o mesmo padrão do Dashboard
    // Como o Dashboard agrega todos os cartões, dividimos proporcionalmente
    const totalLimit = dash?.creditCardLimit || 0;
    const totalSpent = dash?.billThisMonth || 0;
    const totalAvailable = dash?.availableLimit || 0;

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Cartões conectados</h1>

            <p className={styles.description}>
                Aqui estão os cartões de crédito que você conectou via Open Finance.
            </p>

            {loading && (
                <p className={styles.helperText}>Carregando cartões...</p>
            )}

            <div className={styles.cardsGrid}>
                {cards.map((acc) => {
                    // Calcula a proporção do limite deste cartão em relação ao total
                    const cardLimit = acc.creditCardLimit || 0;
                    const proportion = totalLimit > 0 ? cardLimit / totalLimit : 0;
                    
                    // Distribui os gastos proporcionalmente ao limite de cada cartão
                    const spent = totalSpent * proportion;
                    const available = Math.max(cardLimit - spent, 0);
                    const usedPercent = cardLimit > 0 ? (spent / cardLimit) * 100 : 0;

                    return (
                        <article key={acc._id} className={styles.cardWrapper}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIconWrapper}>
                                    <FiCreditCard size={28} />
                                </div>
                                <div className={styles.cardHeaderInfo}>
                                    <h2 className={styles.bankName}>
                                        {getInstitutionName()}
                                    </h2>
                                    <p className={styles.cardDetails}>
                                        Ag. {acc.branch} • CC {acc.number}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.usageSection}>
                                    <div className={styles.usageHeader}>
                                        <span className={styles.usageLabel}>
                                            LIMITE UTILIZADO
                                        </span>
                                        <span className={styles.usagePercent}>
                                            {usedPercent.toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${Math.min(usedPercent, 100)}%`,
                                            }}
                                        />
                                    </div>

                                    <div className={styles.usageValues}>
                                        <span className={styles.usageSpent}>
                                            {formatBRL(spent)}
                                        </span>
                                        <span className={styles.usageTotal}>
                                            {formatBRL(cardLimit)}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.availableSection}>
                                    <span className={styles.availableLabel}>
                                        LIMITE DISPONÍVEL
                                    </span>
                                    <span className={styles.availableAmount}>
                                        {formatBRL(available)}
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}

                {!loading && cards.length === 0 && (
                    <div className={styles.emptyState}>
                        <FiCreditCard size={48} />
                        <p>Nenhum cartão conectado ainda.</p>
                        <Link to="/banklist" className={styles.ctaSecondary}>
                            Conectar Instituição
                        </Link>
                    </div>
                )}
            </div>

            <div className={styles.footerActions}>
                <Link to="/user/dashboard" className={styles.backButton}>
                    Voltar para o início
                </Link>
            </div>
        </section>
    );
}

export default MyCards;