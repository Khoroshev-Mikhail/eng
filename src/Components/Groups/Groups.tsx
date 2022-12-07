import GroupCard from './GroupCard'
import {  Title } from '../../app/types/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { RootState } from '../../app/store'
import { useEffect } from 'react'
import { getAllGroupsThunk } from '../../app/clientAPI/allGroupsSliceAPI'

export default function Groups(){
    const dispatch = useAppDispatch()
    const groups = useAppSelector((state: RootState) => state.allGroups)
    useEffect(()=>{
        dispatch(getAllGroupsThunk())
    }, [])
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {groups && groups.map((el: Title, i: number) => {
                return <GroupCard key={i} {...el} />
            })}
        </div>
    )
}