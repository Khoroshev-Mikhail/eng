import { Card } from 'semantic-ui-react'
import { useGetGroupsQuery } from '../../app/API/groupsAPI'
import WordsCard from '../WordsCard/WordsCard'
import { Group } from '../../app/types/types'
import { useId } from 'react'
export default function Groups(){
    const {data = [], error, isLoading} = useGetGroupsQuery()
    const id = useId()
    return (
        <Card.Group itemsPerRow={4} stackable>
            {data?.map((el: Group, i: number) => {
                return <WordsCard key={id+i} header={el.title} id={el.id} words={el.word_ids}/>
            })}
        </Card.Group>
    )
}