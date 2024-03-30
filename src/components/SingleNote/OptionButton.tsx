import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Note } from "@prisma/client";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

type Props = {
  note: Note
}

export function OptionButton (
  {note}: Props
) {
  const ctx = api.useUtils()
  const { mutate: deleteNote} = api.note.deleteNote.useMutation({
    onSuccess:()=>{
        void ctx.note.getNotes.invalidate()
    }
  })

  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'} className='rounded-full text-gray-600 hover:text-black   '><BsThreeDotsVertical/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{boxShadow: '3px 3px 1px 1px #0c0c0c' }} className="w-56" onClick={(e)=>{
              e.stopPropagation();
            }}>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" 
            onMouseDown={(e)=>{
              console.log(e.target, 'e.target Profile')
              deleteNote({
                noteid: note.id
              })
            }}
            >
            <span>Delete Note</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseDown={()=>{
              router.push(`/draw?id=${note.id}`)
            }} 
            className="cursor-pointer" >
            <span>Add Drawing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
