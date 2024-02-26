import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { MdOutlineColorLens, MdOutlineFormatColorReset } from 'react-icons/md' 
import { bgcolor } from '@/lib/ui'
import { api } from '@/utils/api'
import { Note } from '@prisma/client'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type Props = {
    editNote: Note | Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned'>,
    setVal: (val:string)=> void
}

const ColorButton = 'rounded-full w-8 h-8 border-2 border-transparent  hover:border-black flex items-center justify-center'
  
export function hasId(note: Note | Pick<Note, 'title' | 'description' | 'archived' | 'backgroundColor' | 'pinned'>): note is Note {
    return (note as Note).id !== undefined;
}
 

const ChangeColorMenu = ({ editNote, setVal }: Props) => {
    const ctx = api.useUtils();


    const { mutate } = api.note.changeNoteColor.useMutation(
        {
            onSuccess: () => {
                void ctx.note.getNotes.invalidate();

            }
        }
    )
    const handleChangeColor = (e: MouseEvent<HTMLButtonElement>) => {
        const color = e.currentTarget.dataset.color
        if (hasId(editNote)) {
            mutate({ id: editNote.id, backgroundColor: color ?? '' });
        }
        setVal(color ?? '')
    }


    return (
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
    )
}

export default ChangeColorMenu