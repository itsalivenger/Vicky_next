import styles from './location.module.css';

function Location() {
    return (
        <div>
            <div className={styles["map-container"]}>
                <h2 className={styles["map-title"]}>Nous localiser</h2>
                <div className={styles["map-wrapper"]}>
                    <iframe title='Heatz Location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212752.96934809303!2d-7.751807742485042!3d33.57246436737454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1735058187780!5m2!1sfr!2sma" width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
}

export default Location;