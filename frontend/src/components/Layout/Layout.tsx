import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./layout.css"

export default function Layout() {

    return(
    <div className="layout-wrapper">
        <div className="shrink">
        <Header/>
    <div className="page-wrapper">
        <Outlet/>
    </div>
        <Footer/>
        </div>
    </div>
    )
}