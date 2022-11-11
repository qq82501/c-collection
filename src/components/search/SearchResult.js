import styles from "./SearchResult.module.css";
import ProductItem from "../products/ProductItem";

function SearchResult(props) {
  const productItemContent = props.results.map((result) => (
    <ProductItem product={result} key={result.productNo} />
  ));
  return <div className={styles.search_result__container}>{productItemContent}</div>;
}

export default SearchResult;
