import { getImageURL } from '@/lib/aws-s3';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {
    notesContainrWidth: number;
    drawing: string
}

const NoteInDrawing = ({notesContainrWidth, drawing}: Props) => {
    const { data: drawingURL, isLoading, error } = useQuery(
        ['drawingURL', drawing], 
        async () => {
            if (!drawing) return null;
            const response = await getImageURL(drawing);
            return response;
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error:  </div>;
  return (
    <div className={`w-full bg-white rounded-tr-md`} style={{height: `${notesContainrWidth}px`}}>
        {drawingURL && 
            <Image src={drawingURL} alt={drawing} width={500} height={500} className='w-full h-full object-contain'/>
        }
    </div>
  )
}

export default NoteInDrawing