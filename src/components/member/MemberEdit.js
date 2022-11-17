import { useState } from "react";
import {
  Form,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";
import CreditCard from "../checkout/CreditCard";
import styles from "./MemberEdit.module.css";

function MemberEdit() {
  const params = useParams();
  const outletCtx = useOutletContext();
  const navigate = useNavigate();
  const member = useLoaderData();

  const [isCreditOpen, setIsCreditOpen] = useState(
    Boolean(member.creditCard?.cardNumber)
  );

  const creditOpenHandler = function () {
    setIsCreditOpen(true);
  };

  const creditCloseHandler = function () {
    setIsCreditOpen(false);
  };

  const comebackHandler = function () {
    outletCtx.onSetEditor(false);
    navigate(-1);
  };

  return (
    <Form
      className={styles.profile_edit__form}
      method="post"
      action={`/memberProfile/${params.account}`}
    >
      <div className={`${styles.flex_row} ${styles.name_box}`}>
        <InputWithPlaceHolder
          placeholder="*姓　　"
          id="lastName"
          defaultValue={member.lastName}
        />
        <InputWithPlaceHolder
          placeholder="*名　　"
          id="firstName"
          defaultValue={member.firstName}
        />
      </div>

      <InputWithPlaceHolder
        placeholder="*聯絡電話"
        type="text"
        id="phone"
        defaultValue={member.contact}
      />
      <input
        placeholder="地址"
        id="address"
        name="address"
        defaultValue={member.address}
      />
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
            type="button"
            onClick={creditCloseHandler}
            className={`btn__close ${styles.credit_card__btn__close}`}
          >
            <XMarkIcon />
          </button>
          <CreditCard loginUser={member} />
        </div>
      )}
      <div className={styles.btns_box}>
        <button type="submit" className={styles.btn__submit}>
          送出
        </button>
        <button
          type="button"
          className={styles.btn__edit_cancel}
          onClick={comebackHandler}
        >
          取消修改
        </button>
      </div>
    </Form>
  );
}

export default MemberEdit;
