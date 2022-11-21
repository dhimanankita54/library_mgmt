import logo from './logo.svg';
import './App.css';
import { Books } from './components/Books';
import { Route, Routes } from 'react-router-dom';
import { Member } from './components/Member';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/books' element={<Books />}></Route>
        <Route path='/member' element={<Member />}></Route>
      </Routes>
    </div>
  );
}

export default App;
