import { Tab } from 'semantic-ui-react'
import Word from '../Word/Word'

const panes = [
  {
    menuItem: 'Перевод слово',
    render: () => <Tab.Pane attached={false}><Word /></Tab.Pane>,
  },
  {
    menuItem: 'Слово перевод',
    render: () => <Tab.Pane attached={false}><Word /></Tab.Pane>,
  },
  {
    menuItem: 'По буквам',
    render: () => <Tab.Pane attached={false}><Word /></Tab.Pane>,
  },
  {
    menuItem: 'Аудирование',
    render: () => <Tab.Pane attached={false}><Word /></Tab.Pane>,
  },
]

export default function WordsMenu(){
    return (
        <Tab menu={{ pointing: true, secondary: true, stackable: true}} panes={panes} />
    )
}