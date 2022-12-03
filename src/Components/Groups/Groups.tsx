import GroupCard from '../GroupCard/GroupCard'
import { GroupTitle } from '../../app/types/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { RootState } from '../../app/store'
import { useEffect } from 'react'
import { getAllGlobalGroupsTitlesThunk } from '../../app/API/groupsSliceAPI'

export default function Groups(){
    const dispatch = useAppDispatch()
    const groups = useAppSelector((state: RootState) => state.groups)
    useEffect(()=>{
        dispatch(getAllGlobalGroupsTitlesThunk())
    }, [])
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {groups && groups.map((el: GroupTitle, i: number) => {
                return <GroupCard key={i} {...el} />
            })}
        </div>
    )
}