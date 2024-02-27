import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { MdOutlineColorLens, MdOutlineNewLabel, MdOutlineArchive, MdOutlineFormatColorReset } from 'react-icons/md'
 
import { fontSans } from '@/pages'
import { Poppins } from 'next/font/google'
import { bgcolor } from '@/lib/ui'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Note } from '@prisma/client'
import { api } from '@/utils/api'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import AddLabelMenu from './AddLabelMenu'
import ChangeColorMenu from '../ChangeColorMenu'

export const poppins = Poppins({
    subsets: ["latin"],
    weight: '300',
    variable: "--font-poppins",
})

 
function isNote(obj: any): obj is Note {
    return (
      typeof obj === "object" &&
      typeof obj.title === "string" &&
      typeof obj.content === "string"
    );
  }
  


type Props = {
    editNote: Note 
    setEditNote:Dispatch<SetStateAction<Note>>,
}

// THis is EditModal

const BottomNavbar1 = ({editNote, setEditNote   }: Props) => {
 
    return (
        <div className="mb-1 px-1">
            <div className={` flex  gap-2 group  font-sans  `}>
                {/* Color Button */}
            
                <ChangeColorMenu editNote={editNote} setEditNote={setEditNote}/>

                {/* Add label */}
                 <AddLabelMenu editNote={editNote}/>

                {/* Archive button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => e.stopPropagation()}>
                            <MdOutlineArchive className='w-5 h-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Archive</p>
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>
    )
}

export default BottomNavbar1