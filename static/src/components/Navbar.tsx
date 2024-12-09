import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../protectedRoute/authContext";
import Transition from "./Transition";
import { AppRole } from "../utils/roles";

const Navbar = () => {
    const { logout, user, isAnonymous } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current || !trigger.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [dropdownOpen]);

    // Close dropdown if ESC key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!dropdownOpen || key !== "ESC") return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [dropdownOpen]);

    return (
        <nav className="navbar fixed inset-x-0 bg-zinc-900 text-white shadow-sm z-50 backdrop-blur drop-shadow-lg py-3 rtl">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side - Logo and Nav Links */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-md md:text-xl font-bold">
                        إلتزامات المركز الرئيسي لشبكات نظم المعلومات
                    </Link>
                </div>

                {/* Right side - User Profile with Dropdown */}
                <div className="relative inline-flex">
                    <button
                        ref={trigger}
                        className="inline-flex justify-center items-center group gap-3"
                        aria-haspopup="true"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                    >
                        {/* Profile Avatar */}
                        <div className="bg-neutral-focus text-neutral-content ring rounded-full w-10 h-10 flex justify-center items-center">
                            <span className="text-lg font-bold pt-1">
                                {isAnonymous ? "?" : user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>

                        {/* Username */}
                        <div className="flex items-center truncate">
                            <svg
                                className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
                                viewBox="0 0 12 12"
                            >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    <Transition
                        className={`origin-top-right z-10 absolute top-full min-w-44 bg-gray-800 border border-gray-200 border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 left-0`}
                        show={dropdownOpen}
                        enter="transition ease-out duration-200 transform"
                        enterStart="opacity-0 -translate-y-2"
                        enterEnd="opacity-100 translate-y-0"
                        leave="transition ease-out duration-200"
                        leaveStart="opacity-100"
                        leaveEnd="opacity-0"
                    >
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                        >
                            {/* User Info Section */}
                            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 border-gray-700/60">
                                <div className="font-bold text-gray-200">
                                    {isAnonymous ? "زائر" : user?.name || "المستخدم"}
                                </div>
                                <div className="text-xs text-gray-400 italic">
                                    {isAnonymous ? "" : user.role == "ADMIN" ? "أدمن" : user.role == "EDITOR"? "مُعدل": "مستخدم"}
                                </div>
                            </div>

                            {/* Dropdown Items */}
                            <ul>
                                {!isAnonymous && (
                                    <>
                                        <li>
                                            <Link
                                                to={"/profile"}
                                                className="font-medium text-sm text-violet-400 flex items-center py-1 px-3"
                                            >
                                                الصفحة الشخصية
                                            </Link>
                                        </li>
                                        {user.role == AppRole.ADMIN && 
                                         <li>
                                         <Link
                                             to={"/users"}
                                             className="font-medium text-sm text-violet-400 flex items-center py-1 px-3"
                                         >المستخدمين</Link>
                                     </li>
                                        }
                                        <li className="mt-7">
                                            <button
                                                onClick={logout}
                                                className="font-medium text-sm text-violet-400 flex items-center py-1 px-3"
                                            >
                                                تسجيل الخروج
                                            </button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
