import { Card, Progress, Segment } from 'semantic-ui-react'
import css from './wordsCard.module.css'
export default function WordsCard(props: any){
    return (
        <Card href='/WordsMenu'>
            <Card.Content>
                <Card.Header textAlign='center'>{props.header}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Progress percent={44} progress indicating className={css.progressMargin} />
                <Progress percent={22} progress indicating className={css.progressMargin} />
                <Progress percent={9} progress indicating className={css.progressMargin} />
                <Progress percent={95} progress indicating className={css.progressMargin} />
            </Card.Content>
        </Card>
    )
}