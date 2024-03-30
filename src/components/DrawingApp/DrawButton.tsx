import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { bgcolor } from "@/lib/ui"
import { Dispatch, SetStateAction } from "react"
import { HiPencil } from "react-icons/hi2"
import { MdArrowDropDown } from "react-icons/md";

type Props = {
    setisErasing:Dispatch<SetStateAction<boolean>>,
    stroke: {color:string, size: number};
    setStroke: Dispatch<SetStateAction<{color:string, size: number}>>
}


const colors = ['#fec347', '#f26e56', '#5694f2', 'black'];
const strokes = [1 ,10,20, 30]

export function DrawButton({setisErasing, stroke, setStroke}:Props) {
 
  return (
    <Popover>
        <div className="flex bg-white group items-center h-8">
            <button className='p-1.5 border-y border-l border-white group-hover:border-gray-200 h-full'
                onClick={()=>{
                        setisErasing(false);
                    }} >
                <HiPencil 
                    className='w-4 h-4 text-gray-600' 
                    
                />
            </button>
            <PopoverTrigger asChild className="h-full">
                <button className='py-2 px-0.5 border border-white h-full group-hover:border-gray-200 active:bg-gray-200' >
                        <MdArrowDropDown 
                            className='w-4 h-4 text-gray-600' 
                            onClick={()=>{
                                setisErasing(false);
                            }}
                        />
                </button>
            </PopoverTrigger>
        </div>

      <PopoverContent className="w-fit flex bg-white flex-col gap-4" >
        <div className="flex items-center gap-2 bg-white">
             
             {colors.map((x)=>{
                return (
                    <div key={`colors_key_${x}`} className="w-8 h-8 flex items-center justify-center">
                        <button className={`${stroke.color === x ? 'w-8 h-8' : 'w-5 h-5'} transition-all rounded-full `} style={{background:x}} onClick={()=>setStroke({...stroke, color:x})}></button>
                    </div>
                )
             })}
        </div>
        <div className="flex bg-white   items-center gap-2">
             
             {strokes.map((x)=>{
                return (
                    <button className={`w-8 h-8 border-2 rounded-full ${stroke.size===x ? 'border-black' : 'border-white'}  flex items-center justify-center`} onClick={()=>setStroke({...stroke, size:x})}>
                        <span className={`  transition-all rounded-full bg-black`} style={{width:x, height:x}}  ></span>
                    </button>
                )
             })}
        </div>
      </PopoverContent>
    </Popover>
  )
}