import { useState } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom";
export default function TopMenu(){
    const [activeItem, setActiveItem] = useState<string>('Words')
    const handleItemClick = (e: any, { name }: any) => setActiveItem(name)
    return (
        <Menu pointing secondary stackable>
            <Menu.Item as={Link} to="/" name='Words' active={activeItem === 'Words'} onClick={handleItemClick}>Слова</Menu.Item>
            <Menu.Item as={Link} to="/Grammar" name='Grammar' active={activeItem === 'Grammar'} onClick={handleItemClick}>Грамматика</Menu.Item>
            <Menu.Item as={Link} to="/Texts" name='Texts' active={activeItem === 'Texts'} onClick={handleItemClick}>Тексты</Menu.Item>
        </Menu>
    )
}