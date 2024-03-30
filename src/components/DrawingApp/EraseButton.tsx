import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { FaEraser } from "react-icons/fa"
import { HiPencil } from "react-icons/hi2"
import { MdArrowDropDown } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

type Props = {
    setisErasing:Dispatch<SetStateAction<boolean>>,
    stroke: any
    setStroke:Dispatch<SetStateAction<any>>,
    clearCanvas:()=>void
}

export function EraseButton({setisErasing, stroke, setStroke, clearCanvas}:Props) {

    

  return (
    <DropdownMenu>
        <div className="flex group items-center h-8">
            <button className='p-1.5 border-y border-l border-white group-hover:border-gray-200 h-full'
                onClick={()=>{
                        setisErasing(true);
                    }} >
                <FaEraser 
                    className='w-4 h-4 text-gray-600' 
                    
                />
            </button>
            <DropdownMenuTrigger   asChild className="h-full">
                <button className='py-2 px-0.5 border border-white h-full group-hover:border-gray-200 active:bg-gray-200' >
                        <MdArrowDropDown 
                            className='w-4 h-4 text-gray-600' 
                            onClick={()=>{
                                setisErasing(true);
                            }}
                        />
                </button>
            </DropdownMenuTrigger>
        </div>

      <DropdownMenuContent  className="w-12 bg-white">
            <Button size={'sm'} className="w-full" variant={'ghost'} onClick={()=>clearCanvas()}>
                Clear Page
            </Button>
      </DropdownMenuContent >
    </DropdownMenu>
  )
}