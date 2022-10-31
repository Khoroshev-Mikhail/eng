import { Button, Navbar, TextInput } from "flowbite-react";
import { useState } from "react";
import {useLinkClickHandler, useLocation} from "react-router-dom";

export default function TopMenu(){
  const userId = false
  const [authFromVisible, setAuthFormVisible] = useState<boolean>(false)
  const [login, setLogin] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
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
              <span className="cursor-pointer">
                {!userId && !authFromVisible ?
                  <span onClick={()=>setAuthFormVisible(!authFromVisible)}>
                    {userId ? 'Выход' : 'Вход / Регистрация'}
                  </span>
                :
                <span>
                  <input type={'text'} value={login} onChange={(e)=>setLogin(e.target.value)}/>
                  <input type={'text'} value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                  <button>go!</button>
                </span>
                }
              </span>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}