import { useContext } from "react";
import { Link } from "react-router-dom";
import { ComCardLogo } from '../ui/ComCardLogo';

import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";

function Navbar() {
    const { authenticated, logout } = useContext(Context);


    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <ComCardLogo variant="dark" size={56} showText={true} />
            </div>
            <ul>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/user/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Perfil</Link>
                        </li>
                        <li>
                            <Link to="/user/mycards">Meus Cartões</Link>
                        </li>
                        <li className={styles.logout} onClick={logout}>
                            Sair
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
export default Navbar;
