import { useState, useEffect } from "react";
import { Outlet, useActionData, useNavigate, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutlineContainer from "../components/UI/OutlineContainer";
import MemberProfile from "../components/member/MemberProfile";
import { updateMember } from "../helper/helper";
import styles from "./MemberProfilePage.module.css";

function MemberProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const actionStatus = useActionData();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const isLogin = Boolean(loginUser);

  useEffect(() => {
    if (!isLogin) {
      return navigate("/");
    }
    console.log(actionStatus);
    if (actionStatus) {
      if (actionStatus.status === "sucess") {
        dispatch({
          type: "UPDATE_PROFILE",
          payload: actionStatus.updatedProfile,
        });
        setIsEditorOpen(false);
      }
    }
  }, [actionStatus, dispatch, isLogin, navigate]);

  return (
    <div className={styles.member_profile__container}>
      <OutlineContainer title="會員資料">
        {!isEditorOpen && <MemberProfile onSetEditor={setIsEditorOpen} />}
        {isEditorOpen && <Outlet context={{ onSetEditor: setIsEditorOpen }} />}
      </OutlineContainer>
    </div>
  );
}

export default MemberProfilePage;

export async function updateMemberFromProfile({ request, params }) {
  const formData = await request.formData();

  const editProfile = {
    account: params.account,
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    contact: formData.get("phone"),
    address: formData.get("address"),
    creditCard: {
      cardNumber: formData.get("cardNumber"),
      expiry: formData.get("expire"),
      csv: formData.get("csv"),
    },
  };
  if (editProfile.creditCard.cardNumber) {
    console.log(editProfile.creditCard.cardNumber.length);
    console.log(editProfile.creditCard.expiry.length);
    console.log(editProfile.creditCard.csv.length);
    if (
      editProfile.creditCard.cardNumber.length < 19 ||
      editProfile.creditCard.expiry.length < 7 ||
      editProfile.creditCard.csv.length < 3
    ) {
      return redirect(`/memberProfile/${params.account}/edit`);
    }
  }
  await updateMember(editProfile);

  return { status: "sucess", updatedProfile: editProfile };
}
