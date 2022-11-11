import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreditCard.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";

function CreditCard() {
  const loginUser = useSelector((state) => state.loginUser);
  const [inputCreditCard, setInputCreditCard] = useState(null);
  const [inputCsv, setInputCsv] = useState(null);
  const [inputExpiry, setInputExpiry] = useState(null);

  const setInputCreditCardHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = e.target.value.replaceAll(regex, "");

    const creditCard = [...inputValue].filter(
      (num) => num !== " " && num !== regex
    );
    if (creditCard.length > 16) return;
    const NumOfGroup = creditCard.length / 4;

    for (let i = 0; i < NumOfGroup; i++) {
      if (i === 0) continue;
      creditCard.splice(i * 4 + (i - 1), 0, " "); // add a space in every 4 digit
    }
    const splitCardNum = creditCard.join("");
    setInputCreditCard(splitCardNum);
  };

  const setInputExpiryHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = [...e.target.value.replaceAll(regex, "")];
    if (inputValue.length > 4) return;
    if (inputValue.length > 2) inputValue.splice(2, 0, " / ");
    const formatedValue = inputValue.join("");
    setInputExpiry(formatedValue);
  };

  const setInputCsvHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = e.target.value.replaceAll(regex, "");
    if (inputValue.length > 3) return setInputCsv(inputValue.slice(0, 3));
    setInputCsv(inputValue);
  };

  return (
    <div className={styles.credit_card__container}>
      <InputWithPlaceHolder
        placeholder="*信用卡卡號"
        type="text"
        defaultValue={
          loginUser ? loginUser.creditCard?.cardNumber || null : null
        }
        value={inputCreditCard}
        onChange={setInputCreditCardHandler}
        id="cardNumber"
      />
      <InputWithPlaceHolder
        type="text"
        defaultValue={loginUser ? loginUser.creditCard?.expiry || null : null}
        placeholder="*卡片有效期限"
        id="expire"
        onChange={setInputExpiryHandler}
        value={inputExpiry}
      />
      <InputWithPlaceHolder
        placeholder="*安全碼(CSV)"
        id="csv"
        defaultValue={loginUser ? loginUser.creditCard?.csv || null : null}
        onChange={setInputCsvHandler}
        value={inputCsv}
      />
    </div>
  );
}

export default CreditCard;
