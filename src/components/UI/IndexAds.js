import { Link } from "react-router-dom";
import styles from "./IndexAds.module.css";

function IndexAds(props) {
  const ads = props.ads.map((ad, i) => {
    return (
      <Link to={ad.to} key={i} className={`${styles.ad_link} ad_link__${i}`}>
        <div
          className={styles["col-2-ad"]}
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(3, 3, 3, 0.15),
              rgba(3, 3, 3, 0.7)
            ),url(${require(`../../images/ad/${ad.fileName}`)})`,
          }}
        >
          <p className={styles.ad_title}>{ad.title}</p>
        </div>
      </Link>
    );
  });
  return <div className={`${styles.ads__box} center`}>{ads}</div>;
}

export default IndexAds;
