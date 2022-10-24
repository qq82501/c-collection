import { Outlet } from "react-router-dom";
import MainNavigator from "./MainNavigator";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <MainNavigator />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
