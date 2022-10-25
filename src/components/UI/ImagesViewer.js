import { useState } from "react";
import styles from "./ImagesViewer.module.css";

function ImagesViewer(props) {
  const { product } = props;
  const [selectedPreviewer, setSelectedPreviewer] = useState(0);
  const [viewerImgUrl, setViewerImgUrl] = useState(
    require(`../../images/products/${product.productNo}/01.jpg`)
  );

  const previewerChangeHandler = function (e) {
    const index = e.target.closest(`.${styles.previewer_item}`).dataset.index;
    const imgUrl = e.target.closest(`.${styles.previewer_img}`)?.src;
    if (!index || !imgUrl) return;
    setSelectedPreviewer(+index);
    setViewerImgUrl(imgUrl);
  };

  const previewBoxes = product.imgs.map((img, i) => {
    return (
      <button
        key={img}
        data-index={i}
        onClick={previewerChangeHandler}
        className={`${styles.previewer_item} ${
          i === selectedPreviewer ? styles.active : ""
        }`}
      >
        <img
          className={styles.previewer_img}
          alt="preview"
          src={require(`../../images/products/${product.productNo}/${img}`)}
        />
      </button>
    );
  });
  return (
    <div className={styles.image_viewer__container}>
      <div className={styles.previewer_box}>{previewBoxes}</div>
      <div className={styles.viewer_box}>
        <img className={styles.viewer_img} src={viewerImgUrl} alt="expand" />
      </div>
    </div>
  );
}

export default ImagesViewer;
