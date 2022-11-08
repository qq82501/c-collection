import { useSelector } from "react-redux";
import styles from "./HomeDelivery.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function HomeDelivery() {
  const loginUser = useSelector((state) => state.loginUser);

  return (
    <div className={styles.home_delivery__container}>
      <InputWithPlaceHolder
        placeholder="收件者—姓"
        id="homeLastName"
        defaultValue={loginUser.lastName}
        type="text"
      />
      <InputWithPlaceHolder
        placeholder="收件者—名"
        id="homeFirstName"
        defaultValue={loginUser.firstName}
        type="text"
      />
      <InputWithPlaceHolder
        placeholder="連絡電話"
        id="contactNumber"
        defaultValue={loginUser.contactNumber}
        type="text"
      />
      <InputWithPlaceHolder placeholder="收件地址" id="address" type="text" />
    </div>
  );
}

export default HomeDelivery;
