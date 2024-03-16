import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

import GridLayout from "react-grid-layout";
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BsUiChecksGrid } from 'react-icons/bs';
import { Button } from './ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

const MyFirstGrid = () => {
    // Layout is an array of objects, see the demo for more complete usage
    const layout = [
        { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];



    return (
        <div className='w-full h-screen mx-auto overflow-hidden '>

            <GridLayout
                className="layout bg-background"
                layout={layout}
                cols={50}
                rowHeight={50}
                width={1200}
                compactType={'horizontal'}
                style={{ height: '100vh',width:'100vw' }}
                isResizable={false}
            >
                <div 
                    key="a" 
                    className='bg-[#fec347] rounded-lg   select-none border border-gray-400 hover:drop-shadow-lg flex group    w-full   transition-all'    data-grid={{ 
                        x: 1, 
                        y: 0, 
                        w: 10, 
                        h: 3, 
                    }}
                >
                     <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                                    <PiDotsSixVerticalBold className="w-6 h-6 text-black" />
                                </div>
                </div>
                <div 
                    key="b" 
                    data-grid={{ x: 1, y: 0, w: 10, h: 5 }}
                    className='bg-[#f26e56] rounded-lg   select-none border border-gray-400 hover:drop-shadow-lg flex group    w-full   transition-all'
                >
                    <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                                    <PiDotsSixVerticalBold className="w-6 h-6 text-black" />
                                </div>
                </div>
                <div 
                    key="c" 
                    data-grid={{ x: 1, y: 0, w: 10, h: 4 }}
                    className='bg-[#5694f2] rounded-lg   select-none border border-gray-400 hover:drop-shadow-lg flex group    w-full   transition-all'
                >
                    <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                                    <PiDotsSixVerticalBold className="w-6 h-6 text-black" />
                                </div>
                </div>
 
                <div className='bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg   select-none border border-gray-400 hover:drop-shadow-lg flex group    w-full   transition-all' key={'d'} data-grid={{x:10, y:2, w:27, h:6}}>
                    <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                        <PiDotsSixVerticalBold className="w-6 h-6 text-black" />
                    </div>
                    <div className=' px-2 py-4     w-full  flex items-center  ' onMouseDown={(e) => e.stopPropagation()}>
                        <div className='w-full flex flex-col gap-4 p-6 items-start justify-center border-r border-white/40'>
                            <BsUiChecksGrid className='w-20 h-20' />
                            <h1 className='text-2xl font-medium'>Notes App</h1>
                            <p className='text-sm opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, mollitia veritatis id ratione voluptatibus quaerat nobis autem est iure consectetur!</p>
                        </div>
                        <div className='w-full h-full p-6 flex flex-col  items-center justify-between gap-3'>
                            <p className='text-xl text-left w-full'>Lets Gets Started</p>
                            <div className='w-full flex flex-col gap-2 '>
                                <Button variant={'default'} className='w-full'>
                                    <SignInButton >Sign in</SignInButton>
                                </Button>
                                <Button variant={'outline'} className='w-full'>
                                    <SignUpButton >Sign Up</SignUpButton>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </GridLayout>
        </div>
    );
};

export default MyFirstGrid;







{/* <div className={`absolute h-80 flex items-center max-w-3xl inset-x-0 mx-auto  top-1/2 border -translate-y-1/2 bg-gradient-to-r from-slate-900 to-slate-700 rounded-xl overflow-hidden group ${toggltBorder && 'ring-1 ring-foreground ring-offset-1'}`}>
<button className='h-80  flex flex-col justify-end items-center px-2 py-4 active bg-gray-100 cursor-grab' onMouseDown={(e)=>{  e.stopPropagation(); setToggleBorder(true)}}   onMouseUp={()=>setToggleBorder(false)}>
    <PiDotsSixVerticalBold className="w-8 h-8 text-gray-600" />
</button>
<div className=' px-2 py-4     w-full  flex items-center  '>
    <div className='w-full flex flex-col gap-4 p-6 items-start justify-center border-r border-white/40'>
        <BsUiChecksGrid className='w-20 h-20'/>
        <h1 className='text-2xl font-medium'>Notes App</h1>
        <p className='text-sm opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, mollitia veritatis id ratione voluptatibus quaerat nobis autem est iure consectetur!</p>
    </div>
    <div className='w-full h-full p-6 flex flex-col  items-center justify-between gap-3'>
        <p className='text-xl text-left w-full'>Lets Gets Started</p>
        <div className='w-full flex flex-col gap-2 '>
            <Button variant={'default'} className='w-full'>
                <SignInButton >Sign in</SignInButton>
            </Button>
            <Button variant={'outline'} className='w-full'>
                <SignUpButton >Sign Up</SignUpButton>
            </Button>
        </div>
    </div>
</div>
</div> */}
