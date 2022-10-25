import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.css";

function Breadcrumb(props) {
  const { categoryPath } = props;

  const breadContent = categoryPath
    .map((cate, i) => {
      if (i === categoryPath.length - 1) {
        return (
          <span className={styles.last_path} key={i}>
            {cate}
          </span>
        );
      }
      if (i === 0) {
        return (
          <Link key={i} className="link" to={`/product/${cate}`}>
            {cate}
          </Link>
        );
      } else {
        return (
          <Link
            key={i}
            className="link"
            to={`/product/${categoryPath[0]}/${cate}`}
          >
            {cate}
          </Link>
        );
      }
    })
    .reduce((acc, cate, i) => {
      acc.push(cate);
      if (i < categoryPath.length - 1) {
        acc.push(<span key={Math.random()}>/</span>);
      }
      return acc;
    }, []);

  return <div className={styles.breadcrumb}>{breadContent}</div>;
}
export default Breadcrumb;
