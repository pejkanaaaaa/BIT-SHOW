import './App.css';
import { Header } from './components/Header/Header';
import { LandingPage } from './components/LandingPage/LandingPage';
import { ShowInfoPage } from './components/ShowInfoPage/ShowInfoPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/show/:id" element={<ShowInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
