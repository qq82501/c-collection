import styles from "./MobileFooterBar.module.css";
import { useSelector } from "react-redux";
import { HomeIcon, TagIcon, UserIcon } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import NavButton from "../UI/NavButton";
import { Link } from "react-router-dom";

function MobileFooterBar() {
  const { loginUser } = useSelector((state) => state);

  const loginButton = loginUser ? (
    <NavButton>
      <UserIconSolid />
      <span>我的</span>
    </NavButton>
  ) : (
    <NavButton>
      <UserIcon />
      <span>我的</span>
    </NavButton>
  );
  return (
    <footer className={styles.footer__container}>
      <ul className={styles.footer__list}>
        <li>
          <Link to="/" className="link">
            <NavButton>
              <HomeIcon />
              <span>首頁</span>
            </NavButton>
          </Link>
        </li>
        <li>
          <Link to="productCategory" className="link">
            <NavButton>
              <TagIcon />
              <span>分類</span>
            </NavButton>
          </Link>
        </li>
        <li className="nav_icon__login">
          <Link to="member" className="link">
            {loginButton}
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default MobileFooterBar;
