import LazyMedia from "../lazyMedia/LazyMedia";
import styles from "./imageAndVideo.module.css";

function ImageAndVideo({ img, vid }) {
    return (
        <div className={styles.container}>
            <LazyMedia type={'image'} src={img} alt="item-image" />
            <video src={vid} alt="item-video" className={styles.video} controls />
        </div>
    );
}

export default ImageAndVideo;