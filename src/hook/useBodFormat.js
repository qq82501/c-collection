import { useState } from "react";

function useBodFormat() {
  const [inputBOD, setInputBOD] = useState(null);
  const [errorBod, setErrorBod] = useState(null);

  const checkBODValidHandler = function (bod) {
    const bodString = bod.replaceAll(" / ", ",");
    const correctMonth = String(+bodString.slice(5, 7) - 1);
    const validBodString = `${bodString.slice(
      0,
      5
    )}${correctMonth}${bodString.slice(-3)}`;

    const bodDate = new Date(validBodString);

    if (!bodString.length) return setErrorBod(null);
    if (bodString.length < 10) {
      return setErrorBod("資料輸入不齊全，請參照格式YYYY/MM/DD");
    }
    if (String(bodDate) === "Invalid Date") {
      return setErrorBod("日期數字有誤，請確認後重新輸入");
    }
    if (bodDate > new Date()) {
      return setErrorBod("輸入日期超過今日，請確認後重新輸入");
    }
    setErrorBod(null);
  };

  const setInputBODHandler = function (e) {
    const regex = /[^0-9]/;
    const inputValue = e.target.value.replaceAll(" / ", "").replace(regex, "");
    if (inputValue.length > 8) return;
    let group = [];
    const formatArr = [];

    for (let i = 0; i < inputValue.length; i++) {
      if (i === 4 || i === 6) {
        formatArr.push(group.join(""));
        group = [];
        group.push(inputValue[i]);
      } else {
        group.push(inputValue[i]);
      }
    }
    formatArr.push(group.join(""));
    const formatValue = formatArr.join(" / ");

    setInputBOD(formatValue);
  };

  return { inputBOD, errorBod, setInputBODHandler, checkBODValidHandler };
}

export default useBodFormat;
