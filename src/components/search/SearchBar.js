import React, { useEffect } from "react";

import styles from "./SearchBar.module.css";

const SearchBar = React.forwardRef((props, ref) => {
  const { isSearchBarOpen } = props;

  useEffect(() => {
    if (!isSearchBarOpen) {
      ref.current.value = "";
    }
  }, [isSearchBarOpen, ref]);

  return (
    <div
      className={`${styles.search_bar__container} ${
        isSearchBarOpen && styles.search_bar__active
      }`}
    >
      <input placeholder={props.placeholder} ref={ref} />
    </div>
  );
});

export default SearchBar;
