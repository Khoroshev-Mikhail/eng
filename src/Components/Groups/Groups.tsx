import { Card } from 'semantic-ui-react'
import { useGetGroupsQuery } from '../../app/API/groupsAPI'
import GroupCard from '../GroupCard/GroupCard'
import { Group } from '../../app/types/types'
import { useGetVocabularyQuery } from '../../app/API/vocabulary'
export default function Groups(){
    const {data: groups = [], error, isLoading} = useGetGroupsQuery()

    return (
        <Card.Group itemsPerRow={4} stackable>
            {groups?.map((el: Group, i: number) => {
                return <GroupCard key={i} {...el} />
            })}
        </Card.Group>
    )
}