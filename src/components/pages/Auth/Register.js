import { useState } from "react";
import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({});

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // enviar usuario para o banco
        console.log(user);
    };

    return (
        <section className={styles.form_container}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleOnChange}
                />
                <Input
                    type="text"
                    text="CPF"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    handleOnChange={handleOnChange}
                />
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
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                />
                <Input
                    type="password"
                    text="Confirmar Senha"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
        </section>
    );
}
export default Register;
