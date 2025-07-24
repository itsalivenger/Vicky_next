import styles from './loadingSpinner.module.css';

function LoadingSpinner() {
    return (
        <div>
            <div className={styles["container"]}>
                <div className={styles["spinner"]}></div>
            </div>
        </div>
    );
}



export default LoadingSpinner;