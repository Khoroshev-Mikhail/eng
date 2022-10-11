import { Card, Icon, Image, Container, Button } from 'semantic-ui-react'
import css from './word.module.css'
export default function Word(){
    return(
        <Card centered fluid={document.documentElement.clientWidth < 800 ? true : false}>
            <Image onClick={()=>alert('repeat audio')} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' centered wrapped ui={false} className={css.pointer}/>
            <Card.Content>
                <Card.Header textAlign='center' className={css.pointer}>Matthew</Card.Header>
            </Card.Content>
            <Card.Content>
                <Button fluid basic color='green' size='huge' className={css.marginButtons}>Approve</Button>
                <Button fluid basic color='green' size='huge' className={css.marginButtons}>Approve</Button>
                <Button fluid basic color='green' size='huge' className={css.marginButtons}>Approve</Button>
                <Button fluid basic color='green' size='huge' className={css.marginButtons}>Approve</Button>
            </Card.Content>
        </Card>

    )
}