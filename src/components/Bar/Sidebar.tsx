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

type Props = {
    openSideBar: boolean
}

const Sidebar = ({ openSideBar }: Props) => {

    const { data } = api.label.getLabels.useQuery()

    const router = useRouter()


    return (
        <div className={`${openSideBar ? 'w-64' : 'w-16'}  shrink-0  relative  h-screen`}>
            <div className={`  ${openSideBar ? 'w-64' : 'w-16'} h-screen pt-16 fixed top-0  flex flex-col `}>
                <div className={`py-2  ${!openSideBar && 'pl-3'}`}>
                    <Link href={'/'} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}   flex  items-center relative gap-6 ${router.pathname==='/' ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}
                        
                    >
                        <MdLightbulbOutline className='w-6 h-6' />
                        {openSideBar && <span className=' text-sm text-black'>Notes</span>}
                    </Link>
                    {
                        data && data.map((label)=>{

                            const path = router.query.id
                            console.log(path===label.name, 'pathname')

                            return (<Link href={`/label/${label.name}`} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}   flex  items-center relative gap-6 ${path===label.name ? 'bg-yellow-100' : 'hover:bg-gray-100'} `}
                            key={`label_key_${label.id}`}
                            >
                            <MdLabelOutline className='w-6 h-6' />
                            {openSideBar && <span className=' text-sm text-black'>{label.name}</span>}
                        </Link>)
                        })
                    }
                    

                    <Dialog>
                        <DialogTrigger asChild >
                            <button className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'} hover:bg-gray-100  flex  items-center relative gap-6 `}>
                                <MdOutlineEdit className='w-6 h-6' />
                                {openSideBar && <span className=' text-sm text-black'>Label</span>}
                            </button>
                        </DialogTrigger>
                         <AddLabelModal/>
                    </Dialog>


                    <Link href={'/archived'} className={`${openSideBar ? 'pl-6 w-full h-12 rounded-r-full justify-start' : 'w-12 h-12 rounded-full justify-center'}    flex  items-center relative gap-6 ${router.pathname==='/archived' ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}>
                        <MdOutlineArchive className='w-6 h-6' />
                        {openSideBar && <span className=' text-sm text-black'>Archived</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar