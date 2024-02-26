import { fontSans } from '@/pages'
import { useUser } from '@clerk/nextjs'
import React, { Dispatch, SetStateAction } from 'react'
import { FaHamburger, FaRegStickyNote } from 'react-icons/fa'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { RxHamburgerMenu } from "react-icons/rx";
import { PiMagnifyingGlass } from 'react-icons/pi'

type Props = {
    setOpenSideBar:Dispatch<SetStateAction<boolean>>
}

const NavBar = ({setOpenSideBar}: Props) => {
    const user = useUser()
    return (
        <header className={` h-16 flex bg-background border-b drop-shadow-sm items-center justify-between pl-3 pr-4 fixed top-0 left-0 w-full z-20  `}>
            <div className='flex items-center gap-2'>
                <button 
                    className='rounded-full bg-gray-50 w-12 h-12 flex items-center justify-center' 
                    onClick={()=>setOpenSideBar((prev)=>!prev)}>
                    <RxHamburgerMenu className='w-6 h-6' />
                </button>
                <FaRegStickyNote className="w-8 h-8" />
            </div>
            <div className='relative flex items-center w-1/2'>
                <PiMagnifyingGlass className='absolute left-4 w-5 h-5 text-gray-700'/>
                <input type="text" className='w-full bg-gray-100 h-10 outline-none rounded-md px-10 focus:drop-shadow-md focus:bg-white border  ' />
            </div>
            <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                    <Avatar className=' '>
                        <AvatarImage src={user.user?.imageUrl} alt="@shadcn" className="cursor-pointer" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger >
                <DropdownMenuContent className={`w-30  ${fontSans.variable}`}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </DropdownMenuContent >
            </DropdownMenu>

        </header>
    )
}

export default NavBar