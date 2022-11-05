import { Button, Navbar, TextInput } from "flowbite-react";
import { useState } from "react";
import {useLinkClickHandler, useLocation} from "react-router-dom";

export default function TopMenu(){
  const userId = false
  const location = useLocation();
  const goMain = useLinkClickHandler("/");
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
                  <Navbar.Link href="/" active={location.pathname === '/'} color='dark'>
                  Группы слов
                  </Navbar.Link>
              </span>
              <span onClick={goAuth}>
                  <Navbar.Link href="/" active={location.pathname === '/authorization'} color='dark'>
                  {userId ? 'Выход' : 'Вход / Регистрация'}
                  </Navbar.Link>
              </span>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}