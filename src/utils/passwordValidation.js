/**
 * Valida se a senha atende aos critérios de segurança
 * @param {string} password - A senha a ser validada
 * @returns {Object} - Objeto com informações sobre a validação
 */
export const validatePassword = (password) => {
    const errors = [];
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    if (!checks.length) {
        errors.push("Deve ter pelo menos 8 caracteres");
    }
    
    if (!checks.uppercase) {
        errors.push("Deve conter pelo menos uma letra maiúscula");
    }
    
    if (!checks.lowercase) {
        errors.push("Deve conter pelo menos uma letra minúscula");
    }
    
    if (!checks.number) {
        errors.push("Deve conter pelo menos um número");
    }
    
    if (!checks.special) {
        errors.push("Deve conter pelo menos um caractere especial: @$!%*?&");
    }

    return {
        isValid: errors.length === 0,
        errors,
        checks,
        strength: calculatePasswordStrength(checks)
    };
};

/**
 * Calcula a força da senha baseada nos critérios atendidos
 * @param {Object} checks - Objeto com os checks de validação
 * @returns {string} - Nível de força da senha
 */
const calculatePasswordStrength = (checks) => {
    const passedChecks = Object.values(checks).filter(Boolean).length;
    
    if (passedChecks <= 2) return "fraca";
    if (passedChecks <= 3) return "média";
    if (passedChecks <= 4) return "boa";
    return "forte";
};

/**
 * Verifica se duas senhas são iguais
 * @param {string} password - Senha principal
 * @param {string} confirmPassword - Confirmação da senha
 * @returns {boolean} - Se as senhas coincidem
 */
export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};