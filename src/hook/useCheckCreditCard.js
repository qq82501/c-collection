import { useState } from "react";

function useCheckCreditCard() {
  const [inputCreditCard, setInputCreditCard] = useState(null);
  const [inputCsv, setInputCsv] = useState(null);
  const [inputExpiry, setInputExpiry] = useState(null);
  const [errorCreditCard, setErrorCreditCard] = useState(null);
  const [errorCsv, setErrorCsv] = useState(null);
  const [errorExpiry, setErrorExpiry] = useState(null);

  const checkCreditNumberHandler = function () {
    console.log(inputCreditCard.length);
    if (inputCreditCard.length < 19)
      return setErrorCreditCard("信用卡號有誤，需為16碼");
    if (inputCreditCard.length === 19) return setErrorCreditCard(null);
  };

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

  const checkExpiryHandler = function () {
    if (inputExpiry.length < 7)
      return setErrorExpiry("卡片有效期限格式有誤，請確認後重新輸入");
    if (inputExpiry.length === 7) return setErrorExpiry(null);
  };

  const setInputExpiryHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = [...e.target.value.replaceAll(regex, "")];
    if (inputValue.length > 4) return;
    if (inputValue.length > 2) inputValue.splice(2, 0, " / ");
    const formatedValue = inputValue.join("");
    setInputExpiry(formatedValue);
  };

  const checkCsvHandler = function () {
    if (inputCsv.length < 3)
      return setErrorCsv("安全碼格式有誤，請確認後重新輸入");
    if (inputCsv.length === 3) return setErrorCsv(null);
  };

  const setInputCsvHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = e.target.value.replaceAll(regex, "");
    if (inputValue.length > 3) return setInputCsv(inputValue.slice(0, 3));
    setInputCsv(inputValue);
  };

  return {
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
  };
}

export default useCheckCreditCard;
