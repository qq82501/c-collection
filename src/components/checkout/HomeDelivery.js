import styles from "./HomeDelivery.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function HomeDelivery() {
  return (
    <div className={styles.home_delivery__container}>
      <InputWithPlaceHolder placeholder="收件者—姓" id="lastName" type="text" />
      <InputWithPlaceHolder
        placeholder="收件者—名"
        id="firstname"
        type="text"
      />
      <InputWithPlaceHolder
        placeholder="連絡電話"
        id="contactNumber"
        type="text"
      />
      <InputWithPlaceHolder placeholder="收件地址" id="address" type="text" />
    </div>
  );
}

export default HomeDelivery;
