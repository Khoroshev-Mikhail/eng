import { Navbar } from "flowbite-react";
import {useLinkClickHandler, useLocation} from "react-router-dom";

export default function TopMenu(){
  const location = useLocation();
  const goMain = useLinkClickHandler("/");
    return (
      <div className="mb-4">
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <span onClick={goMain} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    StudyWord
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <span onClick={goMain}>
                  <Navbar.Link href="/" active={location.pathname === '/'} color='dark'>
                  Группы слов
                  </Navbar.Link>
                </span>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}