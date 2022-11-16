import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchResultPage.module.css";
import SearchResult from "../components/search/SearchResult";

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const products = useSelector((state) => state.products);
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get("name");

  useEffect(() => {
    const matchResults = products.filter((product) =>
      product.title.includes(query)
    );
    document.title = `C.Collection — 搜尋 "${query}" 結果`;
    setSearchResults(matchResults);
  }, [products, query]);

  return (
    <div className={styles.search_result__container}>
      <div className={styles.search_result__title_bar}>
        <span>{`搜尋 "${query}" 結果`}</span>
      </div>
      <div className={styles.search_result__box}>
        <SearchResult results={searchResults} />
      </div>
    </div>
  );
}
export default SearchResultPage;
