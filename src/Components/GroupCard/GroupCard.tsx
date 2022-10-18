import { Link } from 'react-router-dom'
import { Card, Progress } from 'semantic-ui-react'
import { useGetVocabularyQuery } from '../../app/API/vocabulary'
import css from './groupCard.module.css'
export default function GroupCard(props: any){
    const {data, error, isLoading} = useGetVocabularyQuery(1) //Вынести в верхнюю компоненту, инчае каждый раз логика выполняется
    let english = []
    let russian = []
    let spelling = []
    let auding = []
    if(data && props.word_ids){
        english = data.english.filter((el: any) => props.word_ids.includes(el))
        russian = data.russian.filter((el: any) => props.word_ids.includes(el))
        spelling = data.spelling.filter((el: any) => props.word_ids.includes(el))
        auding = data.auding.filter((el: any) => props.word_ids.includes(el))
    }
    function progress(total: number[], current: number[]){
        return Math.round(current.length / total.length * 100)
    }
    return (
        <Card as={Link} to={`/${props.title}`}>
            <Card.Content>
                <Card.Header textAlign='center'>{props.title}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Progress percent={progress(props.word_ids, english)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.word_ids, russian)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.word_ids, spelling)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.word_ids, auding)} progress indicating className={css.progressMargin} />
            </Card.Content>
        </Card>
    )
}