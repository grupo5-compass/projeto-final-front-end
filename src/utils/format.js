export const formatBRL = (n) =>
    (typeof n === "number" ? n : Number(n || 0)).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

export const formatGrowth = (g) => {
    if (g === null || g === undefined) return "sem histórico vs mês anterior";
    const v = typeof g === "number" ? g : Number(g || 0);
    const sign = v > 0 ? "+" : "";
    return `${sign}${v.toFixed(1)}% vs mês anterior`;
};

export const formatWhen = (iso) => {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

export const getTransactionPeriod = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    
    // Normaliza as datas para comparação (sem horário)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const txDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    
    const diffDays = Math.floor((today - txDate) / (24 * 60 * 60 * 1000));
    
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    
    // Para datas anteriores, mostra a data completa
    const day = d.getDate();
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day} de ${month} de ${year}`;
};

export const groupTransactionsByPeriod = (transactions) => {
    // Primeiro ordena todas as transações por data (mais recente primeiro)
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    const groups = {};
    
    sortedTransactions.forEach((tx) => {
        const period = getTransactionPeriod(tx.date);
        if (!groups[period]) {
            groups[period] = {
                label: period,
                transactions: [],
                total: 0,
                count: 0,
                date: new Date(tx.date) // Guarda a data para ordenação
            };
        }
        groups[period].transactions.push(tx);
        groups[period].total += Math.abs(tx.amount);
        groups[period].count += 1;
    });
    
    // Ordena os grupos por data (mais recente primeiro)
    return Object.values(groups).sort((a, b) => {
        // "Hoje" sempre primeiro
        if (a.label === "Hoje") return -1;
        if (b.label === "Hoje") return 1;
        
        // "Ontem" em segundo
        if (a.label === "Ontem") return -1;
        if (b.label === "Ontem") return 1;
        
        // Para outras datas, ordena por data (mais recente primeiro)
        return b.date - a.date;
    });
};
