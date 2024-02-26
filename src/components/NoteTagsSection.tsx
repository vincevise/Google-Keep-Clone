import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import React from 'react'
import { MdClose } from 'react-icons/md'
import Tags from './Tags'

type Props = {
    note: Note
}

const NoteTagsSection = ({ note }: Props) => {

    const ctx = api.useUtils()
    const { data: noteTags } = api.label.getNotesTags.useQuery({
        noteId: note.id
    });
    
    return (
        <div className='flex items-center gap-2 flex-wrap mt-2 px-2'  >
             
            {noteTags?.map((tag) => {
                return ( <Tags tag={tag} noteId={note.id} key={`tag_id_${tag.id}`}/>)
            })}
        </div>
    )
}

export default NoteTagsSection