import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'semantic-ui-react';
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
import React from 'react';
import Footer from './Components/Footer/Footer';

function App() {
  const {data: groups = [], isSuccess} = useGetGroupsQuery()
  return (
    <div className='container mx-auto px-4 py-4'>
      <Router>
        {/* <TopMenu /> */}
        <Routes>
          <Route path="/" element={<Groups />} />
          <Route path="/Grammar" element={<Grammar />} />
          <Route path="/Texts" element={<Texts />} />
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
