import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./homePage";
import Auth from "./Auth";


function App() {
 
    return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
      </BrowserRouter>
    )
  }

  

export default App;