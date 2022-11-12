import { useState } from "react";

function useCheckIdenticalPassword() {
  const [error, setError] = useState();

  const checkIdenticalHandler = function (firstPswEl, secondPswEl) {
    const firstPsw = firstPswEl.current?.value;
    const secondPsw = secondPswEl.current?.value;
    if (!firstPsw || !secondPsw) return;
    if (firstPsw !== secondPsw) {
      setError("兩者密碼不一致，請重新確認後輸入");
    }
    if (firstPsw === secondPsw) {
      setError(null);
    }
  };

  return { error, checkIdenticalHandler };
}

export default useCheckIdenticalPassword;
