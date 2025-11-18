import { useContext, useState } from "react";
import Input from "../../form/Input";
import PasswordInput from "../../form/PasswordInput";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";
import { passwordsMatch } from "../../../utils/passwordValidation";

/* Contexts */
import { Context } from "../../../context/UserContext";

function Register() {
    const [user, setUser] = useState({});
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const { register } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        
        // Verificar se as senhas coincidem quando confirmPassword for alterado
        if (name === "confirmPassword" || name === "senha") {
            const senha = name === "senha" ? value : user.senha;
            const confirmPassword = name === "confirmPassword" ? value : user.confirmPassword;
            
            if (confirmPassword && !passwordsMatch(senha, confirmPassword)) {
                setPasswordError("As senhas não coincidem");
            } else {
                setPasswordError("");
            }
        }
    };

    const handlePasswordValidation = (isValid) => {
        setPasswordValid(isValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar se a senha é válida
        if (!passwordValid) {
            alert("Por favor, certifique-se de que a senha atende a todos os critérios de segurança.");
            return;
        }
        
        // Verificar se as senhas coincidem
        if (!passwordsMatch(user.senha, user.confirmPassword)) {
            alert("As senhas não coincidem.");
            return;
        }
        
        // enviar usuario para o banco
        console.log(user);
        await register(user);
        
        // Limpar campos e resetar formulário após cadastro
        e.target.reset();
        setUser({});
        setPasswordValid(false);
        setPasswordError("");
    };

    return (
        <section className={styles.auth_page}>
            <h1 className={styles.page_title}>Cadastro</h1>
            <div className={styles.form_card}>
                <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    text="Nome"
                    name="nome"
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
                <PasswordInput
                    text="Senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                    value={user.senha || ""}
                    showValidation={true}
                    onValidationChange={handlePasswordValidation}
                />
                <PasswordInput
                    text="Confirmar Senha"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleOnChange}
                    value={user.confirmPassword || ""}
                    showValidation={false}
                />
                {passwordError && (
                    <div className={styles.error_message}>
                        ❌ {passwordError}
                    </div>
                )}
                <input type="submit" value="Cadastrar" />
            </form>
                <p>
                Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
            </div>
        </section>
    );
}
export default Register;
