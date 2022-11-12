import { useState } from "react";
import { getMembers } from "../helper/helper";

function useCheckAccountExisted() {
  const [inputAccount, setInputAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorExisted, setErrorExisted] = useState(null);
  const [errorFormat, setErrorFormat] = useState(null);

  const setInputAccountHandler = function (e) {
    setInputAccount(e.target.value);
  };

  const checkAccountExisted = async function (account) {
    try {
      // to check there must be an "@" in the middle
      const regex = /^\w+(?=@{1,1}).[^@]*$/g;
      const isValidInput = regex.test(account);

      if (!isValidInput && account) {
        setErrorFormat("帳號格式錯誤，參考格式: abc@example.com");
        setErrorExisted(null);
        return;
      }

      if (!account) {
        return setErrorFormat(null);
      }
      if (isValidInput) setErrorFormat(null);

      setIsLoading(true);
      const members = await getMembers();
      const isExisted = members.some((mem) => mem.account === account);

      if (isExisted) {
        setErrorExisted("該信箱已有用戶存在，請重新輸入");
        return;
      }

      if (!isExisted) {
        setErrorExisted(null);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputAccount,
    setInputAccountHandler,
    isLoading,
    errorExisted,
    errorFormat,
    checkAccountExisted,
  };
}

export default useCheckAccountExisted;
