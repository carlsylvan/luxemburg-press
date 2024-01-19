import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./layout.css"
import { Suspense } from "react";
import Loading from "../Loading/Loading";

export default function Layout() {

    return(
    <div className="layout-wrapper">
        <Header/>
            <div className="page-wrapper">
            <Suspense fallback={<Loading></Loading>}>
                <Outlet/>
                </Suspense>
            </div>
        <Footer/>


        </div>
    )
}