import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import React, { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { PopoverTrigger } from './ui/popover'
import { MdOutlineColorLens, MdOutlineFormatColorReset, MdOutlineNewLabel } from 'react-icons/md'
import { Button } from './ui/button'
import { bgcolor } from '@/lib/ui'
import { PiMagnifyingGlass } from 'react-icons/pi'
const ColorButtonStyle = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center'
type Props = {
  note: Note,
  notesActionRef: any
}

export default function LabelButton({ note, notesActionRef }: Props) {

  const ctx = api.useUtils();
  const [openColor, setOpenColor] = useState(false);
  const { mutate: archiveNote } = api.note.archiveNote.useMutation({
    onSuccess: () => {
      void ctx.note.getNotes.invalidate()
    }
  })

  const { mutate: deleteNote } = api.note.deleteNote.useMutation({
    onSuccess: () => {
      void ctx.note.getNotes.invalidate()
    }
  })

  const { mutate } = api.note.changeNoteColor.useMutation(
    {
      onSuccess: () => {
        void ctx.note.getNotes.invalidate();

      }
    }
  )

  const handleChangeColor = (e: any) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    const color = e.currentTarget.dataset.color;
    mutate({ id: note.id, backgroundColor: color ?? '' });
  };

  useEffect(() => {
    // Function to check if click is outside of the dropdown
    const handleClickOutside = (event: any) => {
      if (openColor && notesActionRef.current && !notesActionRef.current.contains(event.target)) {
        setOpenColor(false);
      }
    };

    // Add event listener when `openColor` is true
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openColor, notesActionRef]);

  const { data: alltags } = api.label.getLabels.useQuery()
  const { data: noteTags } = api.label.getNotesTags.useQuery({
    noteId: note.id
  });
  const { mutate: addTags } = api.label.linkTagsToNote.useMutation({
    onSuccess: () => {
      void ctx.label.getNotesTags.invalidate()
    }
  })
  const { mutate: removeTags } = api.label.unlinkTagsToNote.useMutation({
    onSuccess: () => {
      void ctx.label.getNotesTags.invalidate()
    }
  })
  const selectedTagIds = useMemo(() => new Set(noteTags?.map(tag => tag.id)), [noteTags]);

  const handleTags = (e: ChangeEvent<HTMLInputElement>, tagId: number) => {
    // e.stopPropagation(); // Stop the event from bubbling up
    if (e.target.checked) {
      addTags({ noteId: note.id, tagId });
    } else {
      removeTags({ noteId: note.id, tagId });
    }
  };



  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black  group-hover:opacity-100 opacity-0 ' onClick={(e) => {
            e.stopPropagation()
            setOpenColor(!openColor)
            // console.log(clickOutsideRef.current, 'clickOutsideRef')
          }}>
            <MdOutlineNewLabel className='w-5 h-5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent >
          <p>Background options</p>
        </TooltipContent>
      </Tooltip>
      {

        openColor && <div className='absolute w-fit left-0 -bottom-[86%] bg-white border p-4 rounded-md drop-shadow-md'
          ref={(ref) => {
            notesActionRef.current = ref;
          }}>
          <div className="w-64   bg-white rounded-md">
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
                          checked={selectedTagIds.has(x.id)}
                          onChange={(e) => handleTags(e, x.id)}
                          onClick={(e)=>e.stopPropagation()}
                        />{x.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  )
}
