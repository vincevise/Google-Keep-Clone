import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { MdOutlineArchive } from 'react-icons/md'
import { api } from '@/utils/api'
import { Note } from '@prisma/client'

type Props = {
    note: Note
}

const ArchiveButton = ({note}: Props) => {
    const ctx = api.useUtils();
    const {mutate:archiveNote} = api.note.archiveNote.useMutation({
        onSuccess:()=> void ctx.note.getNotes.invalidate()
    })
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size={'icon'} 
                    className='rounded-full text-gray-600 hover:text-black  ' 
                    onClick={(e) => e.stopPropagation()} 
                    onMouseDown={()=>{archiveNote({id:note.id, archived:note.archived})}}>
                    <MdOutlineArchive className='w-5 h-5' />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Archive</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ArchiveButton