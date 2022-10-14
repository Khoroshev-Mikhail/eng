import { Link } from 'react-router-dom'
import { Card, Progress } from 'semantic-ui-react'
import { useGetVocabularyQuery } from '../../app/API/vocabulary'
import css from './wordsCard.module.css'
export default function WordsCard(props: any){
    const {data, error, isLoading} = useGetVocabularyQuery(1)
    let english = []
    let russian = []
    let spelling = []
    let auding = []
    if(data && props.words){
        english = data.english.filter((el: any) => props.words.includes(el))
        russian = data.russian.filter((el: any) => props.words.includes(el))
        spelling = data.spelling.filter((el: any) => props.words.includes(el))
        auding = data.auding.filter((el: any) => props.words.includes(el))
    }
    function progress(total: number[], current: number[]){
        return Math.round(current.length / total.length * 100)
    }
    return (
        <Card as={Link} to="/WordsMenu">
            <Card.Content>
                <Card.Header textAlign='center'>{props.header}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Progress percent={progress(props.words, english)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.words, russian)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.words, spelling)} progress indicating className={css.progressMargin} />
                <Progress percent={progress(props.words, auding)} progress indicating className={css.progressMargin} />
            </Card.Content>
        </Card>
    )
}