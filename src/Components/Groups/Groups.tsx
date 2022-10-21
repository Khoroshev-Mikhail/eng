import { useGetGroupsQuery } from '../../app/API/groupsAPI'
import GroupCard from '../GroupCard/GroupCard'
import { Group } from '../../app/types/types'
export default function Groups(){
    const {data: groups = [], isSuccess} = useGetGroupsQuery()
    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
            {isSuccess && groups.map((el: Group, i: number) => {
                return <GroupCard key={i} {...el} />
            })}
        </div>
    )
}