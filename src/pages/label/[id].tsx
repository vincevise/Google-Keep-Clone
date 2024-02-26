import CreateNote from '@/components/CreateNote'
import AppLayout from '@/components/Layout/AppLayout'
import NotesData from '@/components/NotesData'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

const label = (props: Props) => {
  const router = useRouter()

  const {data} = api.label.getNotesForTag.useQuery({
    tagName: router.query.id as string ?? '' 
  })

  const [pinnedNotes, setPinnedNotes] = useState(data?.notes?.filter((x)=>x.pinned && !x.archived) ?? [])
  const [unpinned, setUnpinnedNotes] = useState(data?.notes?.filter((x)=>!x.pinned && !x.archived) ?? [])
  console.log(pinnedNotes, 'pinnedNotes')

  useEffect(()=>{
    if(data && data.notes){
      setPinnedNotes(data.notes.filter((x)=>!x.archived && x.pinned))
      setUnpinnedNotes(data.notes?.filter((x)=>!x.pinned && !x.archived))
    }
  },[data?.notes])


  return (
    <>
      <AppLayout>
        {
          data && 
          <>
            {data.tag && <CreateNote tag={data?.tag} />

            }
            <div className='mt-4'>
          <h2 className='text-sm font-medium uppercase text-gray-500 my-4'>
            {pinnedNotes.length > 0 && 'Pinned'}
          </h2>
          {data.notes && 
            <NotesData notes={pinnedNotes}/>
          }

          <h2 className='text-sm font-medium uppercase text-gray-500 my-4'>
            {pinnedNotes.length > 0 && 'Other'}
          </h2>
          {data.notes && 
            <NotesData notes={unpinned}/>
          }
         </div>
          </>
        }
        
      </AppLayout>
    </>
  )
}

export default label