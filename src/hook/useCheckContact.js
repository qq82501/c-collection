import { useState } from "react";

function useCheckContact() {
  const [inputContact, setInputContact] = useState("");
  const [errorContact, setErrorContact] = useState(null);

  const checkContactHandler = function () {
    if (inputContact.length < 12 || inputContact.slice(0, 2) !== "09")
      return setErrorContact("輸入電話有誤，請重新確認後輸入");
    if (inputContact.length === 12) return setErrorContact(null);
  };

  const setInputContactHandler = function (e) {
    const regex = /[^0-9]/;
    const inputValue = e.target.value.replaceAll("-", "").replace(regex, "");
    if (inputValue.length > 10) return;
    let group = [];
    const formatArr = [];

    for (let i = 0; i < inputValue.length; i++) {
      if (i === 4 || i === 7) {
        formatArr.push(group.join(""));
        group = [];
        group.push(inputValue[i]);
      } else {
        group.push(inputValue[i]);
      }
    }
    formatArr.push(group.join(""));
    const formatVale = formatArr.join("-");
    setInputContact(formatVale);
  };

  return {
    inputContact,
    setInputContactHandler,
    checkContactHandler,
    errorContact,
  };
}

export default useCheckContact;
