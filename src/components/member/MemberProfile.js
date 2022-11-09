import styles from "./MemberProfile.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Input from "../UI/Input";

function MemberProfile(props) {
  const navigate = useNavigate();
  const member = useLoaderData();

  const openEditorHandler = function () {
    props.onSetEditor(true);
    navigate("edit");
  };

  return (
    <div className={styles.member_profile__container}>
      <button className={styles.btn__edit} onClick={openEditorHandler}>
        <PencilSquareIcon className={styles.icon__edit} />
        <span>編輯</span>
      </button>
      <Input
        readOnly={true}
        labelTitle="姓名 : "
        value={`${member.lastName}  ${member.firstName}`}
      />
      <Input readOnly={true} labelTitle="聯絡電話 : " value={member.contact} />
      <Input
        readOnly={true}
        labelTitle="地址 : "
        value={member.address || "未提供"}
      />
      <Input readOnly={true} labelTitle="生日 : " value={member.birthday} />
      {!member.creditCard.cardNumber && (
        <Input readOnly={true} labelTitle="信用卡 : " value={"未提供"} />
      )}

      <Input
        readOnly={true}
        labelTitle="信用卡號 : "
        value={member.creditCard.cardNumber}
      />
      <Input
        readOnly={true}
        labelTitle="卡片有效期限 : "
        value={member.creditCard.expiry}
      />
    </div>
  );
}

export default MemberProfile;
