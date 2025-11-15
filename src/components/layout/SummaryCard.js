import styles from "./SummaryCard.module.css";

function SummaryCard({
    title,
    amount,
    subtitle,
    Icon,
    iconBgColor = "#ecfdf3",
    iconColor = "#0f9f6e",
    bgColor = "#ffffff",
    textColor = "#0f172a",
    subtitleColor = "#6b7280",
}) {
    return (
        <article
            className={styles.card}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <header className={styles.header}>
                <span className={styles.title}>{title}</span>
                <div
                    className={styles.iconWrapper}
                    style={{ backgroundColor: iconBgColor, color: iconColor }}
                >
                    {Icon && <Icon size={20} />}
                </div>
            </header>

            <div className={styles.content}>
                <strong className={styles.amount}>{amount}</strong>
                <small className={styles.subtitle} style={{ color: subtitleColor }}>
                    {subtitle}
                </small>
            </div>
        </article>
    );
}

export default SummaryCard;