import React from 'react'
import { BsPinFill, BsThreeDotsVertical } from 'react-icons/bs'
import { PiDotsSixVerticalBold } from 'react-icons/pi'
import { Button } from './ui/button'
import { MdOutlineArchive, MdOutlineColorLens, MdOutlineNewLabel } from 'react-icons/md'

type Props = {}

const LoadingPage = (props: Props) => {
  return (
    <div className='bg-white text-black w-screen h-screen flex items-center justify-center'>
        <div
            className={`  rounded-lg   select-none	  border border-gray-900 overflow-hidden hover:drop-shadow-lg flex group  text-black  w-full h-64 max-w-sm  transition-all`}
            
            style={{boxShadow: '3px 3px 1px 1px #0c0c0c' }}
        >

            {/* holder */}
            <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                <PiDotsSixVerticalBold className="w-6" />
            </div>

            {/* Content */}
            <div 
                className="w-full h-full rounded-r-md relative flex flex-col"      
                onMouseDown={(e) => e.stopPropagation()}
                >
                <button className={`rounded-full absolute right-1 top-1  group-hover:block hover:bg-gray-100 text-gray-600 hover:text-black z-10 p-2 group`} 
                           
                        > 
                                <BsPinFill className='w-5  h-5   '/> 
                          
                        </button>
                
                <div className={` pt-3  relative w-full h-full rounded-r-lg flex flex-col justify-between bg-white`}>
                    
                    <div className="px-3 h-fir">
                        <h2 className="font-medium text-lg">Loading...</h2>
                        <p className="text-base mt-4 text-gray-700">
                        gathering thoughts, organizing chaos, and preparing to transform your jumbled ideas into pure gold!" 📝💡
                        </p>
                    </div>
                    <div className="flex items-center p-1.5 gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' >
                            <MdOutlineColorLens className='w-5 h-5' />
                        </Button>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => e.stopPropagation()}>
                            <MdOutlineNewLabel className='w-5 h-5' />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size={'icon'} 
                            className='rounded-full text-gray-600 hover:text-black  ' 
                            onClick={(e) => e.stopPropagation()}  >
                            <MdOutlineArchive className='w-5 h-5' />
                        </Button>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black   '>
                            <BsThreeDotsVertical/>
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    </div>
  )
}

export default LoadingPage