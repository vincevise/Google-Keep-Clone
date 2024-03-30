import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import Link from 'next/link'
import { BiSolidPaint } from 'react-icons/bi'

type Props = {
    noteId?: any
}

const AddDrawingButton = ({noteId}: Props) => {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' >
            <Link href={ noteId ? `/draw?id=${noteId}` : `/draw`}>
                <BiSolidPaint className='w-5 h-5' />
            </Link>
        </Button>
        </TooltipTrigger>
        <TooltipContent>
        <p>Add Drawing</p>
        </TooltipContent>
    </Tooltip>
  )
}

export default AddDrawingButton