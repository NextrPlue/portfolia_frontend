import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoSearch as Search,
  IoFilter as Filter,
  IoAdd as Plus,
  IoHeart as Heart,
  IoEye as Eye,
  IoTrendingUp as TrendingUp,
  IoTime as Clock,
  IoStar as Star,
  IoChevronDown as ChevronDown
} from 'react-icons/io5';
import Navigation from '../components/Navigation';
import PortfolioCard from '../components/PortfolioCard';
import styles from './PortfolioBoard.module.css';

const PortfolioBoard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // 샘플 포트폴리오 데이터
  const [portfolios] = useState([
    {
      id: 1,
      title: "AI 기반 개인화 학습 플랫폼",
      author: "김개발",
      thumbnail: "/api/placeholder/300/200",
      tags: ["React", "Node.js", "TensorFlow", "MongoDB"],
      score: 95,
      views: 2847,
      likes: 156,
      category: "ai",
      createdAt: "2025-06-20",
      description: "머신러닝을 활용한 개인화된 학습 경험을 제공하는 플랫폼입니다."
    },
    {
      id: 2,
      title: "실시간 협업 도구",
      author: "박협업", 
      thumbnail: "/api/placeholder/300/200",
      tags: ["Vue.js", "Socket.io", "Redis", "Express"],
      score: 92,
      views: 1923,
      likes: 134,
      category: "web",
      createdAt: "2025-06-18",
      description: "팀 협업을 위한 실시간 문서 편집 및 커뮤니케이션 도구입니다."
    },
    {
      id: 3,
      title: "블록체인 투표 시스템",
      author: "이블록",
      thumbnail: "/api/placeholder/300/200", 
      tags: ["Solidity", "Web3.js", "React", "IPFS"],
      score: 89,
      views: 1654,
      likes: 98,
      category: "blockchain",
      createdAt: "2025-06-15",
      description: "투명하고 안전한 블록체인 기반 전자 투표 시스템입니다."
    },
    {
      id: 4,
      title: "모바일 헬스케어 앱",
      author: "최건강",
      thumbnail: "/api/placeholder/300/200",
      tags: ["React Native", "Firebase", "TensorFlow Lite"],
      score: 88,
      views: 2156,
      likes: 167,
      category: "mobile",
      createdAt: "2025-06-12",
      description: "AI를 활용한 개인 맞춤형 건강 관리 모바일 애플리케이션입니다."
    },
    {
      id: 5,
      title: "실시간 주식 분석 대시보드",
      author: "정투자",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Python", "Django", "D3.js", "PostgreSQL"],
      score: 91,
      views: 1789,
      likes: 142,
      category: "data",
      createdAt: "2025-06-10",
      description: "실시간 주식 데이터 분석 및 시각화 대시보드입니다."
    },
    {
      id: 6,
      title: "게임 개발 포트폴리오",
      author: "김게임",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Unity", "C#", "Blender", "Photon"],
      score: 86,
      views: 1432,
      likes: 89,
      category: "game",
      createdAt: "2025-06-08",
      description: "Unity를 사용한 3D 액션 게임 개발 포트폴리오입니다."
    },
    {
      id: 7,
      title: "E-커머스 풀스택 프로젝트",
      author: "송상거래",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Next.js", "Strapi", "Stripe", "AWS"],
      score: 90,
      views: 2341,
      likes: 178,
      category: "web",
      createdAt: "2025-06-05",
      description: "현대적인 기술 스택으로 구현한 완전한 E-커머스 솔루션입니다."
    },
    {
      id: 8,
      title: "IoT 스마트홈 시스템",
      author: "홍스마트",
      thumbnail: "/api/placeholder/300/200",
      tags: ["Arduino", "Raspberry Pi", "MQTT", "React"],
      score: 87,
      views: 1567,
      likes: 123,
      category: "iot",
      createdAt: "2025-06-02",
      description: "IoT 센서와 웹 인터페이스를 결합한 스마트홈 제어 시스템입니다."
    }
  ]);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'web', label: '웹 개발' },
    { value: 'mobile', label: '모바일' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: '블록체인' },
    { value: 'data', label: '데이터 분석' },
    { value: 'game', label: '게임 개발' },
    { value: 'iot', label: 'IoT' }
  ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'score', label: '점수순' },
    { value: 'views', label: '조회순' }
  ];

  // 필터링 및 정렬 로직
  const filteredPortfolios = portfolios
    .filter(portfolio => {
      const matchesSearch = portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           portfolio.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           portfolio.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || portfolio.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return b.likes - a.likes;
        case 'score':
          return b.score - a.score;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  // 페이지네이션
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const currentPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.portfolioBoard}>
      <Navigation />
      
      {/* 헤더 섹션 */}
      <section className={styles.boardHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.boardTitle}>포트폴리오 갤러리</h1>
              <p className={styles.boardDescription}>
                개발자들의 창의적인 프로젝트를 둘러보고 영감을 얻어보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 검색 및 필터 섹션 */}
      <section className={styles.searchFilterSection}>
        <div className={styles.container}>
          <div className={styles.searchFilterContainer}>
            {/* 검색바 */}
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="프로젝트, 개발자, 기술 스택으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* 필터 및 정렬 그룹 */}
            <div className={styles.filterSortGroup}>
              {/* 필터 버튼 */}
              <button 
                className={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter />
                <span>필터</span>
                <ChevronDown className={showFilters ? styles.rotate : ''} />
              </button>

              {/* 정렬 옵션 */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* 업로드 버튼 */}
              <button className={styles.uploadButton}>
                <Plus />
                <span>업로드</span>
              </button>
            </div>
          </div>

          {/* 확장 필터 패널 */}
          {showFilters && (
            <div className={styles.filterPanel}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>카테고리</label>
                <div className={styles.filterOptions}>
                  {categories.map(category => (
                    <button
                      key={category.value}
                      className={`${styles.filterOption} ${selectedCategory === category.value ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 포트폴리오 그리드 섹션 */}
      <section className={styles.portfoliosGridSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              총 {filteredPortfolios.length}개의 포트폴리오
            </h2>
          </div>

          {/* 포트폴리오 그리드 */}
          <div className={styles.portfoliosGrid}>
            {currentPortfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                showRank={false}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              
              <div className={styles.paginationNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`${styles.paginationNumber} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioBoard;