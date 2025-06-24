import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoSparkles as Sparkles,
  IoChevronForward as ChevronRight,
} from 'react-icons/io5';
import {
  FaUsers as Users,
  FaBrain as Brain,
  FaUpload as Upload
} from 'react-icons/fa';
import {
  BsChatDots as MessageCircle
} from 'react-icons/bs';
import Navigation from '../components/Navigation';
import PortfolioCard from '../components/PortfolioCard';
import NetworkIcon from '../components/icons/NetworkIcon';
import styles from './MainLandingPage.module.css';

const MainLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalUsers: 12847,
    portfoliosAnalyzed: 45920,
    questionsGenerated: 128403
  });

  const features = [
    {
      icon: Brain,
      title: "AI 포트폴리오 분석",
      description: "AI가 당신의 포트폴리오를 종합 분석하고 개선점을 제시합니다",
      details: "5개 카테고리 100개 항목 분석"
    },
    {
      icon: MessageCircle,
      title: "면접 질문 생성",
      description: "포트폴리오 기반으로 예상 면접 질문을 생성하고 답변을 연습하세요",
      details: "개인화된 1:1 면접 코칭"
    },
    {
      icon: Users,
      title: "포트폴리오 공유",
      description: "다른 개발자들과 포트폴리오를 공유하고 피드백을 주고받으세요",
      details: "15,000+ 개발자 커뮤니티"
    }
  ];

  const featuredPortfolios = [
    {
      id: 1,
      title: "AI 기반 개인화 학습 플랫폼",
      author: "김개발",
      thumbnail: "/api/placeholder/300/200",
      tags: ["React", "Node.js", "TensorFlow"],
      score: 95,
      views: 2847,
      likes: 156
    },
    {
      id: 2,
      title: "실시간 협업 도구",
      author: "박협업", 
      thumbnail: "/api/placeholder/300/200",
      tags: ["Vue.js", "Socket.io", "MongoDB"],
      score: 92,
      views: 1923,
      likes: 134
    },
    {
      id: 3,
      title: "블록체인 투표 시스템",
      author: "이블록",
      thumbnail: "/api/placeholder/300/200", 
      tags: ["Solidity", "Web3.js", "React"],
      score: 89,
      views: 1654,
      likes: 98
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        portfoliosAnalyzed: prev.portfoliosAnalyzed + Math.floor(Math.random() * 5),
        questionsGenerated: prev.questionsGenerated + Math.floor(Math.random() * 10)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.mainLandingPage}>
      {/* 네비게이션 */}
      <Navigation />

      {/* 히어로 섹션 */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroBadge}>
                <Sparkles />
                <span>AI 기반 포트폴리오 분석 플랫폼</span>
              </div>
              <h1 className={styles.heroTitle}>
                AI가 분석하는<br />
                <span className={styles.heroTitleGradient}>
                  완벽한 포트폴리오
                </span>
              </h1>
              <p className={styles.heroDescription}>
                AI 기술로 포트폴리오를 분석하고, 개인화된 면접 질문을 생성하며, 
                커뮤니티에서 피드백을 받아보세요!
              </p>
              <div className={styles.heroButtons}>
                <button 
                  className={styles.heroButtonPrimary}
                  onClick={() => navigate('/login')}
                >
                  <Upload />
                  <span>무료로 분석 시작하기</span>
                </button>
              </div>
            </div>
            
            <div className={styles.dashboardMockup}>
              {/* 메인 대시보드 목업 */}
              <div className={styles.dashboardCard}>
                <div className={styles.dashboardHeader}>
                  <h3 className={styles.dashboardTitle}>포트폴리오 분석 결과</h3>
                  <span className={styles.dashboardBadge}>
                    우수
                  </span>
                </div>
                
                {/* 대시보드 콘텐츠 - 차트와 카테고리를 좌우로 배치 */}
                <div className={styles.dashboardContent}>
                  {/* 점수 차트 */}
                  <div className={styles.scoreChart}>
                    <svg viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#e5e7eb" strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#10b981" strokeWidth="2"
                        strokeDasharray="85, 100"
                      />
                    </svg>
                    <div className={styles.scoreNumber}>
                      <span>85</span>
                    </div>
                  </div>
                  
                  {/* 카테고리 점수 */}
                  <div className={styles.categoryScores}>
                    {[
                      { name: "기술 역량", score: 90, color: "progressBlue" },
                      { name: "프로젝트 완성도", score: 85, color: "progressGreen" },
                      { name: "창의성", score: 80, color: "progressPurple" }
                    ].map((item, index) => (
                      <div key={index} className={styles.categoryScore}>
                        <span className={styles.categoryName}>{item.name}</span>
                        <div className={styles.categoryScoreRight}>
                          <div className={styles.progressBar}>
                            <div 
                              className={`${styles.progressFill} ${styles[item.color]}`}
                              style={{width: `${item.score}%`}}
                            ></div>
                          </div>
                          <span className={styles.categoryScoreNumber}>{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* 실시간 통계 */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.statBlue}`}>{stats.totalUsers.toLocaleString()}+</div>
                <div className={styles.heroStatLabel}>활성 사용자</div>
              </div>
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.statGreen}`}>{stats.portfoliosAnalyzed.toLocaleString()}+</div>
                <div className={styles.heroStatLabel}>분석 완료</div>
              </div>
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.statPurple}`}>{stats.questionsGenerated.toLocaleString()}+</div>
                <div className={styles.heroStatLabel}>면접 질문</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>
              포트폴리오 성공의 모든 것
            </h2>
            <p className={styles.featuresDescription}>
              AI 분석부터 면접 준비, 커뮤니티 피드백까지. 
              개발자 커리어 성장에 필요한 모든 도구를 한 곳에서 만나보세요.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureHeader}>
                  <div className={styles.featureIcon}>
                    <feature.icon />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                </div>
                <p className={styles.featureDescription}>{feature.description}</p>
                <div className={styles.featureDetails}>{feature.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 포트폴리오 섹션 */}
      <section className={styles.portfoliosSection}>
        <div className={styles.container}>
          <div className={styles.portfoliosHeader}>
            <div>
              <h2 className={styles.portfoliosTitle}>
                이번 주 추천 포트폴리오
              </h2>
              <p className={styles.portfoliosDescription}>
                높은 점수를 받은 우수한 포트폴리오들을 만나보세요
              </p>
            </div>
            <button 
              className={styles.portfoliosViewAll}
              onClick={() => navigate('/portfolio')}
            >
              <span>전체 보기</span>
              <ChevronRight />
            </button>
          </div>

          <div className={styles.portfoliosGrid}>
            {featuredPortfolios.map((portfolio, index) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                showRank={true}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <NetworkIcon size={24} />
              </div>
              <span className={styles.footerLogoText}>PORTFOLIA</span>
            </div>
            <p className={styles.footerDescription}>
              AI 기반 포트폴리오 분석으로 개발자의 성장을 돕습니다.
            </p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.footerSocialLink}>
                <svg viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className={styles.footerSocialLink}>
                <svg viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footerDivider}>
            <p>&copy; 2025 PORTFOLIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLandingPage;