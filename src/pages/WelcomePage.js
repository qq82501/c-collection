import ImageSlider from "../components/UI/ImageSlider";
import styles from "./WelcomePage.module.css";
import IndexAds from "../components/UI/IndexAds";

const ads = [
  {
    fileName: "cuff1_1200h.jpg",
    title: "夾式耳環",
    to: "/product/耳環/夾式耳環",
  },
  {
    fileName: "piercing2_1200h.jpg",
    title: "穿孔式耳環",
    to: "/product/耳環/穿孔式耳環",
  },
  {
    fileName: "ring1_h.jpg",
    title: "戒指",
    to: "/product/戒指",
  },
];

function WelcomePage() {
  return (
    <div className="center">
      <div className={styles.slider_box}>
        <ImageSlider />
      </div>
      <IndexAds ads={ads} />
    </div>
  );
}

export default WelcomePage;
