import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
