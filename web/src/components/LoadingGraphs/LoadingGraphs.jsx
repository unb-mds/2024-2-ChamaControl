import styles from "./LoadingGraphs.module.css"

function Loading() {
    return (
        <div className={styles.loading_container}>
            <div className={styles.spinner}></div>
            <p>Carregando...</p>
        </div>
    );
}

export default Loading;
