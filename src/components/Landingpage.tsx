/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          rose: colors.rose,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'
import { Button } from './ui/button'
import { RedirectToSignIn, SignIn, SignInButton, SignUpButton, redirectToSignUp } from '@clerk/nextjs'
import { BsUiChecksGrid } from 'react-icons/bs'
import Image from 'next/image'
import { BiRightArrow, BiSolidRightArrow } from 'react-icons/bi'
import {IoMdArrowForward} from 'react-icons/io'
import { redirectToSignIn } from '@clerk/nextjs/server'
 

export default function Example() {
  return (
    <div className='w-screen  h-full bg-gradient-to-r from-slate-900 to-slate-700  '>
        <header className={` h-16 flex     drop-shadow-sm items-center justify-between p-4 fixed top-0 left-0 w-full z-20  `}>
            <div className='flex items-center gap-4'>
                 
                <BsUiChecksGrid  className="w-8 h-8" /> 
                {/* <span className='text-2xl font-medium'>Notes App</span> */}
            </div>
             
            <div className='flex gap-2 items-center'>
                <SignInButton>
                    <Button >
                        Sign In
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button variant={'outline'} onClick={()=>redirectToSignUp()}>
                        Sign Up
                    </Button>
                </SignUpButton>
            </div>
        </header>
        <main className='w-full h-full  pt-20 flex flex-col items-center '>
            <div className='w-full max-w-2xl text-center flex flex-col items-center mx-auto'>
                <div className='flex items-center mb-8 justify-start text-4xl gap-2'>
                <a href="#" className="inline-flex space-x-4">
                    <span className="rounded bg-gray-50 px-2.5 py-1 text-sm font-semibold text-gray-500">
                      What's new
                    </span>
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-gray-500">
                      <span>Just shipped version 0.1.0</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </a>
                </div>
                    <h1 className='font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-gray-400 to-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <p className='mt-8 mx-2 text-gray-100/50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere soluta blanditiis </p>
                <Button variant={'ghost'} size={'lg'} className='my-8 gap-2 border group border-slate-100 hover:bg-white hover:text-gray-900 rounded-lg'>Get Started <IoMdArrowForward  
                className='w-6 h-6 group-hover:translate-x-2 transition-all'/></Button>
            </div>
            <div className='relative   mt-4 w-full max-w-5xl mx-auto h-full'>
                <div className='w-full  h-full drop-shadow-2xl absolute bottom-0 rounded-t-3xl bg-red-100   ' style={{boxShadow: '0px 0px 30px 6px #ccc'}} >

                    <Image alt='Landing Page' width={2000} height={2000}  src={'/Screenshot (27).png'} className='w-full h-full object-cover object-top	rounded-t-3xl'/>
                </div>
            </div>
        </main>
    </div>
  )
}
