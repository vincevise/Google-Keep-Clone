import { Note } from '@prisma/client'
import React from 'react'

type Props = {
    data: Note
}

const Note = ({data}: Props) => {
    return (
        <div 
        // key={data.id} 
        className="bg-red-100 rounded-md p-2 " 
        data-grid={{x:0, y:0, w:1, h:4}}
    >
         
        <div className="w-full h-full bg-gray-50"   onClick={()=>console.log('click')}>

        </div>
    </div>
    )
}

export default Note