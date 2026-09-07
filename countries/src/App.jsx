import { BrowserRouter, Routes, Route } from 'react-router';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/pays/:code" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
