import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreditCard.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function CreditCard() {
  const loginUser = useSelector((state) => state.loginUser);
  const [inputCreditCard, setInputCreditCard] = useState(null);

  const setInputCreditCardHandler = function (e) {
    const creditCard = [...e.target.value].filter((num) => num !== " ");
    if (creditCard.length > 16) return;
    const NumOfGroup = creditCard.length / 4;

    for (let i = 0; i < NumOfGroup; i++) {
      if (i === 0) continue;
      creditCard.splice(i * 4 + (i - 1), 0, " "); // add a space in every 4 digit
    }

    const splitCardNum = creditCard.join("");
    setInputCreditCard(splitCardNum);
  };

  return (
    <div className={styles.credit_card__container}>
      <InputWithPlaceHolder
        placeholder="*信用卡卡號"
        type="text"
        defaultValue={loginUser ? loginUser.creditCard.cardNumber : null}
        value={inputCreditCard}
        onChange={setInputCreditCardHandler}
        id="cardNumber"
      />
      <InputWithPlaceHolder
        type="text"
        defaultValue={loginUser ? loginUser.creditCard.expiry : null}
        placeholder="*卡片有效期限"
        id="expire"
      />
      <InputWithPlaceHolder
        placeholder="*安全碼(CSV)"
        id="csv"
        defaultValue={loginUser ? loginUser.creditCard.csv : null}
      />
    </div>
  );
}

export default CreditCard;
