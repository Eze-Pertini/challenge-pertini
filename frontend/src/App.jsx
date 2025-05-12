import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewTask from './pages/NewTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
