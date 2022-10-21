import { Navbar } from "flowbite-react";
import {useLinkClickHandler, useLocation} from "react-router-dom";
export default function AdminMenu(){
    const location = useLocation();
    const goMain = useLinkClickHandler("/");
    const goWords = useLinkClickHandler("/adminWords");
    const goGroups = useLinkClickHandler("/adminGroups");
    const goUsers = useLinkClickHandler("/adminUsers");
    return (
        <div className="mb-4">
            <Navbar fluid={true} rounded={true} >
            <Navbar.Brand href="">
                <span onClick={goMain} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Admin panel
                </span>
            </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <span onClick={goWords}>
                        <Navbar.Link href="/words" active={location.pathname === '/adminWords'} >
                            Admin: Слова
                        </Navbar.Link>
                    </span>
                    <span onClick={goGroups}>
                        <Navbar.Link href="/groups" active={location.pathname === '/adminGroups'}>
                            Admin: Группы слов
                        </Navbar.Link>
                    </span>
                    <span onClick={goUsers}>
                        <Navbar.Link href="/users" active={location.pathname === '/adminUsers'}>
                            Admin: Пользователи
                        </Navbar.Link>
                    </span>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}