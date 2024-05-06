import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";

const Root = () => {
    return (
        <div>
            <NavBar />
            <div className="mt-[68px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;