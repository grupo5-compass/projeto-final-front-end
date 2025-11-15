import styles from "./Container.module.css";

function Container({ children }) {
    return (
        <main className={styles.container}>
            <div className={styles.inner}>{children}</div>
        </main>
    );
}

export default Container;
