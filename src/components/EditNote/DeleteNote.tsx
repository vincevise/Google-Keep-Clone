import React, { Dispatch, SetStateAction } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { MdDelete, MdOutlineArchive } from 'react-icons/md'
import { api } from '@/utils/api'
import { Note } from '@prisma/client'

type Props = {
    note: Note,
    setOpenNote:Dispatch<SetStateAction<any>>
}

const DeleteNote = ({note, setOpenNote}: Props) => {
    const ctx = api.useUtils();
     

    const {mutate:deleteNote} = api.note.deleteNote.useMutation({
        onSuccess:()=> {
            void ctx.note.getNotes.invalidate()
            setOpenNote(null)
        }
    })
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size={'icon'} 
                    className='rounded-full text-gray-600 hover:text-black  ' 
                    onClick={(e) => e.stopPropagation()} 
                    onMouseDown={()=>{deleteNote({noteid:note.id}) }}>
                    <MdDelete className='w-5 h-5' />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Delete</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default DeleteNote