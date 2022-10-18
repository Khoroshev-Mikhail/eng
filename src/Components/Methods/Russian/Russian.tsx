import { Card, Image, Button } from 'semantic-ui-react'
import { useGetUnlernedQuery, useSetVocabularyMutation, useWrongAnswerMutation } from '../../../app/API/vocabulary'
import { Word, Group} from '../../../app/types/types'
import css from './russian.module.css'
export default function Russian(props: Group){
    const method = 'russian'
    const userId = 1
    const { data, isSuccess } = useGetUnlernedQuery({userId, method, groupId: props.id})
    const [ setVocabulary ] = useSetVocabularyMutation()
    const [ wrongAnswer ] = useWrongAnswerMutation()
    const answer = (id: number) => {
        if(data.trueVariant.id === id){
            setTimeout(()=> setVocabulary({userId, method, word_id: id}), 1000)
        } else{
            wrongAnswer(1)
        }
    }
    return(
        <>
            {isSuccess && 
                <Card centered fluid={document.documentElement.clientWidth < 800 ? true : false}>
                    <Image onClick={()=>alert('repeat audio')} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' centered wrapped ui={false} className={css.pointer}/>
                    <Card.Content>
                        <Card.Header textAlign='center' className={css.pointer}>{data.trueVariant.rus}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {data.falseVariant.map((el: Word, i: number) => {
                            return (
                                <Button onClick={()=>answer(el.id)} key={i} fluid basic color='green' size='huge' className={css.marginButtons}>
                                    {el.eng}
                                </Button>
                            )
                        })}
                    </Card.Content>
                </Card>
            }
        </>
    )
}