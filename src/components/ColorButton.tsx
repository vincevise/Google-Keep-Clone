import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { PopoverTrigger } from './ui/popover'
import { MdOutlineColorLens, MdOutlineFormatColorReset } from 'react-icons/md'
import { Button } from './ui/button'
import { bgcolor } from '@/lib/ui'
const ColorButtonStyle = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center'
type Props = {
    note: Note,
    notesActionRef: any
}

export default function ColorButton({ note, notesActionRef }: Props) {

    const ctx = api.useUtils();
    const [openColor, setOpenColor] = useState(false);
    const { mutate: archiveNote } = api.note.archiveNote.useMutation({
        onSuccess: () => {
            void ctx.note.getNotes.invalidate()
        }
    })

    const { mutate: deleteNote } = api.note.deleteNote.useMutation({
        onSuccess: () => {
            void ctx.note.getNotes.invalidate()
        }
    })

    const { mutate } = api.note.changeNoteColor.useMutation(
        {
            onSuccess: () => {
                void ctx.note.getNotes.invalidate();

            }
        }
    )

    const handleChangeColor = (e:any) => {
        e.stopPropagation(); // Prevent the event from bubbling up
        const color = e.currentTarget.dataset.color;
        mutate({id: note.id, backgroundColor: color ?? ''});
    };

    useEffect(() => {
        // Function to check if click is outside of the dropdown
        const handleClickOutside = (event: any) => {
            if (openColor && notesActionRef.current && !notesActionRef.current.contains(event.target)) {
                setOpenColor(false);
            }
        };

        // Add event listener when `openColor` is true
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openColor, notesActionRef]);

    
 


    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  group-hover:opacity-100 opacity-0 ' onClick={(e) => {
                            e.stopPropagation()
                            setOpenColor(!openColor)
                            // console.log(clickOutsideRef.current, 'clickOutsideRef')
                        } }>
                        <MdOutlineColorLens className='w-5 h-5' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent >
                    <p>Background options</p>
                </TooltipContent>
            </Tooltip>
            {

                openColor && <div className='absolute w-fit left-0 -bottom-[54px] bg-white border p-2 rounded-md drop-shadow-md' 
                ref={(ref)=>{
                    notesActionRef.current=ref;
                }}>
                    <div className='flex items-center gap-2'>
                        <button
                            data-color=''
                            className={ColorButtonStyle}
                            onClick={(e)=>{
                                handleChangeColor(e)
                            }}
                            style={{ background: 'transparent' }}
                        >
                            <MdOutlineFormatColorReset className='w-4 h-4' />
                        </button>
                        <button
                            data-color={bgcolor.YELLOW}
                            className={ColorButtonStyle}
                            onClick={handleChangeColor} style={{ background: bgcolor.YELLOW }}>

                        </button>
                        <button
                            data-color={bgcolor.RED}
                            className={ColorButtonStyle}
                            onClick={handleChangeColor} style={{ background: bgcolor.RED }}>
                        </button>
                        <button
                            data-color={bgcolor.BLUR}
                            className={ColorButtonStyle}
                            onClick={handleChangeColor} style={{ background: bgcolor.BLUR }}>
                        </button>
                    </div>

                </div>
            }
        </>
    )
}
