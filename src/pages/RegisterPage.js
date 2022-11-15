import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import OutlineContainer from "../components/UI/OutlineContainer";
import InputWithPlaceHolder from "../components/UI/InputWithPlaceholder";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreditCard from "../components/checkout/CreditCard";
import styles from "./RegisterPage.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { addNewMember } from "../helper/helper";
import useCheckAccountExisted from "../hook/useCheckAccountExisted";
import useCheckIdenticalPassword from "../hook/useCheckIdenticalPassword";
import useBodFormat from "../hook/useBodFormat";
import useCheckContact from "../hook/useCheckContact";

function RegisterPage() {
  const navigate = useNavigate();
  const refRegisterPsw = useRef();
  const refConfirmPsw = useRef();

  const {
    inputAccount,
    setInputAccountHandler,
    isLoading: checkingAccount,
    errorExisted,
    errorFormat,
    checkAccountExisted,
  } = useCheckAccountExisted();

  const { error: errorNotIdentical, checkIdenticalHandler } =
    useCheckIdenticalPassword();
  const { inputBOD, errorBod, setInputBODHandler, checkBODValidHandler } =
    useBodFormat();

  const {
    inputContact,
    setInputContactHandler,
    checkContactHandler,
    errorContact,
  } = useCheckContact();
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const creditOpenHandler = function () {
    setIsCreditOpen(true);
  };

  const creditCloseHandler = function () {
    setIsCreditOpen(false);
  };

  const submitNewMemberHandler = async function (e) {
    e.preventDefault();

    if (
      errorExisted ||
      errorBod ||
      errorFormat ||
      errorNotIdentical ||
      errorContact
    )
      return;
    try {
      setIsLoading(true);
      await addNewMember(e.target);
      setIsLoading(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className={styles.register__container}>
      {isLoading && <LoadingSpinner />}
      <OutlineContainer title="註冊">
        <form
          className={styles.register__form}
          onSubmit={submitNewMemberHandler}
        >
          {errorExisted && <p className="error_message">{errorExisted}</p>}
          {errorFormat && <p className="error_message">{errorFormat}</p>}

          <div className={styles.register__account_input__box}>
            <InputWithPlaceHolder
              onBlur={checkAccountExisted.bind(null, inputAccount)}
              onChange={setInputAccountHandler}
              placeholder="*信箱 (帳號)"
              type="text"
              id="email"
            />
            <div>{checkingAccount && <LoadingSpinner />}</div>
          </div>
          {errorNotIdentical && (
            <p className="error_message">{errorNotIdentical}</p>
          )}
          <div className={`${styles.flex_row} ${styles.password_box}`}>
            <InputWithPlaceHolder
              placeholder="*設定密碼"
              ref={refRegisterPsw}
              type="password"
              id="registerPassword"
              onBlur={checkIdenticalHandler.bind(
                null,
                refRegisterPsw,
                refConfirmPsw
              )}
            />
            <InputWithPlaceHolder
              placeholder="*確認密碼"
              ref={refConfirmPsw}
              type="password"
              id="confirmPassword"
              onBlur={checkIdenticalHandler.bind(
                null,
                refRegisterPsw,
                refConfirmPsw
              )}
            />
          </div>
          <div className={`${styles.flex_row} ${styles.name_box}`}>
            <InputWithPlaceHolder placeholder="*姓　　" id="lastName" />
            <InputWithPlaceHolder placeholder="*名　　" id="firstName" />
          </div>
          {errorBod && <p className="error_message">{errorBod}</p>}
          <InputWithPlaceHolder
            placeholder="*生日 YYYY/MM/DD"
            type="text"
            id="birthday"
            onChange={setInputBODHandler}
            onBlur={checkBODValidHandler.bind(null, inputBOD)}
            value={inputBOD}
          />
          {errorContact && <p className="error_message">{errorContact}</p>}
          <InputWithPlaceHolder
            placeholder="*聯絡電話 09xx-xxx-xxx"
            type="text"
            id="phone"
            onChange={setInputContactHandler}
            onBlur={checkContactHandler}
            value={inputContact}
          />
          <input placeholder="地址" id="address" name="address" />
          <div className={styles.flex_row}>
            <label>信用卡 : </label>
            {!isCreditOpen && (
              <button
                type="button"
                className={styles.btn__plus}
                onClick={creditOpenHandler}
              >
                <PlusIcon className={styles.icon__plus} />
              </button>
            )}
          </div>
          {isCreditOpen && (
            <div className={styles.CreditCard__box}>
              <button
                onClick={creditCloseHandler}
                className={`btn__close ${styles.credit_card__btn__close}`}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <CreditCard />
            </div>
          )}
          <button type="submit" className={styles.btn__submit}>
            送出
          </button>
        </form>
      </OutlineContainer>
    </div>
  );
}

export default RegisterPage;
