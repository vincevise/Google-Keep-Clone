import { Note, Tag } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button';
import { MdOutlineArchive, MdOutlineColorLens, MdOutlineNewLabel } from 'react-icons/md';
import { BsFillPinFill, BsPin } from 'react-icons/bs';
import { api } from '@/utils/api';
import Tags from './Tags';
import BottomNavbar1 from './NotesOptionsComp/BottomNavbar1';

export const initialNote = {
    title:'', 
    description:'',
    archived:false,
    backgroundColor:'',
    pinned: false
}
type Props = {
    tag?:Tag
}


const CreateNote = ({tag}: Props) => {
    const [openCreateNote, setOpenCreateNote] = useState(false);
    const noteCreationRef = useRef<HTMLDivElement>(null); // Ref for the note creation div
    const [note, setNote] = useState<
    Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned' >
    >(initialNote);

    const ctx = api.useUtils();

    const {mutate:linkTagsToNote} = api.label.linkTagsToNote.useMutation({
        onSuccess:()=>{
            void ctx.label.getNotesForTag.invalidate()
        }
    })

    const {mutate} = api.note.createNote.useMutation({
        onSuccess: (note) => {
            setOpenCreateNote(false);
            setNote(initialNote);
            if(tag){
                linkTagsToNote({noteId: note.id, tagId: tag.id})
            }

            void ctx.note.getNotes.invalidate();
        },
    })



    const handleCreateNote = async() => {
        
        mutate({
            ...note,
            description:note.description!, 
            backgroundColor:note.backgroundColor!, 
        })
    }

     // Click outside handler
     useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (noteCreationRef.current && !noteCreationRef.current.contains(event.target as Node)) {
                handleClose(); // Close the note creation form if click is outside
            }
        }

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Remove event listeners on cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [noteCreationRef]);

   

    const handleClose = () => {
        if(note.title.trim().length === 0 && note.description!.trim().length === 0 ){
            setOpenCreateNote(false)
            setNote(initialNote)
        }else{
            handleCreateNote()
        }
    }
  return (
    <div className='py-3 px-4 drop-shadow-md   border bg-white w-full max-w-lg rounded-lg mx-auto relative' >
            {openCreateNote ? 
                <div ref={noteCreationRef} >
                    <Button variant="ghost" size={'icon'} className='rounded-full absolute right-2 top-2 group' onClick={()=>setNote({...note, pinned: !note.pinned})}>
                        {note.pinned ? 
                            <BsFillPinFill className='w-5 h-5 text-gray-600 group-hover:text-black' />
                         : 
                            <BsPin   className='w-5 h-5 text-gray-600 group-hover:text-black' />
                         }
                            </Button>
                    <input 
                        type="text" 
                        className='block w-full outline-none' 
                        placeholder='Title' 
                        onChange={(e)=>{
                            setNote({...note, title: e.target.value})
                        }}
                    />
                    <textarea 
                        className='text-sm block w-full mt-4 outline-none resize-none'
                        placeholder='Take a note...'
                        onChange={(e)=>{
                            setNote({...note, description: e.target.value})
                        }}
                    />
                    {tag && <Tags   tag={tag}/>}
                    <div className='mt-2 flex justify-between items-center'>
                        <BottomNavbar1 editNote={note} setEditNote={setNote} />
                        <Button variant="ghost"  className='rounded-md' onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </div > 
                : <div onClick={()=>setOpenCreateNote(true)} className='cursor-text	'>Take a note...</div>
            }
            
        </div>
  )
}

export default CreateNote