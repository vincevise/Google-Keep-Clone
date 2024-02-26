import { api } from '@/utils/api'
import { Tag } from '@prisma/client'
import React, { useRef } from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
    tag: Tag,
    noteId?:number
}

const Tags = ({tag, noteId}: Props) => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const ctx = api.useUtils();
    const { mutate: removeTags } = api.label.unlinkTagsToNote.useMutation({
        onSuccess: () => {
            void ctx.label.getNotesTags.invalidate()
        }
    });
    return (
        <span
            className='bg-gray-100/50 rounded-full cursor-pointer py-0.5 px-2 text-xs relative flex items-center group w-fit'
            key={`tag_key_${tag.id}`}
            onMouseOver={()=>{
                if(closeRef.current){
                        closeRef.current.style.display = 'block'
                }
            }}
            onMouseLeave={()=>{
                console.log('mouse leave')
                if(closeRef.current){
                        closeRef.current.style.display = 'none'
                }
            }}
            
            >
            <span>
                {tag.name}
            </span>
            <button
                onClick={() => {
                    if(noteId){
                        removeTags({
                            noteId: noteId,
                            tagId: tag.id
                        })
                    }
                }}
                className='absolute right-1 bg-gray-50 rounded-full p-0.5 hidden' 
                ref={closeRef} ><MdClose /></button>
        </span>
    )
}

export default Tags