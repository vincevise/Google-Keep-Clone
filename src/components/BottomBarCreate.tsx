import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { MdOutlineArchive, MdOutlineColorLens, MdOutlineFormatColorReset, MdOutlineNewLabel } from 'react-icons/md'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { bgcolor } from '@/lib/ui'
import { Note, Tag } from '@prisma/client'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { api } from '@/utils/api'

type Props = {
    note: Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned'>,
    setNote: Dispatch<SetStateAction<Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned'>>>
    tags:Tag[],
    setTags: Dispatch<SetStateAction<Tag[]>>
}
const ColorButton = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center'

const BottomBarCreate = ({note ,setNote, tags, setTags}: Props) => {
    const {data: alltags} = api.label.getLabels.useQuery();
    const handleChangeColor = (e:MouseEvent<HTMLButtonElement>) => {

        setNote({...note, backgroundColor:e.currentTarget.dataset.color ?? ''})
    }

    console.log(alltags, 'alltags')
    return (
        <div className="mb-1 px-1">
            <div className={` flex  gap-2 group  font-sans  `}>
                {/* Color Button */}
                <Popover>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => e.stopPropagation()}>
                                    <MdOutlineColorLens className='w-5 h-5' />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Background options</p>
                        </TooltipContent>
                    </Tooltip>

                    <PopoverContent className={`w-fit  font-sans`}>
                        <div>
                            <div className='flex items-center gap-2'>
                                <button
                                    data-color=''
                                    className={ColorButton}
                                    onClick={handleChangeColor}
                                    style={{ background: 'transparent' }}
                                >
                                    <MdOutlineFormatColorReset className='w-4 h-4' />
                                </button>
                                <button
                                    data-color={bgcolor.YELLOW}
                                    className={ColorButton}
                                    onClick={handleChangeColor} style={{ background: bgcolor.YELLOW }}>

                                </button>
                                <button
                                    data-color={bgcolor.RED}
                                    className={ColorButton}
                                    onClick={handleChangeColor} style={{ background: bgcolor.RED }}>
                                </button>
                                <button
                                    data-color={bgcolor.BLUR}
                                    className={ColorButton}
                                    onClick={handleChangeColor} style={{ background: bgcolor.BLUR }}>
                                </button>
                            </div>

                        </div>
                    </PopoverContent>
                </Popover>

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
      <PopoverContent    >
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
                      checked= {tags.find((tag)=>tag.id===x.id) ? true : false}
                      onChange={(e)=>{
                        if(e.target.checked){
                            setTags([...tags, x])
                        }else{
                            setTags([...tags.filter((tag)=>tag.id!==x.id)])
                        }
                      }}  
                    />{x.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>



                {/* Archive button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  ' onClick={(e) => {
                            setNote({...note,archived:!note.archived})
                        }}>
                            <MdOutlineArchive className='w-5 h-5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Archive</p>
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>
    )
}

export default BottomBarCreate