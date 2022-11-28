import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from './Components/TopMenu/TopMenu';
import Groups from './Components/Groups/Groups';
import Grammar from "./Components/Grammar/Grammar";
import Texts from "./Components/Texts/Texts";
import MethodMenu from "./Components/MethodMenu/MethodMenu";
import English from "./Components/Methods/English/English";
import Russian from "./Components/Methods/Russian/Russian";
import Spelling from "./Components/Methods/Spelling/Spelling";
import Auding from "./Components/Methods/Auding/Auding";
import { useGetGroupsQuery } from './app/API/groupsAPI';
import React, { useEffect } from 'react';
import Footer from './Components/Footer/Footer';
import AdminMenu from './AdminComponents/AdminMenu/AdminMenu';
import AdminWords from './AdminComponents/AdminWords/AdminWords';
import AdminGroups from './AdminComponents/AdminGroups/AdminGroups';
import BreadCrumb from './Components/BreadCrumbp/BreadCrumb';
import Auth from './Components/Auth/Auth';
import { useAppDispatch } from './app/hooks';
import { loginByRefreshThunk } from './app/API/userAPI';

function App() {
  const dispatch = useAppDispatch()
    const {data: groups = [], isSuccess} = useGetGroupsQuery()
    const admin = true
    useEffect(()=>{
        console.log(localStorage.getItem('refreshToken'))
        if(localStorage.getItem('refreshToken')){ //Вывести строки вроде refreshToken для localStorage в константы в отдельном файле
            console.log('araa2')
            dispatch(loginByRefreshThunk())
        }
    }, [])
    return (
        <div className='container mx-auto px-4 py-4 max-w-7xl'>
            <Router>
                <AdminMenu />
                <TopMenu />
                <BreadCrumb />
                <Routes>
                    {admin && <Route path="/adminWords" element={<AdminWords />} />}
                    {admin && <Route path="/adminGroups" element={<AdminGroups />} />}
                    
                    <Route path="/" element={<Groups />} />
                    <Route path="/authorization" element={<Auth />} />
                    <Route path="/grammar" element={<Grammar />} />
                    <Route path="/texts" element={<Texts />} />
                    {isSuccess && groups.map((el: any, i: number) => {
                        return (
                            <React.Fragment key={i}>
                                <Route path={`/${el.title}`} element={<MethodMenu {...el} />} />

                                <Route path={`/${el.title}/english`} element={<English {...el} />} />
                                <Route path={`/${el.title}/russian`} element={<Russian {...el} />} />
                                <Route path={`/${el.title}/spelling`} element={<Spelling {...el} />} />
                                <Route path={`/${el.title}/auding`} element={<Auding {...el} />} />
                            </React.Fragment>
                        )
                    })}
                    <Route path="/MethodMenu" element={<MethodMenu />} />
                </Routes>
            </Router>
            <Footer />
        </div>
  )
}

export default App;
