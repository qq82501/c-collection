import { useState } from "react";
import OutlineContainer from "../components/UI/OutlineContainer";
import MemberProfile from "../components/member/MemberProfile";
// import styles from "./MemberProfilePage.module.css";
import { Outlet } from "react-router-dom";

function MemberProfilePage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="nav-bar__height__outline_container ">
      <OutlineContainer title="會員資料">
        {!isEditorOpen && <MemberProfile onSetEditor={setIsEditorOpen} />}
        {isEditorOpen && <Outlet />}
      </OutlineContainer>
    </div>
  );
}

export default MemberProfilePage;
