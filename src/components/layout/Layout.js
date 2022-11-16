import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MainNavigator from "./MainNavigator";
import styles from "./Layout.module.css";
import MobileHeaderBar from "./MobileHeaderBar";
import MobileFooterBar from "./MobileFooterBar";

function Layout() {
  const { deviceMode } = useSelector((state) => state);
  return (
    <div className={styles.layout}>
      {deviceMode === "pc" ? <MainNavigator /> : <MobileHeaderBar />}
      <main
        className={styles.main__container}
        style={deviceMode === "mobile" ? { paddingBottom: "5.5rem" } : {}}
      >
        <Outlet />
      </main>
      {deviceMode !== "mobile" && <p className={styles.copyright}>© Designed & Built by Cindy Lu, 2022</p>}
      {deviceMode === "mobile" && <MobileFooterBar />}
    </div>
  );
}

export default Layout;
