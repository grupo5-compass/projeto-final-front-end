import { useState, useEffect } from "react";
import bus from "../../utils/bus";
import styles from "./Message.module.css";

function Message() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const listener = ({ message, type }) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        };

        bus.addListener("flash", listener);
        return () => {
            if (bus.removeListener) bus.removeListener("flash", listener);
        };
    }, []);

    return (
        <div className={styles.toastContainer}>
            {toasts.map((t) => (
                <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
                    <p>{t.message}</p>
                </div>
            ))}
        </div>
    );
}

export default Message;
