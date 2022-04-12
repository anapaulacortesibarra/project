import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/videogames" element={<Home />} />
        <Route path="/videogame/:id" element={<Detail />} />
        {/* <Route path="/activity" element={<Form />} /> */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
