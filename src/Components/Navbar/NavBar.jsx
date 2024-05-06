import { FaBagShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allMovie'}>All Movie</NavLink></li>
        <li><NavLink to={'/favorite'}>Favorite Movie</NavLink></li>
        <li><NavLink to={'/contact'}>Contact</NavLink></li>
    </>
    return (
        <div className="w-full mx-auto bg-green-200 fixed top-0 z-10 bg-opacity-85 shadow-md">
            <div className="navbar bg-transparent w-11/12 md:w-4/5 mx-auto max-w-[1500px] bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <h2 className="text-2xl font-black text-orange-400">Movie<span className="text-cyan-500 ">Mania</span></h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <Link to={'/login'}><button className="btn btn-active">LogIn</button></Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;