import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { MdOutlineColorLens, MdOutlineNewLabel, MdOutlineArchive, MdOutlineFormatColorReset } from 'react-icons/md'

import { fontSans } from '@/pages'
import { Poppins } from 'next/font/google'
import { bgcolor } from '@/lib/ui'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Note } from '@prisma/client'
import { api } from '@/utils/api'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'

type Props = {
    editNote: Note,
    setEditNote: Dispatch<SetStateAction<Note>>
}

const ColorButton = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center'

function conformsToInterface(obj: any, intf: any) {
    for (let prop in intf) {
        if (!(prop in obj)) {
            return false;
        }
    }
    return true;
}

const NoteInterface: Note = {
    archived: true,
    backgroundColor: '',
    description: '',
    id: 1,
    pinned: true,
    title: '',
    userId: ''
}

const ChangeColorMenu = ({ editNote, setEditNote }: Props) => {
    const ctx = api.useUtils();


    const { mutate } = api.note.changeNoteColor.useMutation(
        {
            onSuccess: () => {
                void ctx.note.getNotes.invalidate();

            }
        }
    )
    const handleChangeColor = (e: MouseEvent<HTMLButtonElement>) => {
        const color = e.currentTarget.dataset.color
        mutate({ id: editNote.id, backgroundColor: color ?? '' })
        setEditNote({ ...editNote, backgroundColor: color ?? '' })
    }


    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => e.stopPropagation()}>
                            <MdOutlineColorLens className='w-5 h-5' />
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Background options</p>
                </TooltipContent>
            </Tooltip>

            <PopoverContent className={`w-fit  font-sans`}>
                <div>
                    <div className='flex items-center gap-2'>
                        <button
                            data-color=''
                            className={ColorButton}
                            onClick={handleChangeColor}
                            style={{ background: 'transparent' }}
                        >
                            <MdOutlineFormatColorReset className='w-4 h-4' />
                        </button>
                        <button
                            data-color={bgcolor.YELLOW}
                            className={ColorButton}
                            onClick={handleChangeColor} style={{ background: bgcolor.YELLOW }}>

                        </button>
                        <button
                            data-color={bgcolor.RED}
                            className={ColorButton}
                            onClick={handleChangeColor} style={{ background: bgcolor.RED }}>
                        </button>
                        <button
                            data-color={bgcolor.BLUR}
                            className={ColorButton}
                            onClick={handleChangeColor} style={{ background: bgcolor.BLUR }}>
                        </button>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ChangeColorMenu