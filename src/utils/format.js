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
    const now = new Date();
    const dn = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diff = dn - dd;
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    if (diff === 0) return `Hoje, ${hh}:${mm}`;
    if (diff === 24 * 60 * 60 * 1000) return `Ontem, ${hh}:${mm}`;
    return `${d.toLocaleDateString("pt-BR")}, ${hh}:${mm}`;
};
