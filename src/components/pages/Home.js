import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ComCardLogo } from "../ui/ComCardLogo";
import styles from "./Home.module.css";

function Home() {
    
    useEffect(() => {
        document.body.classList.add("home-page");

        return () => {
            document.body.classList.remove("home-page");
        };
    }, []);

    return (
        <section className={styles.landing}>
            <ComCardLogo variant="primary" size={120} showText={true} />
            <h1 className={styles.title}>
                Gestão Inteligente de Cartões de Crédito
            </h1>
            <p className={styles.subtitle}>
                Controle seus gastos, acompanhe seus limites e gerencie suas finanças de forma simples e eficiente.
            </p>
            <div className={styles.ctaButtons}>
                <Link to="/register" className={styles.primaryButton}>
                    Começar Agora
                </Link>
                <Link to="/login" className={styles.secondaryButton}>
                    Já tenho conta
                </Link>
            </div>
        </section>
    );
}

export default Home;
