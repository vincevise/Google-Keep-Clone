import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { BsPin, BsPinFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { initialNote } from './CreateNote'
import BottomNavbar1 from './NotesOptionsComp/BottomNavbar1'
import { Button } from './ui/button'

type Props = {
    modalStyle: {
        left: string,
        top: string,
        width: string,
        height: string,
        opacity: string,
        transition: string
    },
    openNote: Note | null,
    setOpenNote: Dispatch<SetStateAction<Note | null>>
}

const EditNoteModal = ({ modalStyle, openNote, setOpenNote }: Props) => {
    const [editNote, setEditNote] = useState<Note>({...initialNote, id:0, userId:''});

    const ctx = api.useUtils();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const {data: noteTags} = api.label.getNotesTags.useQuery({
        noteId:editNote.id
    }); 
    const {mutate: removeTags} = api.label.unlinkTagsToNote.useMutation({
        onSuccess:()=>{
            void ctx.label.getNotesTags.invalidate()
        }
    });

    useEffect(()=>{
        if(openNote){
            setEditNote(openNote)
        }
    },[openNote])

    useEffect(() => {
        if (textareaRef.current) {
          // Resetting the height to recalculate the height based on the content
          textareaRef.current.style.height = 'auto';
          // Setting the new height based on the scrollHeight
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
      }, [editNote, initialNote ,openNote]);

    console.log(editNote, 'editNote')

    return (
        <>
            <div className={`fixed ${openNote ? 'opacity-100' : 'opacity-0 pointer-events-none'}  transition-all w-screen h-screen top-0 left-0 z-30 bg-black/20 text-black`}
                onClick={()=>setOpenNote(null)}
            ></div>
            <div
                className=" text-black rounded-lg  z-30 "
                style={{ 
                    ...modalStyle, 
                    position: 'fixed', 
                }} 
                // Use 'fixed' to position relative to the viewport
            >
                {openNote &&
                    <div
                        key={openNote.id}
                        className={`   rounded-lg  select-none	  border border-gray-400  flex     w-full  overflow-hidden `}
                        style={{backgroundColor:(editNote.backgroundColor === '' ? 'white' : editNote.backgroundColor) ??  'white'}}
                    >


                        {/* Content */}
                        <div className={` pt-3  relative w-full h-full     flex flex-col justify-between `}

                        >
                            <button className='rounded-full absolute right-1 top-1    block hover:bg-gray-100 text-gray-600 hover:text-black p-2  ' onClick={(e) => e.stopPropagation()} >
                                {editNote.pinned ? 
                                <BsPinFill className='w-5 h-5'/> 
                                    :
                                <BsPin className='w-5  h-5   ' />
                                }
                            </button>
                            <div className="px-3">
                                <input 
                                    type="text" 
                                    className="font-medium bg-transparent text-lg w-full outline-none"
                                    value={editNote.title}
                                    onChange={(e)=> setEditNote({...editNote, title: e.target.value})}

                                />
                                <textarea 
                                    name="" 
                                    id=""
                                    className='text-base mt-4 text-gray-700 w-full outline-none resize-none bg-transparent'
                                    value={editNote.description!} 
                                    onChange={(e)=>{
                                        setEditNote({...editNote, description: e.target.value});
                                        e.target.style.height = 'auto';
    // Setting the new height based on the scrollHeight
    e.target.style.height = e.target.scrollHeight + 'px';
                                    }}

                                    ref={textareaRef}
                                />
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {noteTags?.map((tag)=>{
                                        return (<span 
                                            className='bg-gray-100/50 rounded-full cursor-pointer py-0.5 px-2 text-xs relative flex items-center group' 
                                            key={`tag_key_${tag.id}`}>
                                                <span>
                                                    {tag.name}
                                                </span>
                                                <button 
                                                    onClick={()=>{
                                                        removeTags({
                                                            noteId:editNote.id, 
                                                            tagId: tag.id
                                                        })
                                                    }} 
                                                    className='absolute right-1 bg-gray-50 rounded-full p-0.5 hidden group-hover:block'><MdClose/></button>
                                            </span>)
                                    })}
                                </div>
                            </div>
                            <div className="mb-1 mt-4 px-1">
                                <div className='  flex justify-between items-center'>
                                    <BottomNavbar1 
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                    />
                                    <Button variant="ghost" className='rounded-md' onClick={()=>setOpenNote(null)}  >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}

export default EditNoteModal