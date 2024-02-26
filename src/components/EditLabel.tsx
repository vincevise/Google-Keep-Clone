import { api } from '@/utils/api'
import { Tag } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import { MdCheck, MdDelete, MdEdit, MdLabel, MdOutlineEdit } from 'react-icons/md'

type Props = {
    data: Tag
}

const EditLabel = ({ data }: Props) => {

    const [label, setLabel] = useState<string>(data.name);
    const [enableEdit, setEditEnable] = useState(false);
    const ctx = api.useUtils();
    const {mutate: updateLabel} = api.label.updateLabel.useMutation({
        onSuccess:()=>{
            void ctx.label.getLabels.invalidate();
        }
    })

    const {mutate:deleteLabel} = api.label.deleteLabel.useMutation({
        onSuccess:()=>{
            void ctx.label.getLabels.invalidate();
        }
    })

    const inputLabelRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async() => {
        if (data.name !== label) {
            // const tag = 
            updateLabel({name: label, tagId:data.id})

        }
        setEditEnable(false)
    }

     

    return (
        <div className='flex  items-center gap-2'>
            <button className='w-7 h-7 flex group items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all' onClick={()=>deleteLabel({tagId:data.id})}>
                <MdLabel className='w-4 h-4 group-hover:hidden block' />
                <MdDelete className='w-4 h-4 group-hover:block hidden' />
            </button>
            <input 
                type="text" 
                className={`w-[200px] border-b  outline-none text-gray-600 ${!enableEdit && 'border-transparent'} text-sm py-1`} 
                value={label} 
                onChange={(e) =>  setLabel(e.target.value)} 
                ref={inputLabelRef}
                onFocus={()=>setEditEnable(true)}
            />

            {enableEdit ?
                <button className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all' onClick={handleSubmit}>
                    <MdCheck className='w-4 h-4 ' />
                </button> :

                <button className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all' 
                    onClick={() => {
                        setEditEnable(true)
                        inputLabelRef.current?.focus()
                    }}>
                    <MdEdit className='w-4 h-4 ' />
                </button>
            }
        </div>
    )
}

export default EditLabel