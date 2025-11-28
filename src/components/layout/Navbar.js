import { useContext } from "react";
import { Link } from "react-router-dom";
import { ComCardLogo } from "../ui/ComCardLogo";
import { FiBarChart2, FiUser, FiCreditCard, FiLink, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";

import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";

function Navbar() {
    const { authenticated, logout } = useContext(Context);

    const redirect = () => {
        if (authenticated) {
            return "/user/dashboard";
        } else {
            return "/";
        }
    };

    return (
        <nav className={styles.navbar}>
            <Link to={redirect()}>
                <div className={styles.navbar_logo}>
                    <ComCardLogo variant="primary" size={56} showText={true} />
                </div>
            </Link>
            {authenticated ? (
                <>
                    <ul className={styles.navbar_left}>
                        <li>
                            <Link to="/user/dashboard">
                                <FiBarChart2 size={18} />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/mycards">
                                <FiCreditCard size={18} />
                                Cartões
                            </Link>
                        </li>
                        <li>
                            <Link to="/banklist">
                                <FiLink size={18} />
                                Instituições
                            </Link>
                        </li>
                    </ul>
                    <ul className={styles.navbar_right}>
                        <li>
                            <Link to="/user/profile">
                                <FiUser size={18} />
                                Minha conta
                            </Link>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                className={styles.logout} 
                                onClick={logout}
                            >
                                <FiLogOut size={18} />
                                Sair
                            </button>
                        </li>
                    </ul>
                </>
            ) : (
                <ul className={styles.navbar_right}>
                    <li>
                        <Link to="/login">
                            <FiLogIn size={18} />
                            Entrar
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <FiUserPlus size={18} />
                            Criar conta
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}
export default Navbar;
