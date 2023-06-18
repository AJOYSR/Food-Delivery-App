import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import Avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "./../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, fadeInOut } from "../animations";
import { MdShoppingCart, MdLogout } from "../assets/icons";
import { useSelector } from "react-redux";
const Header = () => {
    const user = useSelector((state) => state.user);

    return (
        <header
            className="fixed backdrop-blur-md z-50 px-12 md:px-20 py-6
        inset-x-0 top-0 flex items-center justify-between"
        >
            <NavLink to={"/"} className={"flex items-center justify-center gap-4"}>
                <img src={logo} className="w-12 " alt="logo" />
                <p className="text-semibold text-2xl">FooD</p>
            </NavLink>

            <nav className="flex items-center justify-center gap-8 ">
                <ul className="hidden md:flex items-center justify-center gap-16">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                        to={"/"}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                        to={"/menu"}
                    >
                        Menu
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                        to={"/services"}
                    >
                        Services
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? isActiveStyles : isNotActiveStyles
                        }
                        to={"/aboutus"}
                    >
                        About Us
                    </NavLink>
                </ul>
                <motion.div {...buttonClick} className="relative cursor-pointer">
                    <MdShoppingCart className="text-3xl text-textColor" />
                    <div
                        className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center
                    absolute -top-4 -right-1"
                    >
                        <p className="text-primary text-base font-semibod">2</p>
                    </div>
                </motion.div>
                {user ? (
                    <>
                        <div className="relative cursor-pointer  ">
                            <div
                                className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center "
                            >
                                <motion.img
                                    className="w-full h-full object-cover"
                                    src={user?.picture ? user?.picture : Avatar}
                                    whileHover={{ scale: 1.15 }}
                                    referrerPolicy="np-referrer"
                                />
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to={"/login"}>
                            <motion.div
                                {...buttonClick}
                                className="px-4 py-2 rounded-md shadow-md bg-primary
                            border border-red-300 cursor-pointer"
                            >
                                Login
                            </motion.div>
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
