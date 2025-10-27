import { useContext, useState } from "react";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";

/* Contexts */
import { Context } from "../../../context/UserContext";

function Login() {
    const [user, setUser] = useState({});
    const { login } = useContext(Context);

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // compara usuario com o banco
        console.log(user);
        login(user);
    };

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleOnChange}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>
        </section>
    );
}
export default Login;
