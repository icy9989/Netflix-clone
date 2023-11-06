"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image'
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

import NavbarItem from './navbarItem'
import MobileMenu from './mobileMenu';
import AccountMenu from './accountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {

    const [ showMobileMenu, setShowMobileMenu ] = useState(false);
    const [ showAccountMenu, setShowAccountMenu ] = useState(false);
    const [ showBackground, setShowBackground ] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } 
            else {
                setShowBackground(false);
            }
        }
        
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.addEventListener("scroll", handleScroll);
        }

    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    },[]);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    },[]);

  return (
    <nav className='w-full fixed z-40'>
        <div 
            className={`px-4 md:px-16 py-6 flex justify-center items-center duration-500
                ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}
            `}
        >
            <div className='flex flex-row items-center'>
                <Image
                    src="/images/logo.png"
                    alt='logo'
                    width="100"
                    height="30"
                    className='m-3'
                />
                <div className='lg:flex flex-row items-center gap-7 ml-8 hidden'>
                    <NavbarItem label='Home' active />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div
                    onClick={toggleMobileMenu} 
                    className='flex lg:hidden mx-3 items-center cursor-pointer relative'
                >
                    <p className='text-white text-sm'>Browse</p>
                    <div className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}>
                        <BiChevronDown size={20} />
                    </div>
                    <MobileMenu visible={showMobileMenu} />
                </div>
            </div>
            <div className='ml-auto flex flex-row items-center gap-5'>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <AiOutlineSearch size={20} />
                </div>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <AiOutlineBell size={20} />
                </div>
                <div
                    onClick={toggleAccountMenu} 
                    className='flex flex-row items-center cursor-pointer relative'
                >
                    <Image
                        src="/images/default-blue.png"
                        alt='profile' 
                        width="35"
                        height="35"
                        className='object-cover rounded-md'
                    />
                    <div className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}>
                        <BiChevronDown size={25} />
                    </div>
                    <AccountMenu visible={showAccountMenu} />
                </div>
            </div>
        </div>
    </nav>
    
  )
}

export default Navbar