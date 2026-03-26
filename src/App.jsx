import Header from "./Header.jsx"
import "./App.css"
import PasswordChecker from "./PasswordChecker.jsx"
import QuestionForm from "./QuestionForm.jsx"
import Minigames from "./Minigames.jsx"
import Game1 from "./Game1.jsx"
import Game2 from "./Game2.jsx"
import Game3 from "./Game3.jsx"
import Game4 from "./Game4.jsx"
import Game5 from "./Game5.jsx"
import Game6 from "./Game6.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <PasswordChecker/>
              <QuestionForm/>
              <Minigames/>
            </>
          } 
        />

        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/game5" element={<Game5 />} />
        <Route path="/game6" element={<Game6 />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App