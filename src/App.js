import './App.css';
import './stylesheets/scrollbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Riddle from './pages/riddle/Riddle';

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/riddle' element={<Riddle/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
