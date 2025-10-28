import LazyMedia from "../lazyMedia/LazyMedia";
import styles from "./whatsappWidget.module.css";

const WhatsAppWidget = ({ phoneNumber, text='' }) => {
  const handleWhatsAppClick = () => {
    // Format phone number by removing any non-digit characters
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.whatsappWidget}>
      <a 
        className={styles.whatsappLink}
        onClick={handleWhatsAppClick}
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <LazyMedia type="image" className={styles.whatsappIcon} src="./images/icons/whatsapp.png" alt="whatsapp" width={50} height={50}/>
        <span className={styles.whatsappText}>{text}</span>
      </a>
    </div>
  );
};

export default WhatsAppWidget;