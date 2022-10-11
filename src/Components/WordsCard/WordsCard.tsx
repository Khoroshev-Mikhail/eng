import { Link } from 'react-router-dom'
import { Card, Progress } from 'semantic-ui-react'
import css from './wordsCard.module.css'
export default function WordsCard(props: any){
    return (
        <Card as={Link} to="/WordsMenu">
            <Card.Content>
                <Card.Header textAlign='center'>{props.header}</Card.Header>
            </Card.Content>
            <Card.Content>
                <Progress percent={44} progress indicating className={css.progressMargin} />
                <Progress percent={22} progress indicating className={css.progressMargin} />
                <Progress percent={19} progress indicating className={css.progressMargin} />
                <Progress percent={95} progress indicating className={css.progressMargin} />
            </Card.Content>
        </Card>
    )
}