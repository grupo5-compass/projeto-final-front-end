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
            <ComCardLogo variant="dark" size={120} showText={true} />
            <h1 className={styles.title}>
            Todos os seus cartões em um único lugar.
            </h1>
            <p className={styles.subtitle}>
            Monitore cartões de crédito e evite surpresas no fim do mês com a tecnologia do Open Finance.
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
