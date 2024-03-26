import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../images/logo_200x200.png'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext, ShoppingDispatchCartContext, useShoppingCartContext } from '@/context/ShoppingCartContext';

function NavBar() {
    const [navBar, setNavBar] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    // const {cartAmount, cartItems} = useContext(ShoppingCartContext);
    const { state } = useShoppingCartContext();

    const handleNav = () => {
        setOpenNav(!openNav);
    }

    const closeNav = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        setOpenNav(false);
    }

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    useEffect(() => {

        return () => {

        }
    }, [])




    return (

        // <nav id='navBar' className='fixed w-full shadow-xl bg-white text-black'>
        //     <div className='bg-[#003d29] py-3 flex flex-row text-white justify-between px-8'>
        //         <div>+18761234567</div>
        //         <div>Ge 50% Off on Selected Items | <button onClick={() => { }}>Shop Now</button> </div>
        //         <div>Eng  Location</div>

        //     </div>
        //     {/* desktop nav */}
        //     <div className='flex flex-row justify-between px-10'>
        //         {/* others */}
        //         <div>
        //             <div
        //                 id='left-side'
        //                 className='flex justify-between items-center h-full px-4 2xl:px16 py-2'>
        //                 <Link href='/'>
        //                     <Image
        //                         src={Logo}
        //                         alt='Logo'
        //                         width={75}
        //                         height={75}
        //                         className=' border-orange-300 border border-opacity-50 rounded-3xl cursor-pointer'
        //                         priority
        //                     />
        //                 </Link>
        //                 <div id='right-side' className='hidden sm:flex'>
        //                     <ul id='menu-list' className='hidden sm:flex'>
        //                         <Link href="/">
        //                             <li className='ml-10 uppercase hover:border-b text-xl'>Deals</li>
        //                         </Link>

        //                         <Link href="">
        //                             <li className='ml-10 uppercase hover:border-b text-xl'>{`${"What's New"}`}</li>
        //                         </Link>

        //                         <Link href="">
        //                             <li className='ml-10 uppercase hover:border-b text-xl'>Delivery</li>
        //                         </Link>
        //                     </ul>
        //                 </div>
        //                 <div id='hamburger' onClick={handleNav} className='sm:hidden cursor-pointer pl-24'>
        //                     <Bars3Icon className='h-6 w-6' />
        //                 </div>
        //             </div>

        //         </div>
        //         {/* account | cart */}
        //         <div
        //             id='left-side'
        //             className='flex justify-between items-center px-4 2xl:px16 py-2'>
        //             <div id='right-side' className='hidden sm:flex '>
        //                 <ul id='menu-list' className='hidden sm:flex'>

        //                     <Link href="" className='px-8'>
        //                         <li className='ml-10 uppercase hover:border-b text-xl'>Account</li>
        //                     </Link>

        //                     <Link href="/shoppingCartPage">
        //                         {/* <li className='ml-10 uppercase hover:border-b text-xl'>Cart</li> */}
        //                         <span className="text-white-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2">
        //                             <ShoppingCartIcon className='h-6 w-6 uppercase hover:border-b text-xl' />  {state.cartItems?.length}
        //                         </span>
        //                     </Link>
        //                 </ul>
        //             </div>
        //             {/* <div id='hamburger' onClick={handleNav} className='sm:hidden cursor-pointer pl-24'>
        //                 <Bars3Icon className='h-6 w-6' />
        //             </div> */}
        //         </div>

        //     </div>
        //     {/* mobile nav */}
        //     <div id='mobile-menu'
        //         className=
        //         {
        //             openNav ?
        //                 `fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 overflow-auto`
        //                 :
        //                 `fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen`
        //         }>
        //         <div className='flex w-full items-center justify-end'>
        //             <div>
        //                 <XMarkIcon onClick={handleNav} className='h-6 w-6 ml-10 uppercase hover:border-b text-xl' />
        //             </div>
        //         </div>
        //         <div className='cursor-pointer ml-10'>
        //             <Link href='/'>
        //                 <Image
        //                     src={Logo}
        //                     alt='Logo'
        //                     width={75}
        //                     height={75}
        //                     className=' border-orange-300 border border-opacity-50 rounded-3xl cursor-pointer'
        //                     priority
        //                 />
        //             </Link>
        //         </div>
        //         <div className='flex-col py-4' onBlur={() => setOpenNav(false)}>
        //             <ul id='menu-list-mobile' className='justify-between'>

        //                 <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
        //                     <Link href="/" onClick={closeNav}>
        //                         Home
        //                     </Link>
        //                 </li>

        //                 <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
        //                     <Link href="" onClick={closeNav}>
        //                         Contact Us
        //                     </Link>
        //                 </li>

        //                 <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
        //                     <Link href="" onClick={closeNav}>
        //                         About
        //                     </Link>
        //                 </li>

        //                 <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
        //                     <Link href="/shoppingCartPage" onClick={closeNav}>
        //                         <ShoppingCartIcon className='h-6 w-6 uppercase hover:border-b text-xl' />
        //                     </Link>
        //                 </li>

        //             </ul>
        //         </div>
        //         <div className='flex'>
        //             <div className='w-5 h-5 ml-10' id='facebook-icon'>
        //                 <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        //             </div>
        //             <div className='w-5 h-5 ml-10' id='instagram-icon'>
        //                 <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
        //             </div>
        //             <div className='w-5 h-5 ml-10' id='twitter-icon'>
        //                 <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" /></svg>
        //             </div>
        //         </div>
        //     </div>
        // </nav>


        <nav className="fixed w-full shadow-xl bg-white text-black border-gray-200 dark:bg-gray-900">
            <div className='bg-[#003d29] py-3 flex flex-row text-white justify-between px-8'>
                <div>+18761234567</div>
                <div>Get 50% Off on Selected Items | <button onClick={() => { }}>Shop Now</button> </div>
                <div>Eng  Location</div>

            </div>
            {/* main navbar */}
            <div className="bg-white w-full flex flex-wrap items-center justify-between p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src={Logo}
                        alt='Logo'
                        width={75}
                        height={75}
                        className=' border-orange-300 border border-opacity-50 rounded-3xl cursor-pointer'
                        priority
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Items R Us</span>
                </a>
                <div className="flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse z-10">
                    <button onClick={toggleDropdown} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-2 my-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-20`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </li>
                        </ul>
                    </div>
                    <button  data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 borderbg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <a href="/" className="ml-10 uppercase hover:border-b text-xl cursor-pointer" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="ml-10 uppercase hover:border-b text-xl cursor-pointer">About</a>
                        </li>
                        <li>
                            <a href="#" className="ml-10 uppercase hover:border-b text-xl cursor-pointer">Services</a>
                        </li>
                        <li>
                            <a href="#" className="ml-10 uppercase hover:border-b text-xl cursor-pointer">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="ml-10 uppercase hover:border-b text-xl cursor-pointer">Contact</a>
                        </li>

                        <li>
                            <a href="/shoppingCartPage">
                                {/* <li className='ml-10 uppercase hover:border-b text-xl'>Cart</li> */}
                                <span className="text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2">
                                    <ShoppingCartIcon className='h-6 w-6 uppercase hover:border-b text-xl' />
                                </span>
                                <span className=" -mt-3 -ml-5 absolute  w-4 h-4 text-green-700 font-bold dark:border-gray-800 rounded-full">{state.cartItems?.length}</span>
                            </a>
                        </li>
                        {/* <li>
                            <div className="relative">
                                <a href="/shoppingCartPage" className="text-white-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2">
                                    <ShoppingCartIcon className='h-6 w-6 uppercase hover:border-b text-xl' />
                                </a>
                                <span className="-top-3 left-8 absolute  w-4 h-4 text-green-700 font-bold dark:border-gray-800 rounded-full">{state.cartItems?.length}</span>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default NavBar