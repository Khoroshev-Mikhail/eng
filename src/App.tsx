import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import TopMenu from './Components/TopMenu/TopMenu';
import Words from './Components/Words/Words';
import Grammar from "./Components/Grammar/Grammar";
import Texts from "./Components/Texts/Texts";

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import WordsMenu from "./Components/WordsMenu/WordsMenu";

function App() {
  return (
    <Container>
      <Router>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Words />} />
          <Route path="/Grammar" element={<Grammar />} />
          <Route path="/Texts" element={<Texts />} />
          <Route path="/WordsMenu" element={<WordsMenu />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App;
