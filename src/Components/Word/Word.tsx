import { useEffect, useId, useState } from 'react'
import { Card, Icon, Image, Container, Button } from 'semantic-ui-react'
import { useGetVocabularyQuery, useSetVocabularyMutation } from '../../app/API/vocabulary'
import { useGetAllWordsQuery, useGetWordsByGroupQuery } from '../../app/API/wordAPI'
import { falseVariants, unlernedGroup, unlernedWord } from '../../app/fns'
import { Word as WordType } from '../../app/types/types'
import css from './word.module.css'
export default function Word(){
    const id = useId()
    const {data: vocabulary = [], isSuccess: isSuccessVocabulary } = useGetVocabularyQuery(1)
    const {data: wordsByGroup = [], isSuccess: isSuccessWordsByGroup } = useGetWordsByGroupQuery(1)
    const [setVocabulary] = useSetVocabularyMutation()
    const [word, setWord] = useState<WordType>()
    const [falses, setFalses] = useState<WordType[]>([])
    useEffect(()=>{
        isSuccessVocabulary && isSuccessWordsByGroup && setWord(unlernedWord(vocabulary.english, wordsByGroup))
    }, [vocabulary, wordsByGroup, isSuccessVocabulary, isSuccessWordsByGroup])
    useEffect(()=>{
        isSuccessWordsByGroup && word && setFalses(falseVariants(wordsByGroup, word))
    }, [word])
    return(
        <Card centered fluid={document.documentElement.clientWidth < 800 ? true : false}>
            <Image onClick={()=>alert('repeat audio')} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' centered wrapped ui={false} className={css.pointer}/>
            <Card.Content>
                <Card.Header textAlign='center' className={css.pointer}>{word ? word.eng : ' '}</Card.Header>
            </Card.Content>
            <Card.Content>
                {falses && falses.map((el: WordType, i: number) => {
                    return <Button onClick={el.eng === word?.eng ? ()=>setVocabulary({word_id: el.id, user_id: 1, method: 'english'}) : ()=>{/* Запустить перерендер */}} key={id+i} fluid basic color='green' size='huge' className={css.marginButtons}>{el ? el.rus : ' '}</Button>
                })}
            </Card.Content>
        </Card>

    )
}