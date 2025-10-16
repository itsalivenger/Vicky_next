import styles from './Unavailable.module.css';

function Unavailable() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Website is unavailable.</h1>
                <p>Please contact support for more information.</p>
            </div>
        </div>
    );
}

export default Unavailable;
