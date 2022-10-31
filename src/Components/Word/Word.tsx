import { useEffect, useId, useState } from 'react'
import { Card, Icon, Image, Container, Button } from 'semantic-ui-react'
import { useGetVocabularyQuery, useSetVocabularyMutation } from '../../app/API/vocabularyAPI'
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
    const defaultImg = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
    useEffect(()=>{
        isSuccessVocabulary && isSuccessWordsByGroup && setWord(unlernedWord(vocabulary.english, wordsByGroup))
    }, [vocabulary, wordsByGroup, isSuccessVocabulary, isSuccessWordsByGroup])
    useEffect(()=>{
        isSuccessWordsByGroup && word && setFalses(falseVariants(wordsByGroup, word))
    }, [word])
    return(
        <Card centered fluid={document.documentElement.clientWidth < 800 ? true : false}>
           
        </Card>

    )
}