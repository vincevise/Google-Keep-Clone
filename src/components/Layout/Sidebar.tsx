import React from 'react'
import { Button } from '../ui/button'
import { MdCheck, MdLabelOutline, MdLightbulbOutline, MdOutlineArchive, MdOutlineEdit } from 'react-icons/md'
import { BsCheck, BsTag } from 'react-icons/bs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import AddLabelModal from '../AddLabelModal'
import { api } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

type Props = {
    openSideBar: boolean
}

const Sidebar = ({ openSideBar }: Props) => {

    const { data } = api.label.getLabels.useQuery()

    const router = useRouter();
    const { setTheme, theme } = useTheme()

    console.log(theme, 'theme');

    return (
        <div className={`${openSideBar ? 'w-64' : 'w-16'}  shrink-0  relative  h-screen`}>
            <div className={`  ${openSideBar ? 'w-64' : 'w-16'} h-screen pt-16 fixed top-0  flex flex-col    `}>
                <div className={`py-2 space-y-2 ${!openSideBar && 'pl-3'}`}>
                    <Link href={'/'} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}   flex  items-center relative gap-6 ${router.pathname==='/' ? `${theme==='dark' ? 'bg-[#fbc531]' : 'bg-yellow-300 border'}` : ` ${theme==='dark' ? 'hover:bg-white/20' : 'hover:bg-white'}`}`}
                    >
                        <MdLightbulbOutline className='w-6 h-6' />
                        {openSideBar && <span className=' text-sm'>Notes</span>}
                    </Link>
                    {
                        data && data.map((label)=>{

                            const path = router.query.id
                            console.log(path===label.name, 'pathname')

                            return (<Link href={`/label/${label.name}`} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}   flex  items-center relative gap-6 ${path===label.name ? `${theme==='dark' ? 'bg-yellow-900' : 'bg-yellow-300 border border-gray-800'}` : ` ${theme==='dark' ? 'hover:bg-white/20' : 'hover:bg-white'}`} `}
                            key={`label_key_${label.id}`}
                            >
                            <MdLabelOutline className='w-6 h-6' />
                            {openSideBar && <span className=' text-sm '>{label.name}</span>}
                        </Link>)
                        })
                    }
                    

                    <Dialog>
                        <DialogTrigger asChild >
                            <button className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'} ${theme === 'dark' ?'hover:bg-white/20' :'hover:bg-white'}  flex  items-center relative gap-6 `}>
                                <MdOutlineEdit className='w-6 h-6' />
                                {openSideBar && <span className=' text-sm '>Label</span>}
                            </button>
                        </DialogTrigger>
                         <AddLabelModal/>
                    </Dialog>


                    <Link href={'/archived'} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}    flex  items-center relative gap-6 ${router.pathname==='/archived' ? 'bg-yellow-300 border border-gray-800' : `${theme === 'dark' ?'hover:bg-white/20' :'hover:bg-white'} `}`}>
                        <MdOutlineArchive className='w-6 h-6' />
                        {openSideBar && <span className=' text-sm '>Archived</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar