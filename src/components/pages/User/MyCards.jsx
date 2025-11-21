import styles from "./MyCards.module.css";
import { Link } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";

function MyCards() {
    const { user, token, loading, error } = useCurrentUser();

    return (
        <div>
            <h1>Meus Cartões</h1>
            <Link to="/banklist" type="button" className={styles.cta}>
                Minhas Instituições
            </Link>
        </div>
    );
}

export default MyCards;