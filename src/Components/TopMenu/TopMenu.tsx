import { Navbar} from "flowbite-react";
import {useLinkClickHandler, useLocation} from "react-router-dom";
import { useAppSelector } from "../../app/hooks/hooks";

export default function TopMenu(){
  const user = useAppSelector(state => state.user)
  const userId = false
  const location = useLocation();
  const goMain = useLinkClickHandler("/");
  const goTexts = useLinkClickHandler("/texts");
  const goAuth = useLinkClickHandler("/authorization");
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
                  <Navbar.Link href="/words" active={location.pathname === '/'} color='dark'>
                    Слова
                  </Navbar.Link>
              </span>
              <span onClick={goTexts}>
                  <Navbar.Link href="/texts" active={location.pathname === '/texts'} color='dark'>
                    Тексты
                  </Navbar.Link>
              </span>
              <span onClick={goAuth}>
                  <Navbar.Link href="/authorization" active={location.pathname === '/authorization'} color='dark'>
                    {userId ? 'Выход' : 'Вход / Регистрация'}
                  </Navbar.Link>
              </span>
              <span>
                  {user.id}
              </span>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}