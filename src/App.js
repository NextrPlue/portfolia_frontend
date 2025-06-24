import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLandingPage from './pages/MainLandingPage';
import LoginPage from './pages/LoginPage';
import PortfolioBoard from './pages/PortfolioBoard';
import PortfolioDetail from './pages/PortfolioDetail';
import PortfolioAnalysis from './pages/PortfolioAnalysis';
import InterviewChatbot from './pages/InterviewChatbot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portfolio" element={<PortfolioBoard />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/analysis" element={<PortfolioAnalysis />} />
          <Route path="/interview" element={<InterviewChatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
