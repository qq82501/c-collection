import { useSelector } from "react-redux";
import styles from "./Contact.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function Contact() {
  const loginUser = useSelector((state) => state.loginUser);
  console.log(loginUser);

  return (
    <div className={styles.contact__container}>
      <p className={styles.contact__title}>訂購人資訊</p>
      <InputWithPlaceHolder
        placeholder="姓"
        defaultValue={loginUser.lastName}
        id="lastName"
        type="text"
      />
      <InputWithPlaceHolder
        placeholder="名字"
        defaultValue={loginUser.firstName}
        id="firstName"
        type="text"
      />
      <InputWithPlaceHolder
        placeholder="聯絡電話"
        defaultValue={loginUser.contactNumber}
        id="phone"
        type="phone"
      />
      <InputWithPlaceHolder
        placeholder="信箱"
        defaultValue={loginUser.account}
        id="email"
        type="email"
      />
    </div>
  );
}
export default Contact;
