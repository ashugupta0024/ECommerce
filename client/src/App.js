import './App.css';
import {Routes, Route} from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { HomePage } from './pages/HomePage';
import { Contact } from './pages/Contact';
import {Policy} from './pages/Policy';
import {About} from './pages/About';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/About' element = {<About/>} />
        <Route path='/Contact' element = {<Contact/>} />
        <Route path='/Policy' element = {<Policy/>} /> 
        <Route path='*' element = {<PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
