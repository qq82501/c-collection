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
    const inputValue = e.target.value.replaceAll(" ", "").replaceAll(regex, "");
    let group = [];
    const formatArr = [];
    for (let i = 0; i < inputValue.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        formatArr.push(group.join(""));
        group = [];
        group.push(inputValue[i]);
      } else {
        group.push(inputValue[i]);
      }
    }
    formatArr.push(group.join(""));
    const formatValue = formatArr.join(" ");
    if (inputValue.length > 16)
      return setInputCreditCard(formatValue.slice(0, 19));
    setInputCreditCard(formatValue);
  };

  const checkExpiryHandler = function () {
    if (inputExpiry.length < 7)
      return setErrorExpiry("卡片有效期限格式有誤，請確認後重新輸入");
    if (inputExpiry.length === 7) return setErrorExpiry(null);
  };

  const setInputExpiryHandler = function (e) {
    const regex = /[^0-9]/g;
    const inputValue = e.target.value
      .replaceAll(" / ", "")
      .replaceAll(regex, "");
    let group = [];
    const formatArr = [];
    for (let i = 0; i < inputValue.length; i++) {
      if (i === 2) {
        formatArr.push(group.join(""));
        group = [];
        group.push(inputValue[i]);
      } else {
        group.push(inputValue[i]);
      }
    }
    formatArr.push(group.join(""));
    const formatValue = formatArr.join(" / ");
    if (inputValue.length > 4) return setInputExpiry(formatValue.slice(0, 7));

    setInputExpiry(formatValue);
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
