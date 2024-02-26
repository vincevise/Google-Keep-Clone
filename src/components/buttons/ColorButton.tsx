import React from 'react'
import { Button } from '../ui/button'
import { MdOutlineColorLens } from 'react-icons/md'

type Props = {}

const ColorButton = (props: Props) => {
    return (
        
        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black ' onClick={(e) => e.stopPropagation()}>
            <MdOutlineColorLens className='w-5 h-5' />
        </Button>
    )
}

export default ColorButton