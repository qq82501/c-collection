import { useSelector } from "react-redux";
import styles from "./Contact.module.css";
import Input from "../UI/Input";

function Contact() {
  const loginUser = useSelector((state) => state.loginUser);
  console.log(loginUser);

  return (
    <div className={styles.contact__container}>
      <p className={styles.contact__title}>訂購人資訊</p>
      <Input
        labelTitle="姓 :"
        value={loginUser.lastName}
        readOnly={true}
        id="lastName"
        type="text"
      />
      <Input
        labelTitle="名字 :"
        value={loginUser.firstName}
        readOnly={true}
        id="firatName"
        type="text"
      />
      <Input
        labelTitle="聯絡電話 :"
        value={loginUser.contact}
        readOnly={true}
        id="phone"
        type="text"
      />
      <Input
        labelTitle="信箱 :"
        value={loginUser.account}
        readOnly={true}
        id="email"
        type="text"
      />
    </div>
  );
}
export default Contact;
