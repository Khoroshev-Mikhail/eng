import { Navbar } from "flowbite-react";
import {useLinkClickHandler, useLocation} from "react-router-dom";
export default function AdminMenu(){
    const location = useLocation();
    const goMain = useLinkClickHandler("/");
    const goWords = useLinkClickHandler("/adminWords");
    const goGroups = useLinkClickHandler("/adminGroups");
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
                        <Navbar.Link href="/words" active={location.pathname === '/words'} >
                            Admin: Добавить слово
                        </Navbar.Link>
                    </span>
                    <span onClick={goGroups}>
                        <Navbar.Link href="/groups" active={location.pathname === '/groups'}>
                            Admin: Группы слов
                        </Navbar.Link>
                    </span>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}