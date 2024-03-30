import { fontSans } from '@/pages'
import { SignOutButton, useUser } from '@clerk/nextjs'
import React, { Dispatch, SetStateAction } from 'react'
import { FaHamburger, FaRegStickyNote } from 'react-icons/fa'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { RxHamburgerMenu } from "react-icons/rx";
import { PiMagnifyingGlass } from 'react-icons/pi'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { BsUiChecksGrid } from 'react-icons/bs';
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { useGrid } from '../Layout/AppLayout'
import {Oval} from 'react-loader-spinner'

type Props = {
    setOpenSideBar: Dispatch<SetStateAction<boolean>>
}

const NavBar = ({ setOpenSideBar }: Props) => {
    const user = useUser()
    const { setTheme, theme } = useTheme()
    const {isGrid, setIsGrid } = useGrid()
    return (
        <header className={` h-16 flex bg-background border-b ${theme==='dark' ? 'border-white' : 'border-gray-600'}  drop-shadow-sm items-center justify-between pl-3 pr-4 fixed top-0 left-0 w-full z-20  `}>
            <div className='flex items-center gap-2'>
                <button
                    className='rounded-full er:bg-white/20 w-12 h-12 flex items-center justify-center'
                    onClick={() => setOpenSideBar((prev) => !prev)}>
                    <RxHamburgerMenu className='w-6 h-6' />
                </button>
                <BsUiChecksGrid  className="w-6 h-6" />
            </div>
            <div className='relative flex items-center w-1/2'>
                <PiMagnifyingGlass className='absolute left-4 w-5 h-5 ' />
                <input type="text" className={`w-full  h-10 outline-none rounded-lg px-10 focus:drop-shadow-md bg-background_secondary border border-gray-600 ${theme==='dark' ? 'border-white' : 'border-gray-600'} `} />
            </div>
            <div className='flex items-center gap-4'>
                {/* {loading && 
                    <Oval
                        visible={true}
                        height="25"
                        width="25"
                        color="#0c0c0c"
                        secondaryColor='gray'
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        strokeWidth={'5'}
                    />
                } */}
                {/* <button onClick={()=>setIsGrid(!isGrid)}  className='cursor-pointer rounded-full hover:bg-white/20 p-2'>
                    {isGrid ? 
                        <CiGrid41 className={`w-6 h-6 ${theme==='dark' ? 'text-white' : 'text-black'}`} />
                        :
                        <CiGrid2H className={`w-6 h-6 ${theme==='dark' ? 'text-white' : 'text-black'}`}/> 
                    }
                </button> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className={`rounded-full border ${theme==='dark' ? 'border-white' : 'border-gray-600'} `}>
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{boxShadow: '3px 3px 1px 1px #0c0c0c' }}>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu  >
                    <DropdownMenuTrigger asChild>
                        <Avatar className=' '>
                            <AvatarImage src={user.user?.imageUrl} alt="@shadcn" className="cursor-pointer" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger >
                    <DropdownMenuContent className={`w-30  ${fontSans.variable}`}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuLabel><SignOutButton /></DropdownMenuLabel>
                    </DropdownMenuContent >
                </DropdownMenu>
                
            </div>

        </header>
    )
}

export default NavBar