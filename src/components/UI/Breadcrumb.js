import { Link, useLocation } from "react-router-dom";

import styles from "./Breadcrumb.module.css";

function Breadcrumb(props) {
  const location = useLocation();
  console.log(location);
  const { categoryPath } = props;

  const breadContent = categoryPath
    .map((cate, i) => {
      return (
        <Link key={i} className="link" to={`/product/${cate}`}>
          {cate}
        </Link>
      );
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
