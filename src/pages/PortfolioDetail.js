import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  FaGithub,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaStar,
  FaTag,
  FaHeart,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaFileAlt
} from 'react-icons/fa';
import Navigation from '../components/Navigation';
import styles from './PortfolioDetail.module.css';

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // PDF 관련 상태
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  // 샘플 포트폴리오 데이터
  const portfolioData = {
    1: {
      id: 1,
      title: 'E-Commerce 플랫폼',
      description: '현대적인 UI/UX를 적용한 종합 쇼핑몰 플랫폼입니다. React와 Node.js를 기반으로 개발되었으며, 사용자 친화적인 인터페이스와 안전한 결제 시스템을 제공합니다.',
      fullDescription: `이 프로젝트는 현대적인 웹 기술을 활용하여 구축된 종합 전자상거래 플랫폼입니다. 

프론트엔드는 React와 TypeScript를 사용하여 개발되었으며, 반응형 디자인을 통해 모든 디바이스에서 최적화된 사용자 경험을 제공합니다. 상태 관리는 Redux Toolkit을 사용하여 효율적으로 처리하였고, React Query를 통해 서버 상태를 관리합니다.

백엔드는 Node.js와 Express.js를 기반으로 구축되었으며, MongoDB를 데이터베이스로 사용합니다. JWT를 이용한 인증 시스템과 Stripe API를 연동한 안전한 결제 시스템을 구현했습니다.

주요 기능으로는 상품 검색 및 필터링, 장바구니, 위시리스트, 주문 관리, 사용자 리뷰 시스템 등이 있습니다. 또한 관리자 대시보드를 통해 상품, 주문, 사용자를 효율적으로 관리할 수 있습니다.`,
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express.js', 'Redux', 'Stripe API'],
      category: 'Web Development',
      developmentPeriod: '2024.01 - 2024.04',
      teamSize: '4명',
      duration: '3개월',
      pdfUrl: '/sample-portfolios/portfolio-1.pdf', // PDF 파일 경로
      githubUrl: 'https://github.com/example/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.example.com',
      features: [
        {
          title: '반응형 디자인',
          description: '모든 디바이스에서 최적화된 사용자 경험 제공'
        },
        {
          title: '실시간 검색',
          description: '빠르고 정확한 상품 검색 및 필터링 기능'
        },
        {
          title: '안전한 결제',
          description: 'Stripe API를 통한 보안성 높은 결제 시스템'
        },
        {
          title: '관리자 대시보드',
          description: '상품, 주문, 사용자 통합 관리 시스템'
        }
      ],
      challenges: [
        {
          problem: '대용량 상품 데이터 처리',
          solution: 'Virtual Scrolling과 Lazy Loading을 구현하여 성능 최적화'
        },
        {
          problem: '실시간 재고 관리',
          solution: 'WebSocket을 활용한 실시간 재고 업데이트 시스템 구축'
        },
        {
          problem: '결제 시스템 보안',
          solution: 'PCI DSS 준수 및 Stripe의 보안 기능 활용'
        }
      ]
    },
    2: {
      id: 2,
      title: 'AI 기반 추천 시스템',
      description: '머신러닝 알고리즘을 활용한 개인화 추천 시스템입니다. 사용자의 행동 패턴을 분석하여 최적의 콘텐츠를 추천합니다.',
      fullDescription: `이 프로젝트는 사용자의 행동 데이터를 분석하여 개인화된 콘텐츠 추천을 제공하는 AI 기반 시스템입니다.

Python과 Django를 백엔드로 사용하여 RESTful API를 구축했으며, 프론트엔드는 React와 D3.js를 활용하여 데이터 시각화 대시보드를 개발했습니다.

머신러닝 모델은 Collaborative Filtering과 Content-based Filtering을 조합한 Hybrid 추천 시스템을 구현했으며, TensorFlow와 Scikit-learn을 사용했습니다. 

실시간 추천을 위해 Redis를 캐싱 시스템으로 활용했고, Apache Kafka를 통해 사용자 행동 데이터를 실시간으로 수집하고 처리합니다.`,
      technologies: ['Python', 'Django', 'TensorFlow', 'React', 'D3.js', 'Redis', 'Apache Kafka', 'PostgreSQL'],
      category: 'AI/Machine Learning',
      developmentPeriod: '2023.09 - 2023.12',
      teamSize: '3명',
      duration: '4개월',
      pdfUrl: '/sample-portfolios/portfolio-2.pdf', // PDF 파일 경로
      githubUrl: 'https://github.com/example/ai-recommendation',
      liveUrl: 'https://ai-recommend-demo.example.com',
      features: [
        {
          title: '개인화 추천',
          description: '사용자 행동 패턴 분석을 통한 맞춤형 콘텐츠 추천'
        },
        {
          title: '실시간 학습',
          description: '사용자 피드백을 실시간으로 반영하는 학습 시스템'
        },
        {
          title: '데이터 시각화',
          description: 'D3.js를 활용한 직관적인 추천 결과 시각화'
        },
        {
          title: '성능 분석',
          description: '추천 정확도 및 시스템 성능 모니터링 대시보드'
        }
      ],
      challenges: [
        {
          problem: 'Cold Start 문제',
          solution: '콘텐츠 기반 필터링과 인기도 기반 추천을 조합하여 해결'
        },
        {
          problem: '실시간 추천 성능',
          solution: 'Redis 캐싱과 모델 최적화를 통한 응답 시간 단축'
        },
        {
          problem: '데이터 스파시티',
          solution: 'Matrix Factorization과 Deep Learning 기법 적용'
        }
      ]
    }
  };

  useEffect(() => {
    const data = portfolioData[id];
    if (data) {
      setPortfolio(data);
    } else {
      // 포트폴리오를 찾을 수 없는 경우 메인으로 리다이렉트
      navigate('/');
    }
  }, [id, navigate]);

  // PDF 관련 함수들
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF 로드 에러:', error);
    setPdfError('포트폴리오 PDF를 불러올 수 없습니다.');
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber => Math.max(pageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber => Math.min(pageNumber + 1, numPages));
  };

  const zoomIn = () => {
    setScale(scale => Math.min(scale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(scale => Math.max(scale - 0.2, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!portfolio) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>포트폴리오를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.portfolioDetail}>
      <Navigation />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* 프로젝트 기본 정보 */}
          <section className={styles.projectInfo}>
            <div className={styles.projectHeader}>
              <div className={styles.titleSection}>
                <h1 className={styles.projectTitle}>{portfolio.title}</h1>
                <p className={styles.projectDescription}>{portfolio.description}</p>
                
                <div className={styles.projectMeta}>
                  <div className={styles.metaItem}>
                    <FaCalendarAlt className={styles.metaIcon} />
                    <span>{portfolio.developmentPeriod}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <FaUsers className={styles.metaIcon} />
                    <span>{portfolio.teamSize}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <FaClock className={styles.metaIcon} />
                    <span>{portfolio.duration}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <FaTag className={styles.metaIcon} />
                    <span>{portfolio.category}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectLinks}>
                {portfolio.githubUrl && (
                  <a 
                    href={portfolio.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                )}
                
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                >
                  <FaHeart />
                  <span>{isLiked ? '좋아요 취소' : '좋아요'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* PDF 뷰어 섹션 */}
          {portfolio.pdfUrl && (
            <section className={styles.pdfViewer}>
              <div className={styles.pdfHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaFileAlt className={styles.sectionIcon} />
                  포트폴리오 문서
                </h2>
                
                <div className={styles.pdfControls}>
                  <button 
                    onClick={zoomOut} 
                    disabled={scale <= 0.5}
                    className={styles.pdfControlButton}
                    title="축소"
                  >
                    <FaSearchMinus />
                  </button>
                  
                  <span className={styles.scaleIndicator}>
                    {Math.round(scale * 100)}%
                  </span>
                  
                  <button 
                    onClick={zoomIn} 
                    disabled={scale >= 3.0}
                    className={styles.pdfControlButton}
                    title="확대"
                  >
                    <FaSearchPlus />
                  </button>
                  
                  <button 
                    onClick={toggleFullscreen}
                    className={styles.pdfControlButton}
                    title="전체화면"
                  >
                    <FaExpand />
                  </button>
                </div>
              </div>
              
              <div className={`${styles.pdfContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
                {pdfError ? (
                  <div className={styles.pdfError}>
                    <FaFileAlt />
                    <p>{pdfError}</p>
                    <small>PDF 파일을 확인해 주세요.</small>
                  </div>
                ) : (
                  <>
                    <Document
                      file={portfolio.pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className={styles.pdfLoading}>
                          <div className={styles.spinner}></div>
                          <p>PDF를 불러오는 중...</p>
                        </div>
                      }
                      className={styles.pdfDocument}
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        scale={scale}
                        className={styles.pdfPage}
                      />
                    </Document>
                    
                    {numPages && (
                      <div className={styles.pdfNavigation}>
                        <button 
                          onClick={goToPrevPage} 
                          disabled={pageNumber <= 1}
                          className={styles.pdfNavButton}
                        >
                          <FaChevronLeft />
                          이전
                        </button>
                        
                        <span className={styles.pageInfo}>
                          {pageNumber} / {numPages}
                        </span>
                        
                        <button 
                          onClick={goToNextPage} 
                          disabled={pageNumber >= numPages}
                          className={styles.pdfNavButton}
                        >
                          다음
                          <FaChevronRight />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {isFullscreen && (
                <div className={styles.fullscreenOverlay} onClick={toggleFullscreen}>
                  <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
                    <Document
                      file={portfolio.pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      className={styles.pdfDocument}
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        scale={1.5}
                        className={styles.pdfPage}
                      />
                    </Document>
                    
                    <div className={styles.fullscreenControls}>
                      <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                        <FaChevronLeft />
                      </button>
                      <span>{pageNumber} / {numPages}</span>
                      <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                        <FaChevronRight />
                      </button>
                      <button onClick={toggleFullscreen}>닫기</button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 기술 스택 */}
          <section className={styles.techStack}>
            <h2 className={styles.sectionTitle}>
              <FaCode className={styles.sectionIcon} />
              사용 기술
            </h2>
            <div className={styles.techList}>
              {portfolio.technologies.map((tech, index) => (
                <span key={index} className={styles.techItem}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 프로젝트 상세 설명 */}
          <section className={styles.detailDescription}>
            <h2 className={styles.sectionTitle}>프로젝트 상세</h2>
            <div className={styles.descriptionContent}>
              {portfolio.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* 주요 기능 */}
          <section className={styles.features}>
            <h2 className={styles.sectionTitle}>주요 기능</h2>
            <div className={styles.featureGrid}>
              {portfolio.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 도전과 해결 */}
          <section className={styles.challenges}>
            <h2 className={styles.sectionTitle}>도전과 해결</h2>
            <div className={styles.challengeList}>
              {portfolio.challenges.map((challenge, index) => (
                <div key={index} className={styles.challengeItem}>
                  <div className={styles.challengeProblem}>
                    <h3>문제</h3>
                    <p>{challenge.problem}</p>
                  </div>
                  <div className={styles.challengeSolution}>
                    <h3>해결</h3>
                    <p>{challenge.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDetail;