import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

import styles from "./Sidebar.module.css"


function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            {/* элемент который передает навигацию похож на children */}
            <Outlet />
            <p>List of cities</p>
            <Footer />
        </div>
    )
}
export default SideBar;