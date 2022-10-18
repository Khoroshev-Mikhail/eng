import { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
export default function MethodMenu(props:any){
    const [activeItem, setActiveItem] = useState<string>('Words')
    const handleItemClick = (e: any, { name }: any) => setActiveItem(name)
    return (
        <Menu pointing secondary stackable>
            <Menu.Item as={Link} to={`/${props.title}/English`} name='Words' active={activeItem === 'Words'} onClick={handleItemClick}>English</Menu.Item>
            <Menu.Item as={Link} to={`/${props.title}/Russian`} name='Grammar' active={activeItem === 'Grammar'} onClick={handleItemClick}>Russian</Menu.Item>
            <Menu.Item as={Link} to={`/${props.title}/Spelling`} name='Grammar' active={activeItem === 'Grammar'} onClick={handleItemClick}>Spelling</Menu.Item>
            <Menu.Item as={Link} to={`/${props.title}/Auding`} name='Texts' active={activeItem === 'Texts'} onClick={handleItemClick}>Auding</Menu.Item>
        </Menu>
    )
}