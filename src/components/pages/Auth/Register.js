import { useState } from "react";
import Input from "../../form/Input";

function Register() {
    const [value, setValue] = useState("");

    const handleOnChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <h1>Cadastro</h1>
            <form>
                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleOnChange}
                    value={value}
                />
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleOnChange}
                    value={value}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}
                    value={value}
                />
                <Input
                    type="password"
                    text="Confirmar Senha"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleOnChange}
                    value={value}
                />
                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}
export default Register;
