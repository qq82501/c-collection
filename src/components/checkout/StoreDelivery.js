import styles from "./StoreDelivery.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../UI/Input";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function StoreDelivery() {
  const selectedDelivery = useSelector((state) => state.selectedDelivery);
  const [stores, setStores] = useState([]);
  const [selected, setSelected] = useState({ city: "", dist: "", road: "" });

  useEffect(() => {
    if (!selectedDelivery.title.includes("店到店")) return;

    const getStores = async function () {
      const res = await fetch(
        "https://c-collection-default-rtdb.firebaseio.com/stores.json"
      );
      const stores = await res.json();
      setStores(stores);
    };
    getStores();
  }, [selectedDelivery]);

  const setCityHandler = function (e) {
    setSelected((prev) => {
      return { ...prev, city: e.target.value };
    });
  };

  const setDistHandler = function (e) {
    setSelected((prev) => {
      return { ...prev, dist: e.target.value };
    });
  };

  const setRoadHandler = function (e) {
    setSelected((prev) => {
      return { ...prev, road: e.target.value };
    });
  };
  const cities = [...new Set(stores.map((store) => store.city))];

  const dists = [
    ...new Set(
      stores
        .filter((store) => store.city === selected.city)
        .map((store) => store.dist)
    ),
  ];

  const roads = [
    ...new Set(
      stores
        .filter(
          (store) =>
            store.city === selected.city && store.dist === selected.dist
        )
        .map((store) => store.road)
    ),
  ];

  const availableStore = [
    ...new Set(
      stores
        .filter(
          (store) =>
            store.city === selected.city &&
            store.dist === selected.dist &&
            store.road === selected.road
        )
        .map((store) => store.storeName)
    ),
  ];

  return (
    <div className={styles.store_delivery__container}>
      <div className={styles.store_delivery__recipient_box}>
        <InputWithPlaceHolder placeholder="收件人-姓" id="recipientLast" />
        <InputWithPlaceHolder placeholder="收件人-名" id="recipientFirst" />
      </div>
      <div className={styles.store_delivery__selector_box}>
        <Input
          labelTitle="縣市 : "
          selection={cities}
          onChange={setCityHandler}
          required={true}
        />
        <Input
          labelTitle="行政區 : "
          selection={dists}
          onChange={setDistHandler}
          required={true}
        />
        <Input
          labelTitle="道路 : "
          selection={roads}
          onChange={setRoadHandler}
          required={true}
        />
        <Input
          labelTitle="店家 : "
          selection={availableStore}
          required={true}
        />
      </div>
    </div>
  );
}

export default StoreDelivery;
