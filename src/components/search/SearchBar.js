import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./SearchBar.module.css";

const SearchBar = React.forwardRef((props, ref) => {
  const { deviceMode } = useSelector((state) => state);
  const { isSearchBarOpen } = props;

  useEffect(() => {
    if (deviceMode === "mobile") return;
    if (!isSearchBarOpen) {
      ref.current.value = "";
    }
  }, [isSearchBarOpen, ref, deviceMode]);

  return (
    <div
      className={`${styles.search_bar__container} ${
        deviceMode === "pc"
          ? styles.search_bar__container_pc
          : styles.search_bar__container_mobile
      } ${isSearchBarOpen && styles.search_bar__active} `}
    >
      <input placeholder={props.placeholder} ref={ref} />
    </div>
  );
});

export default SearchBar;
