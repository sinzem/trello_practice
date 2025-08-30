"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { useClickAway } from "@uidotdev/usehooks";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

export const UserDropdown = () => {

    const [isDropdownOpened, setIsDropDownOpened] = useState(false);
    const dropdownClasses = clsx({
        hidden: !isDropdownOpened,
        'absolute top-8 right-0': true,
    });

    const toggleDropdown = () => {
        setIsDropDownOpened(!isDropdownOpened);
    }

    const dropdownRef = useClickAway<HTMLDivElement>((e) => { 
        const element = e.target as HTMLElement;

        if (element.closest("#user-menu-button")) return;
        setIsDropDownOpened(false);
    })

    return (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                <button 
                    type="button" 
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer" 
                    id="user-menu-button" 
                    aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
                    onClick={toggleDropdown}
                >
                    <span className="sr-only">Open user menu</span>
                    <Image 
                        src="/assets/old_man.jpg" 
                        alt="User photo" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 rounded-full"
                        id="user-avatar" 
                    />
                    {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" /> */}
                </button>
                
                <div className={twMerge(
                    `z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`,
                    dropdownClasses
                )} 
                    id="user-dropdown"
                    ref={dropdownRef}
                >
                    <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </li>
                    </ul>
                </div>
                {/* <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button> */}
            </div> 
    );
};

