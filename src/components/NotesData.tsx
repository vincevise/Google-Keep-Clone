import { api } from "@/utils/api";
import { Note } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { BsPin, BsPinFill } from "react-icons/bs";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import AddLabelMenu from "./EditNote/AddLabelMenu";
import ArchiveButton from "./EditNote/ArchiveButton";
import ChangeColorMenu from "./EditNote/ChangeColorMenu";
import EditNoteModal from "./EditNote/EditNoteModal";
import { useGrid } from "./Layout/AppLayout";
import CustomTextArea from "./SingleNote/CustomTextArea";
import NoteInDrawing from "./SingleNote/NoteInDrawing";
import NoteTagsSection from "./SingleNote/NoteTagsSection";
import { OptionButton } from "./SingleNote/OptionButton";


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
    const [cols, setCols] = useState(4);
    const { isGrid } = useGrid();

    useEffect(() => {
        const handleResize = () => {
        //   setScreenWidth(window.innerWidth);
            if(window.innerWidth <= 1024){
                if(isGrid){
                    setCols(2)
                }else{
                    setCols(1)
                }
            }else if(window.innerWidth < 768){
                if(isGrid){
                    setCols(2)
                }else{
                    setCols(1)
                }
            }else{
                if(isGrid){
                    setCols(4)
                }else{
                    setCols(1)
                }
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        // return () => {
        //   window.removeEventListener('resize', handleResize);
        // };
      }, [isGrid]);
 

    const ctx = api.useUtils();
    const { mutate, isSuccess, isLoading } = api.note.updateNote.useMutation({
        
        onSuccess:( )=>{      
            void ctx.note.getNotes.invalidate();
            void ctx.label.getNotesForTag.invalidate();
        }
    })


    

    const [notesContainrWidth, setNotesContainerWidth] = useState<number | null>(null)

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
                        top: `50%`, // Adjust top to center vertically
                        height: 'fit-content',
                        maxHeight:600,
                        transform: 'translateY(-50%)',
                        transition: 'width 0.5s ease, left 0.5s ease, height 0.5s ease',
                    }
                })
            }, 200); // Adjust the delay here as needed

            return () => clearTimeout(timer);
        } else {
            console.log(noteStyle, 'noteStyle')
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (notesContainerRef.current) {
                const { x, width } = notesContainerRef.current.getBoundingClientRect();
                setNotesContainerWidth(width)
            }
        }, 100); // Delay might need adjustment
    
        return () => clearTimeout(timeout);
    }, [layout]);
    


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
        // mutate({id, pinned})
        const newNote = {...note}
        
        if(action==='pinned'){
            newNote.pinned = !note.pinned
            mutate({note:{...newNote, description:newNote.description ?? '', title:''}})
        }
        
    }

   

    const handleLayoutChange = (layout: any) => {
        onLayoutChange(layout);
    };

    const notesContainerRef = useRef<HTMLDivElement>(null)
    console.log(cols, isGrid, 'cols')
    
    console.log(notesContainerRef.current?.getBoundingClientRect(), 'notesContainerRef')

    return (
        <div className={` w-full  mx-auto`} ref={notesContainerRef} >

        
            <ReactGridLayout
                layout={layout}
                onLayoutChange={handleLayoutChange}
                className={className}
                rowHeight={rowHeight}
                cols={4}
                compactType={`${!isGrid ? 'vertical' : 'horizontal'}`}
                isResizable={false} 
            >

                {notes && notes.map((note, index) => {
                    if (!noteRefs.current[index]) {
                        noteRefs.current[index] = React.createRef();
                    }

                    if(notesContainrWidth){
                        const noteWidth = notesContainrWidth/4 - 43;

                        const titleHeight = note.title ? Math.ceil(note.title.length*7 / noteWidth)*16 : 1; 
                        
                        const titleDescription = note.description ? Math.ceil(note.title!.length*7 / noteWidth)*16 : 0

                        const drawingHeight = note.drawing ? 50 : 0; 
                        
                        const notesHeight =  titleDescription + titleHeight + drawingHeight + 50
                        return (
                            <div
                                key={note.id}
                                className={` ${openNote?.id === note.id ? 'opacity-0' : 'opacity-100'}  rounded-lg   select-none	  border border-gray-900 overflow-hidden hover:drop-shadow-lg flex group  text-black  w-full   transition-all`}
                                
                                data-grid={{ x: 0, y: 0, w: 1, h: notesHeight/rowHeight*2 }}
                                style={{boxShadow: '3px 3px 1px 1px #0c0c0c' }}
                            >
    
                                {/* holder */}
                                <div className=" h-full px-0.5 flex flex-col justify-end py-4 bg-gray-100 rounded-l-md  cursor-move  ">
                                    <PiDotsSixVerticalBold className="w-6" />
                                </div>
    
                                {/* Content */}
                                <div 
                                    className="w-full h-full rounded-r-md relative flex flex-col"      
                                    ref={noteRefs.current[index]}  
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        console.log(e.target, 'e.target')
                                        if (openNote?.id !== note.id) {
                                            // if(  !notesActionRef?.current?.contains(e.target as Node)){
                                                setOpenNote(note)
                                            // }
                                
                                            console.log('logging')
                                            handleClick(index)
                                        }
                                    }}>
                                    <button className={`rounded-full absolute right-1 top-1 ${!note.pinned && 'hidden'} group-hover:block hover:bg-gray-100 text-gray-600 hover:text-black z-10 p-2 group`} 
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
                                        {note.drawing && 
                                            <NoteInDrawing drawing={note.drawing} notesContainrWidth={notesContainrWidth}/>
                                        }
                                    <div className={` pt-3  relative w-full h-full ${note.drawing ? 'rounded-br-lg' : 'rounded-r-lg'}   flex flex-col justify-between `}
                                        style={{backgroundColor:(note.backgroundColor === '' ? 'white' : note.backgroundColor) ??  'white'}}
                                       
                                    >
                                        
                                        <div className="px-3 h-fir">
                                            <h2 className="font-medium text-lg">{note.title}</h2>
                                            <p className="text-base mt-4 text-gray-700">
                                                <CustomTextArea content={note.description ?? ''}/>
                                            </p>
                                        </div>
                                        <NoteTagsSection note={note}/>
                                        <div className="flex items-center p-1.5 gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <ChangeColorMenu editNote={note}/> 
                                            <AddLabelMenu editNote={note}/> 
                                            <ArchiveButton note={note} /> 
                                            <OptionButton note={note}/> 
                                        </div>
                                    </div>
                                </div>
    
    
                            </div>
                        )
                    }
                     
                    
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
