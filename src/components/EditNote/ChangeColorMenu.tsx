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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useGrid } from '../Layout/AppLayout'

type Props = {
    editNote: Note,
    setEditNote?: Dispatch<SetStateAction<Note>>
}

const ColorButton = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center cursor-pointer'

function conformsToInterface(obj: any, intf: any) {
    for (let prop in intf) {
        if (!(prop in obj)) {
            return false;
        }
    }
    return true;
}

 

const ChangeColorMenu = ({ editNote, setEditNote }: Props) => {
    const ctx = api.useUtils();
    const {loading} = useGrid()

    const { mutate, isLoading } = api.note.changeNoteColor.useMutation(
        {
            onSuccess: () => {
                void ctx.note.getNotes.invalidate();

            }
        }
    )

    const handleChangeColor = (e: MouseEvent<any>) => {
        const color = e.currentTarget.dataset.color
        mutate({ id: editNote.id, backgroundColor: color ?? '' })
        if(setEditNote){
            setEditNote({ ...editNote, backgroundColor: color ?? '' })
        }
    }


    return (
        <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' >
                            <MdOutlineColorLens className='w-5 h-5' />
                        </Button>
                    </DropdownMenuTrigger>
                    {/* <p>Background options</p> */}

            <DropdownMenuContent className={`w-fit  font-sans flex items-center gap-2 p-2`} onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem
                            data-color=''
                            className={ColorButton}
                            onMouseDown={handleChangeColor}
                            style={{ background: 'transparent' }}
                        >
                            <MdOutlineFormatColorReset className='w-4 h-4' />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            data-color={bgcolor.YELLOW}
                            className={ColorButton}
                            onMouseDown={handleChangeColor} style={{ background: bgcolor.YELLOW }}>

                        </DropdownMenuItem>
                        <DropdownMenuItem
                            data-color={bgcolor.RED}
                            className={ColorButton}
                            onMouseDown={handleChangeColor} style={{ background: bgcolor.RED }}>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            data-color={bgcolor.BLUR}
                            className={ColorButton}
                            onMouseDown={handleChangeColor} style={{ background: bgcolor.BLUR }}>
                        </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ChangeColorMenu