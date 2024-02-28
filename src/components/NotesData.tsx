import { api } from "@/utils/api";
import React, { useContext, useEffect, useRef, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { BsPin, BsPinFill } from "react-icons/bs";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import BottomNavbar from "./BottomNavbar";
import EditNoteModal from "./EditNoteModal";
import { Note } from "@prisma/client";
import NoteTagsSection from "./NoteTagsSection";
import { GridContext, useGrid } from "./Layout/AppLayout";


const ReactGridLayout = WidthProvider(RGL);

type Props = {
    className?: string,
    items?: number,
    rowHeight?: number,
    onLayoutChange?: (layout: any) => void,
    notes:Note[]
}

const initModalStyle = {
    left: '0',
    top: '0',
    width: '0',
    height: '0',
    opacity: '0',
    transition: 'none',
}


const NatesData = ({
    className = "",
    items = 20,
    rowHeight = 30,
    onLayoutChange = () => { },
    notes}: Props) => {

    const [layout, setLayout] = useState<any[]>([]);
    const [openNote, setOpenNote] = useState<Note | null>(null);
    const noteRefs = useRef<any>([]);
    const [cols, setCols] = useState(4)
    const { isGrid} = useGrid();

    const notesActionRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(isGrid){
            setCols(4)
        }else{
            setCols(1)
        }
    },[isGrid])

    const ctx = api.useUtils();
    const { mutate, isSuccess } = api.note.updateNote.useMutation({
        onSuccess:( )=>{
       
            void ctx.note.getNotes.invalidate();
            void ctx.label.getNotesForTag.invalidate();
        }
    })

    const [noteStyle, setNoteStyle] = useState<{
        left: string,
        top: string,
        width: string,
        height: string,
    }>({
        left: '0',
        top: '0',
        width: '0',
        height: '0',
    });

    const [modalStyle, setModalStyle] = useState<{
        left: string,
        top: string,
        width: string,
        height: string,
        opacity: string,
        transition: string
    }>({
        left: '0',
        top: '0',
        width: '0',
        height: '0',
        opacity: '0',
        transition: 'none',
    });

    



    useEffect(() => {
        if (openNote) {
            setModalStyle((prevStyle) => ({
                ...prevStyle,
                opacity: '1',
                transition: 'opacity 0.5s ease',
            }));

            // Trigger the transition for width and centering after a delay
            const timer = setTimeout(() => {

                setModalStyle((prev: any) => {
                    return {
                        ...prev,
                        width: 600 , // New width
                        left: `calc(50% - 300px)`, // Center the modal
                        top: `calc(50% - ${Number(prev.height) / 2}px)`, // Adjust top to center vertically
                        height: 'fit-content',
                        transition: 'width 0.5s ease, left 0.5s ease, top 0.5s ease',
                    }
                })
            }, 200); // Adjust the delay here as needed

            return () => clearTimeout(timer);
        } else {
            setModalStyle((prevStyle) => ({
                ...prevStyle,
                ...noteStyle
            }));

            // Trigger the transition for width and centering after a delay
            const timer = setTimeout(() => {

                setModalStyle((prev: any) => {
                    return {
                        ...prev,
                        ...initModalStyle
                    }
                })
            }, 200); // Adjust the delay here as needed

            return () => clearTimeout(timer);
        }
    }, [openNote])

    


    // Handle layout change


    const handleClick = (index: number) => {
        const noteRef = noteRefs.current[index];
        if (noteRef && noteRef.current) {
            const { left, top, width, height } = noteRef.current.getBoundingClientRect();
            const absoluteLeft = left + window.scrollX;
            const absoluteTop = top + window.scrollX;
            setModalStyle({ ...modalStyle, left: absoluteLeft, top: absoluteTop, width, height })
            setNoteStyle({
                left: absoluteLeft, top: absoluteTop, width, height
            })
        }
    };

    const handleUpdate = (note: Note, action: 'pinned' | 'archived'  ) => {
        console.log(action, 'printing action')
        // mutate({id, pinned})
        const newNote = {...note}
        
        if(action==='pinned'){
            newNote.pinned = !note.pinned
            mutate({note:{...newNote, description:newNote.description ?? ''}})
        }
        
    }

   

    const handleLayoutChange = (layout: any) => {
        onLayoutChange(layout);
    };

    

    


    return (
        <div className="  w-full mx-auto">

        
            <ReactGridLayout
                layout={layout}
                onLayoutChange={handleLayoutChange}
                className={className}
                rowHeight={rowHeight}
                cols={cols}
                compactType={`${!isGrid ? 'vertical' : 'horizontal'}`}
                isResizable={false}
            >

                {notes && notes.map((note, index) => {
                    if (!noteRefs.current[index]) {
                        noteRefs.current[index] = React.createRef();
                    }

                    const height = (note.description?.length ?? 0) / 4 + note.title.length / 4

                        return (
                            <div
                                key={note.id}
                                className={` ${openNote?.id === note.id ? 'opacity-0' : 'opacity-100'}  rounded-lg   select-none	  border border-gray-400 hover:drop-shadow-lg flex group    w-full   transition-all`}
                                
                                data-grid={{ x: 0, y: 0, w: 1, h: height }}
                            >
    
                                {/* holder */}
                                <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                                    <PiDotsSixVerticalBold className="w-6" />
                                </div>
    
                                {/* Content */}
    
                                <div className={` pt-3  relative w-full h-full  rounded-r-lg  flex flex-col justify-between `}
                                     style={{backgroundColor:(note.backgroundColor === '' ? 'white' : note.backgroundColor) ??  'white'}}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    ref={noteRefs.current[index]}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (openNote?.id !== note.id) {
                                            // if(  !notesActionRef?.current?.contains(e.target as Node)){
                                                setOpenNote(note)
                                            // }
                                   
                                            console.log('logging')
                                            handleClick(index)
                                        }
                                    }}
                                >
                                    <button className={`rounded-full absolute right-1 top-1 ${!note.pinned && 'hidden'} group-hover:block hover:bg-gray-100 text-gray-600 hover:text-black p-2 group`} 
                                        onClick={(e) =>{
                                            e.stopPropagation()
                                            handleUpdate(note, 'pinned')
                                        }} 
                                    >
                                        {
                                            note.pinned ? 
                                            <BsPinFill className='w-5  h-5   '/> 
                                            :
                                            <BsPin className='w-5  h-5   ' />
                                        }   
                                    </button>
                                    <div className="px-3">
                                        <h2 className="font-medium text-lg">{note.title}</h2>
                                        <p className="text-base mt-4 text-gray-700">
                                            <textarea className="bg-transparent resize-none cursor-default	outline-none border-none" readOnly name="" id=""  value={note.description ?? ''}/>
                                        </p>
                                    </div>
                                    <NoteTagsSection note={note}/>
                                    <BottomNavbar note={note} notesActionRef={notesActionRef} />
                                </div>
    
    
                            </div>
                        )
                })}

            </ReactGridLayout>

           

                <EditNoteModal
                    modalStyle={modalStyle}
                    openNote={openNote}
                    setOpenNote={setOpenNote}
                />


        </div>
    );
};

export default NatesData;
