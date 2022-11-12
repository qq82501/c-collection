import { useState, useEffect } from "react";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutlineContainer from "../components/UI/OutlineContainer";
import MemberProfile from "../components/member/MemberProfile";
import { updateMember } from "../helper/helper";
// import styles from "./MemberProfilePage.module.css";

function MemberProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const actionStatus = useActionData();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const isLogin = Boolean(loginUser);
  console.log("actionStatus", actionStatus);

  useEffect(() => {
    if (!isLogin) {
      return navigate("/");
    }

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
    <div className="nav-bar__height__outline_container ">
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

  await updateMember(editProfile);

  return { status: "sucess", updatedProfile: editProfile };
}
