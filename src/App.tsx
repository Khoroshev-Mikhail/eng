import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopMenu from './Components/TopMenu/TopMenu';
import Groups from './Components/Groups/Groups';
import Grammar from "./Components/Grammar/Grammar";
import Texts from "./Components/Texts/TextGrid/TextsGrid";
import GroupPage from "./Components/GroupPage/GroupPage";
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
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { loginByRefreshThunk } from './app/API/userAPI';
import { RootState } from './app/store';
import TextPage from "./Components/Texts/TextPage/TextPage";

function App() {
    useEffect(()=>{
        dispatch(loginByRefreshThunk())
        // document.cookie = encodeURIComponent('name222') + '=' + encodeURIComponent('Mike');
        // console.log(document.cookie)
    }, [])
    const dispatch = useAppDispatch()
    const {data: groups = [], isSuccess} = useGetGroupsQuery()
    const { id: userId } = useAppSelector((state: RootState) => state.userData)
    const admin = userId === 1 //Вывести роли в глобальный стейт
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
                    <Route path="/texts/:id_text" element={<TextPage />} />
                    <Route path="/words" element={<Groups />} />
                    <Route path="/words/:id_group" element={<GroupPage />} />
                    <Route path={`/words/:id_group/english`} element={<English />} />
                    <Route path={`/words/:id_group/russian`} element={<Russian  />} />
                    <Route path={`/words/:id_group/spelling`} element={<Spelling />} />
                    <Route path={`/words/:id_group/auding`} element={<Auding />} />
                    
                </Routes>
            </Router>
            <Footer />
        </div>
  )
}

export default App;
