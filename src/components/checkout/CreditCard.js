import { useSelector } from "react-redux";
import styles from "./CreditCard.module.css";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";
import useCheckCreditCard from "../../hook/useCheckCreditCard";

function CreditCard() {
  const loginUser = useSelector((state) => state.loginUser);

  const {
    inputCreditCard,
    inputCsv,
    inputExpiry,
    errorCreditCard,
    errorCsv,
    errorExpiry,
    setInputCreditCardHandler,
    setInputCsvHandler,
    setInputExpiryHandler,
    checkCreditNumberHandler,
    checkCsvHandler,
    checkExpiryHandler,
  } = useCheckCreditCard();

  return (
    <div className={styles.credit_card__container}>
      {errorCreditCard && <p className="error_message">{errorCreditCard}</p>}
      <InputWithPlaceHolder
        placeholder="*信用卡卡號"
        type="text"
        defaultValue={
          loginUser ? loginUser.creditCard?.cardNumber || null : null
        }
        value={inputCreditCard}
        onChange={setInputCreditCardHandler}
        onBlur={checkCreditNumberHandler}
        id="cardNumber"
      />
      {errorExpiry && <p className="error_message">{errorExpiry}</p>}
      <InputWithPlaceHolder
        type="text"
        defaultValue={loginUser ? loginUser.creditCard?.expiry || null : null}
        placeholder="*卡片有效期限"
        id="expire"
        onChange={setInputExpiryHandler}
        onBlur={checkExpiryHandler}
        value={inputExpiry}
      />
      {errorCsv && <p className="error_message">{errorCsv}</p>}
      <InputWithPlaceHolder
        placeholder="*安全碼(CSV)"
        id="csv"
        defaultValue={loginUser ? loginUser.creditCard?.csv || null : null}
        onChange={setInputCsvHandler}
        onBlur={checkCsvHandler}
        value={inputCsv}
      />
    </div>
  );
}

export default CreditCard;
