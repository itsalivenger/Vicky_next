import LazyMedia from '../lazyMedia/LazyMedia';
import styles from './productPreview.module.css'

function productPreview() {
    return (
        <div>
            <div className={styles["pseudo-body"]}>
                <div className={styles["container-of-all"]}>
                    <span className={styles["model-span"]}>Model: <span className={styles["model"]}>ZG28</span></span>
                    <div className={styles["content-container"]}>
                        <div className={styles["container-one"]}>
                            <LazyMedia type={'image'} src="/images/products/item_view0.jpg" alt={"product"} className={styles["big-overview-image"]} />
                            <span className={styles["item-title"]}>Stylish & Durable.</span>
                            <span className={styles["item-desciption"]}>
                                The new Ultra Wide camera with autofocus takes incredibly sharp,
                                detailed macro photos and videos. You can also frame more expansive
                                scenes without taking a step back. And because it has a larger
                                aperture and bigger pixels, it can capture up to 2.6x more light
                                for higher image quality.
                            </span>
                        </div>
                        <div className={styles["container-two"]}>
                            <div className={styles["small-overview-image-container"]}>
                                <div className={styles["small-overview-image-first-row"]}>
                                    <LazyMedia type={'image'} className={`${styles["small-overview-image"]} ${styles["first"]}`} src="/images/products/item_view1.jpg" alt={"product"} />
                                    <LazyMedia type={'image'} alt='product' className={styles["small-overview-image"]} src="/images/products/item_view2.jpg" />
                                </div>
                                <div className={styles["small-overview-image-second-row"]}>
                                    <LazyMedia type={'image'} alt='product' className={styles["small-overview-image"]} src="/images/products/item_view1.jpg" />
                                    <LazyMedia type={'image'} alt='product' className={`${styles["small-overview-image"]} ${styles["fourth"]}`} src="/images/products/item_view1.jpg" />
                                </div>
                            </div>
                            <div className={styles["varient-price"]}>
                                <div className={styles["varient-quantity"]}>
                                    <span className={styles["choose-varient"]}>Choose Variant</span>
                                    <div className={styles["varient-image-container"]}>
                                        <LazyMedia type={'image'} alt='product' className={styles["varient-image"]} src="/images/products/item_view1.jpg" />
                                        <LazyMedia type={'image'} alt='product' className={styles["varient-image"]} src="/images/products/item_view1.jpg" />
                                        <LazyMedia type="image" alt='product' className={`${styles["varient-image"]} ${["clicked"]}`} src="/images/products/item_view1.jpg" width={50} height={50} unoptimized={true} />
                                    </div>
                                    <span className={styles["quantity-span"]}>Quantity</span>
                                    <div className={styles["quantity-container"]}>
                                        <button className={styles["lower-quantity"]}>-</button>
                                        <input className={styles["quantity-input"]} type="number" value="20" maxlength="3" min="0" />
                                        <button className={styles["add-quantity"]}>+</button>
                                    </div>
                                </div>
                                <div className={styles["price-add"]}>
                                    <span className={styles["price-span"]}>Price</span>
                                    <div className={styles["price-container"]}>
                                        <span className={styles["new-price-span"]}>
                                            <span className={styles["price-unit"]}>₹</span>
                                            <span className={styles["new-price"]}>1999</span>
                                        </span>
                                        <span className={styles["old-price-span"]}>
                                            <span className={styles["price-unit"]}>₹</span>
                                            <span className={styles["old-price"]}>3599</span>
                                        </span>
                                    </div>
                                    <button className={styles["add-to-cart"]}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default productPreview;