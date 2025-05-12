import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewTask from './pages/NewTask';
import EditTask from "./pages/EditTask";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
