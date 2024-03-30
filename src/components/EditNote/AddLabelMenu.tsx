import React, { ChangeEvent, useMemo } from 'react'
import { MdOutlineNewLabel } from 'react-icons/md'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Button } from '../ui/button'
import { Note } from '@prisma/client'
import { api } from '@/utils/api'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils'

type Props = {
  editNote: Note
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const AddLabelMenu = ({editNote}: Props) => {
  const ctx = api.useUtils();
  const {data: alltags} = api.label.getLabels.useQuery()
  const {data:noteTags} = api.label.getNotesLabels.useQuery({
      noteId:editNote.id
  });
  const {mutate:addTags} = api.label.linkTagsToNote.useMutation({
    onSuccess:()=>{
      void ctx.label.getNotesLabels.invalidate()
    }
  })
  const {mutate:removeTags} = api.label.unlinkTagsToNote.useMutation({
    onSuccess:()=>{
      void ctx.label.getNotesLabels.invalidate()
    }
  })
  const selectedTagIds = useMemo(() => new Set(noteTags?.map(tag => tag.id)), [noteTags]);

  const handleTags = (e:ChangeEvent<HTMLInputElement>, tagId:number) => {
    console.log(e.target.checked, 'chekced')
    if(e.target.checked){
      addTags({noteId:editNote.id, tagId})
    }else{
      removeTags({noteId:editNote.id, tagId})
    }


  }
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => e.stopPropagation()}>
              <MdOutlineNewLabel className='w-5 h-5' />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add label</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className={cn(
                  "w-64 p-3 bg-white rounded-md",
                  fontSans.variable
                )}  >
        <div className="">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Tags</h4>
          </div>
          <div className="flex flex-col w-full mt-2">
            <div className='flex items-center justify-between'>
              <input type="text" className='outline-none w-full text-sm' placeholder='Enter Tag Name' />
              <PiMagnifyingGlass className='w-4 h-4' />
            </div>
            <div className='mt-2'>
              {alltags?.map((x) => {
                return (
                  <div className='w-full text-sm text-gray-600 flex gap-2' key={x.id}>
                    <input className='rounded-0 w-4 border-2 text-black cursor-pointer' 
                      type='checkbox' 
                      checked= {selectedTagIds.has(x.id)}
                      onChange={(e)=>handleTags(e, x.id)}  
                    />{x.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AddLabelMenu