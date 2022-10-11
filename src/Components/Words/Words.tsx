import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import WordsCard from '../WordsCard/WordsCard'
export default function Words(){
    return (
        <Card.Group itemsPerRow={4} stackable>
            <WordsCard header={'Топ-100 Существительны'}/>
            <WordsCard header={'Топ-100 Глаголов'}/>
            <WordsCard header={'Топ-100 Прилагательных'}/>
            <WordsCard header={'Топ-100 Наречий'}/>
            <WordsCard header={'Топ-100 Наречий'}/>
            <WordsCard header={'Топ-100 Наречий'}/>
            <WordsCard header={'Топ-100 Наречий'}/>
        </Card.Group>
    )
}