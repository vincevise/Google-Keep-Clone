import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import { Poppins } from 'next/font/google'
import { MouseEvent } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdOutlineArchive } from 'react-icons/md'
import ColorButton from './ColorButton'
import LabelButton from './LabelButton'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const poppins = Poppins({
    subsets: ["latin"],
    weight: '300',
    variable: "--font-poppins",
})


type Props = {
    note: Note,
    notesActionRef:any
}

const BottomNavbar = ({note, notesActionRef}: Props) => {

    const ctx = api.useUtils()
    const {mutate:archiveNote} = api.note.archiveNote.useMutation({
        onSuccess:()=>{
            void ctx.note.getNotes.invalidate()
        }
    }) 

    const { mutate: deleteNote} = api.note.deleteNote.useMutation({
        onSuccess:()=>{
            void ctx.note.getNotes.invalidate()
        }
    })

    const {mutate} = api.note.changeNoteColor.useMutation(
        {
            onSuccess: () => {
                void ctx.note.getNotes.invalidate();
               
            }
        }
    )

    const handleChangeColor = (e:MouseEvent<HTMLButtonElement>) => {
        const color = e.currentTarget.dataset.color
        mutate({id: note.id, backgroundColor:color ?? ''})
        // setEditNote({...note, backgroundColor:color ?? ''})
    }

    return (
        <div className="mb-1 px-1">
            <div className={` flex  gap-2    font-sans  `} >
                {/* Color Button */}
                <ColorButton note={ note} notesActionRef={notesActionRef}/>

                <LabelButton note={ note} notesActionRef={notesActionRef}/>

               

                {/* Archive button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  group-hover:opacity-100 opacity-0' 
                        onClick={(e) => {
                            e.stopPropagation()
                            archiveNote({
                                archived: !note.archived,
                                id: note.id
                            })
                        }}>
                            <MdOutlineArchive className='w-5 h-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Archive</p>
                    </TooltipContent>
                </Tooltip>


                {/* Delete button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  group-hover:opacity-100 opacity-0' 
                        onClick={(e) => {
                            e.stopPropagation()
                            deleteNote({
                                noteid: note.id
                            })
                        }}
                        >
                            <FaTrash className='w-4 h-4' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete</p>
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>
    )
}

export default BottomNavbar