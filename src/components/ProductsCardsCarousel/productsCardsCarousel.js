import TabNavigation from "./tabNavigation";
import styles from './productsCardsCarousel.module.css';
import ViewAllButton from "./ViewAllButton";

function ProductsCardsCarousel({ categories }) {
    return (
        <div>
            <div className={styles["navigationContainer"]}>
                <TabNavigation tabs={categories} />
                <ViewAllButton text="Voir Tout" onClick={() => {window.location.href = '/boutique'}} />
            </div>
        </div>
    );
}

export default ProductsCardsCarousel;