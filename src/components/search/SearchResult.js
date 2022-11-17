import styles from "./SearchResult.module.css";
import ProductItem from "../products/ProductItem";

function SearchResult(props) {
  let productItemContent;
  if (props.results.length) {
    productItemContent = props.results.map((result) => (
      <ProductItem product={result} key={result.productNo} />
    ));
  }

  if (!props.results.length) {
    productItemContent = <p className="non_result__box">未搜尋到相關結果</p>;
  }

  return (
    <div className={styles.search_result__container}>{productItemContent}</div>
  );
}

export default SearchResult;
