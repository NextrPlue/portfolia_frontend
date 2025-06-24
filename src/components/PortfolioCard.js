import React from 'react';
import { Link } from 'react-router-dom';
import { 
  IoHeart as Heart,
  IoEye as Eye,
  IoStar as Star
} from 'react-icons/io5';
import './PortfolioCard.css';

const PortfolioCard = ({ portfolio, showRank = false, rank = null }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/portfolio/${portfolio.id}`} className="portfolio-card-link">
      <div className="portfolio-card">
        <div className="portfolio-content">
          {/* 점수와 랭킹 헤더 */}
          <div className={`portfolio-score-header ${!showRank || !rank ? 'score-only' : ''}`}>
            {showRank && rank && (
              <div className="portfolio-rank">
                #{rank}
              </div>
            )}
            <div className="portfolio-score">
              {showRank ? `${portfolio.score}점` : (
                <>
                  <Star />
                  <span>{portfolio.score}</span>
                </>
              )}
            </div>
          </div>
          
          {/* 제목과 작성자 */}
          <div className="portfolio-title-section">
            <h3 className="portfolio-title">{portfolio.title}</h3>
            <p className="portfolio-author">by {portfolio.author}</p>
          </div>
          
          {portfolio.description && (
            <p className="portfolio-description">
              {portfolio.description}
            </p>
          )}
          
          <div className="portfolio-tags">
            {portfolio.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="portfolio-tag">
                {tag}
              </span>
            ))}
            {portfolio.tags.length > 3 && (
              <span className="portfolio-tag-more">
                +{portfolio.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="portfolio-footer">
            <div className="portfolio-stats">
              <span className="portfolio-stat">
                <Eye />
                <span>{portfolio.views?.toLocaleString?.() || portfolio.views}</span>
              </span>
              <span className="portfolio-stat">
                <Heart />
                <span>{portfolio.likes}</span>
              </span>
            </div>
            
            {portfolio.createdAt ? (
              <span className="portfolio-date">
                {formatDate(portfolio.createdAt)}
              </span>
            ) : (
              <span className="portfolio-link">
                자세히 보기
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;