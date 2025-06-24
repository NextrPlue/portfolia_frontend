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
      title: "보안을 중시하는 백엔드 개발자",
      author: "김보안",
      tags: ["Spring Boot", "PostgreSQL", "Redis", "AWS", "Docker"],
      score: 95,
      views: 2847,
      likes: 156,
      category: "backend",
      createdAt: "2025-06-20",
      description: "5년차 백엔드 개발자로 금융권 서비스의 보안성과 안정성을 책임지며, 대용량 트래픽 처리 경험이 풍부합니다."
    },
    {
      id: 2,
      title: "확장성을 고려하는 풀스택 개발자",
      author: "박확장",
      tags: ["React", "Node.js", "MongoDB", "Kubernetes", "GraphQL"],
      score: 92,
      views: 1923,
      likes: 134,
      category: "fullstack",
      createdAt: "2025-06-18",
      description: "스타트업에서 MVP부터 대규모 서비스까지 확장 가능한 아키텍처 설계와 구현을 전담해온 풀스택 개발자입니다."
    },
    {
      id: 3,
      title: "사용자 경험을 우선하는 프론트엔드 개발자",
      author: "이경험",
      tags: ["React", "TypeScript", "Next.js", "Tailwind", "Figma"],
      score: 89,
      views: 1654,
      likes: 98,
      category: "frontend",
      createdAt: "2025-06-15",
      description: "사용자 중심의 인터페이스 설계와 성능 최적화를 통해 우수한 사용자 경험을 제공하는 프론트엔드 전문가입니다."
    },
    {
      id: 4,
      title: "데이터 기반 의사결정을 추구하는 개발자",
      author: "최데이터",
      tags: ["Python", "TensorFlow", "Apache Spark", "Airflow", "BigQuery"],
      score: 88,
      views: 2156,
      likes: 167,
      category: "data",
      createdAt: "2025-06-12",
      description: "머신러닝과 데이터 파이프라인을 통해 비즈니스 가치를 창출하고, 데이터 기반 의사결정을 지원합니다."
    },
    {
      id: 5,
      title: "클린 코드를 추구하는 시니어 개발자",
      author: "정클린",
      tags: ["Java", "Spring", "JUnit", "SonarQube", "Jenkins"],
      score: 91,
      views: 1789,
      likes: 142,
      category: "backend",
      createdAt: "2025-06-10",
      description: "8년차 시니어 개발자로 코드 품질과 팀 문화 개선을 통해 지속 가능한 개발 환경을 구축합니다."
    },
    {
      id: 6,
      title: "모바일 네이티브 전문 개발자",
      author: "김모바일",
      tags: ["Swift", "Kotlin", "Flutter", "Firebase", "App Store"],
      score: 86,
      views: 1432,
      likes: 89,
      category: "mobile",
      createdAt: "2025-06-08",
      description: "iOS와 Android 네이티브 개발부터 크로스플랫폼까지, 모바일 앱의 전 영역을 아우르는 전문가입니다."
    },
    {
      id: 7,
      title: "클라우드 인프라 전문가",
      author: "송클라우드",
      tags: ["AWS", "Terraform", "Docker", "Kubernetes", "Prometheus"],
      score: 90,
      views: 2341,
      likes: 178,
      category: "devops",
      createdAt: "2025-06-05",
      description: "안정적이고 효율적인 클라우드 인프라 구축과 운영을 통해 개발팀의 생산성을 극대화합니다."
    },
    {
      id: 8,
      title: "게임 엔진 개발 전문가",
      author: "홍게임",
      tags: ["C++", "Unreal Engine", "DirectX", "OpenGL", "Unity"],
      score: 87,
      views: 1567,
      likes: 123,
      category: "game",
      createdAt: "2025-06-02",
      description: "고성능 게임 엔진 개발과 최적화를 통해 몰입도 높은 게임 경험을 구현하는 전문 개발자입니다."
    }
  ]);

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'backend', label: '백엔드' },
    { value: 'frontend', label: '프론트엔드' },
    { value: 'fullstack', label: '풀스택' },
    { value: 'mobile', label: '모바일' },
    { value: 'data', label: '데이터/AI' },
    { value: 'devops', label: 'DevOps/인프라' },
    { value: 'game', label: '게임 개발' }
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
                다양한 개발자들의 전문성과 경험을 살펴보고 인사이트를 발견해보세요
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
                placeholder="개발자, 전문 분야, 기술 스택으로 검색..."
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