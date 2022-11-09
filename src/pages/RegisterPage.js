import { useState } from "react";
import { useFetcher } from "react-router-dom";
import OutlineContainer from "../components/UI/OutlineContainer";
import InputWithPlaceHolder from "../components/UI/InputWithPlaceholder";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreditCard from "../components/checkout/CreditCard";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const fetcher = useFetcher();
  const [isCreditOpen, setIsCreditOpen] = useState(false);

  const creditOpenHandler = function () {
    setIsCreditOpen(true);
  };

  const creditCloseHandler = function () {
    setIsCreditOpen(false);
  };

  return (
    <div className="nav-bar__height__outline_container">
      <OutlineContainer title="註冊">
        <fetcher.Form
          className={styles.register__form}
          method="Post"
          action="/addNewMember"
        >
          <InputWithPlaceHolder
            placeholder="*信箱 (帳號)"
            type="email"
            id="email"
          />
          <div className={styles.flex_row}>
            <InputWithPlaceHolder
              placeholder="*設定密碼"
              type="password"
              id="password"
            />
            <InputWithPlaceHolder
              placeholder="*確認密碼"
              type="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className={styles.flex_row}>
            <InputWithPlaceHolder placeholder="*姓　　" id="lastName" />
            <InputWithPlaceHolder placeholder="*名　　" id="firstName" />
          </div>

          <InputWithPlaceHolder
            placeholder="*生日 YYYY/MM/DD"
            type="text"
            id="birthday"
          />
          <InputWithPlaceHolder
            placeholder="*聯絡電話"
            type="text"
            id="phone"
          />
          <input placeholder="地址" id="address" />
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
        </fetcher.Form>
      </OutlineContainer>
    </div>
  );
}

export default RegisterPage;
