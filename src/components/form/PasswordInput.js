import { useState } from "react";
import styles from "./Input.module.css";
import { validatePassword } from "../../utils/passwordValidation";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

function PasswordInput({
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    showValidation = false,
    onValidationChange,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState({ errors: [], strength: "" });
    const [hasTouched, setHasTouched] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        
        if (!hasTouched) {
            setHasTouched(true);
        }

        if (showValidation) {
            const validationResult = validatePassword(password);
            setValidation(validationResult);

            if (onValidationChange) {
                onValidationChange(validationResult.isValid);
            }
        }

        handleOnChange(e);
    };

    const handleFocus = () => {
        if (!hasTouched && showValidation && value) {
            setHasTouched(true);
            const validationResult = validatePassword(value);
            setValidation(validationResult);
            if (onValidationChange) {
                onValidationChange(validationResult.isValid);
            }
        }
    };

    const shouldShowValidation = showValidation && hasTouched;

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <div className={styles.password_input_container}>
                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handlePasswordChange}
                    onFocus={handleFocus}
                    value={value}
                    className={styles.password_input}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.password_toggle}
                    aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                >
                    {showPassword ? (
                        <MdOutlineVisibility />
                    ) : (
                        <MdOutlineVisibilityOff />
                    )}
                </button>
            </div>

            {shouldShowValidation && validation.errors.length > 0 && (
                <div className={styles.password_validation}>
                    <p className={styles.validation_title}>
                        Sua senha deve conter:
                    </p>
                    <ul className={styles.validation_list}>
                        {validation.errors.map((error, index) => (
                            <li key={index} className={styles.validation_error}>
                                ❌ {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {shouldShowValidation && validation.errors.length === 0 && value && (
                <div className={styles.password_validation}>
                    <p className={styles.validation_success}>
                        ✅ Senha {validation.strength}!
                    </p>
                </div>
            )}
        </div>
    );
}

export default PasswordInput;
