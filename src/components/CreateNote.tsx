import { api } from '@/utils/api';
import { Note, Tag } from '@prisma/client';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { BsFillPinFill, BsPin } from 'react-icons/bs';
import BottomBarCreate from './BottomBarCreate';
import TagCreate from './TagCreate';
import { Button } from './ui/button';

export const initialNote = {
    title: '',
    description: '',
    archived: false,
    backgroundColor: '',
    pinned: false
}
type Props = {
    tag?: Tag
}


const CreateNote = ({ tag }: Props) => {
    const [openCreateNote, setOpenCreateNote] = useState(false);
    const [note, setNote] = useState<
        Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned'>
    >(initialNote);

    const [tags, setTags] = useState<Tag[]>(tag ? [tag] : [])

    const { setTheme, theme } = useTheme()

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const ctx = api.useUtils();

    const { mutate: linkTagsToNote } = api.label.linkTagsToNote.useMutation({
        onSuccess: () => {
            void ctx.label.getNotesForTag.invalidate()
        }
    })

    const { mutate } = api.note.createNote.useMutation({
        onSuccess: (note) => {
            setOpenCreateNote(false);
            setNote(initialNote);
            if(tags.length > 0){
                tags.forEach((x)=>{
                    linkTagsToNote({ noteId: note.id, tagId: x.id })
                })
            }
            // if (tag) {
            //     linkTagsToNote({ noteId: note.id, tagId: tag.id })
            // }

            void ctx.note.getNotes.invalidate();
        },
    })

    useEffect(() => {
        if (openCreateNote) {
            textAreaRef.current?.focus();
        }
    }, [openCreateNote]);

    const handleCreateNote = async () => {

        mutate({
            ...note,
            description: note.description!,
            backgroundColor: note.backgroundColor!,
        })
    }

    const handleClose = () => {
        if (note.title.trim().length === 0 && note.description!.trim().length === 0) {
            setOpenCreateNote(false)
            setNote(initialNote)
            setTags([])
        } else {
            handleCreateNote()
        }
    }
    return (
        <>
            {
                openCreateNote &&
                <div className='w-screen h-screen bg-black/20 fixed inset-0 z-20' 
                onClick={() => {
                    setOpenCreateNote(false);
                    setNote({...note, backgroundColor:''})
                }} 
                />
            }
            <div className={`py-3 px-4 shadow-md   border   w-full max-w-lg rounded-lg mx-auto relative 
                ${openCreateNote && 'z-30'}
                bg-background `} 
                style={{background:`${note.backgroundColor}`}}
            >
                {openCreateNote ?
                    <div  >
                        <Button variant="ghost" size={'icon'} className='rounded-full absolute right-2 top-2 group' onClick={() => setNote({ ...note, pinned: !note.pinned })}>
                            {note.pinned ?
                                <BsFillPinFill className='w-5 h-5 text-gray-600 group-hover:text-black' />
                                :
                                <BsPin className='w-5 h-5 text-gray-600 group-hover:text-black' />
                            }
                        </Button>
                        <input
                            type="text"
                            className='block w-full outline-none bg-transparent'
                            placeholder='Title'
                            onChange={(e) => {
                                setNote({ ...note, title: e.target.value })
                            }}
                        />
                        <textarea
                            className='text-sm block w-full mt-4 outline-none bg-transparent resize-none'
                            placeholder='Take a note...'
                            onChange={(e) => {
                                setNote({ ...note, description: e.target.value })
                            }}
                            ref={textAreaRef}
                        />
                        {/* {tag && <Tags tag={tag} />} */}
                        <div className='flex items-center gap-2 flex-wrap'>
                            {tags.length > 0 && tags.map((x)=>{
                                return (<TagCreate tag={x} setTags={setTags}/>)
                            })}
                        </div>
                        
                        <div className='mt-2 flex justify-between items-center'>
                            <BottomBarCreate 
                                note={note} 
                                setNote={setNote}
                                tags={tags}
                                setTags={setTags}  
                            />
                            <Button variant="ghost" className='rounded-md' onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div >
                    : <div onClick={() => { setOpenCreateNote(true); textAreaRef.current?.focus() }} className='cursor-text	'>Take a note...</div>
                }

            </div>
        </>
    )
}

export default CreateNote