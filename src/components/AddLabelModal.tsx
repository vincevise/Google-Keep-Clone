import React, { useState } from 'react'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { MdCheck, MdClose } from 'react-icons/md'
import { Button } from './ui/button'
import { api } from '@/utils/api'
import EditLabel from './EditLabel'
import { useGrid } from './Layout/AppLayout'

type Props = {}

const AddLabelModal = (props: Props) => {

    const [label, setLabel] = useState('');
    const { data } = api.label.getLabels.useQuery()
    const ctx = api.useUtils();

    const {setLoading} = useGrid()
    

    const { mutate:createLabel, isLoading } = api.label.createLabel.useMutation({
        onSuccess(data, variables, context) {
            void ctx.label.getLabels.invalidate();
        },
    })

    setLoading(isLoading)

    const handleSubmit = () => {
        if (label.trim().length > 0) {
            createLabel({ name: label })
        }
        setLabel("")
    }
    return (
        <DialogContent className="sm:max-w-[320px] w-full">
            <DialogHeader>
                <DialogTitle>Edit Label</DialogTitle>

            </DialogHeader>
            <div className="flex  items-center gap-2">
                <button className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all'>
                    <MdClose className='w-4 h-4 ' />
                </button>
                <input 
                    type="text" 
                    className='w-[200px]  outline-none text-gray-600 border-b text-sm py-1' 
                    placeholder='Create new label ' 
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value); 
                    }} />
                <button className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all' onClick={handleSubmit}>
                    <MdCheck className='w-4 h-4 ' />
                </button>
            </div>
            {data && data.map((x) => {
                return (
                     <EditLabel data={x} key={`key_label_${x.id}`}/>
                )
            })}
            
            <DialogFooter>
                <Button type="submit" variant={'ghost'} size={'sm'}>Done</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default AddLabelModal