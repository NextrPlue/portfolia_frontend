import React from 'react';
import { useNavigate } from 'react-router-dom';
import NetworkIcon from './icons/NetworkIcon';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-left">
            <div className="navigation-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <div className="logo-icon">
                <NetworkIcon size={28} />
              </div>
              <span className="logo-text">PORTFOLIA</span>
            </div>
            
            {/* 주요 액션 버튼들 */}
            <div className="navigation-buttons">
              <button 
                className="nav-button"
                onClick={() => navigate('/portfolio')}
              >
                둘러보기
              </button>
              <button 
                className="nav-button"
                onClick={() => navigate('/analysis')}
              >
                분석하기
              </button>
            </div>
          </div>
          <div className="navigation-right">
            <button 
              className="login-button"
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
            <button 
              className="signup-button"
              onClick={() => navigate('/login')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;