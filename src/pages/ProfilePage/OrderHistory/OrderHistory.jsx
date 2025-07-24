import LazyMedia from '../../../components/lazyMedia/LazyMedia';
import { getTotal, getDate } from '../../../components/other/usefulFunctions';
import { Card } from '../../../components/newsletterUi/Card/Card';
import styles from './OrderHistory.module.css';

export function OrderHistory({ orders }) {
  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Historique des commandes</h2>
      </div>

      <div className={styles.orderGrid}>
        {orders.length ? orders.map((order, index) => (
          <div key={index} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderNumber}>Commande #{order._id}</span>
              <span className={styles.orderDate}>{getDate(order.createdAt)}</span>
            </div>

            <div className={styles.orderItems}>
              {order.cart.map((item, index) => (
                (item.imageUrls && <LazyMedia type={'image'} key={index} className={styles.itemImage} src={item.imageUrls[0]} alt={item.productName} />
                )
              ))}
            </div>

            <div className={styles.orderTotal}>
              Total: {getTotal(order.cart)} DH
            </div>
          </div>
        )) : (
          <p className={styles.noOrders}>Aucune commande trouvée.</p>
        )}
      </div>
    </Card>
  );
}