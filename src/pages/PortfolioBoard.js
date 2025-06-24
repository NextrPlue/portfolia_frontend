import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoSearch as Search,
  IoFilter as Filter,
  IoAdd as Plus,
  IoChevronDown as ChevronDown,

} from 'react-icons/io5';
import Navigation from '../components/Navigation';
import PortfolioCard from '../components/PortfolioCard';
import { usePortfolios, useCategories } from '../hooks/usePortfolio';
import { sortOptions } from '../mock/portfolioData';
import styles from './PortfolioBoard.module.css';

const PortfolioBoard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // 커스텀 훅을 사용하여 포트폴리오 데이터 관리
  const {
    portfolios,
    loading: portfoliosLoading,
    error: portfoliosError,
    pagination,
    fetchPortfolios,
    searchPortfolios,
    changePage,
    refresh
  } = usePortfolios();

  // 카테고리 데이터 관리
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();

  // 검색 및 필터 변경 시 데이터 다시 로드
  useEffect(() => {
    const params = {
      search: searchTerm,
      category: selectedCategory,
      sortBy: sortBy,
      page: 1,
      limit: itemsPerPage
    };

    const timeoutId = setTimeout(() => {
      fetchPortfolios(params);
    }, 300); // 디바운싱: 300ms 후에 검색 실행

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, sortBy, fetchPortfolios]);

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    const params = {
      search: searchTerm,
      category: selectedCategory,
      sortBy: sortBy,
      page: page,
      limit: itemsPerPage
    };
    changePage(page, params);
  };

  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 카테고리 변경 처리
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // 정렬 옵션 변경 처리
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };



  // 로딩 컴포넌트
  const LoadingSpinner = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>포트폴리오를 불러오는 중...</p>
    </div>
  );

  // 에러 컴포넌트
  const ErrorMessage = ({ message, onRetry }) => (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{message}</p>
      <button onClick={onRetry} className={styles.retryButton}>
        다시 시도
      </button>
    </div>
  );

  // 빈 결과 컴포넌트
  const EmptyResults = () => (
    <div className={styles.emptyContainer}>
      <p className={styles.emptyMessage}>
        {searchTerm || selectedCategory !== 'all'
          ? '검색 조건에 맞는 포트폴리오가 없습니다.'
          : '등록된 포트폴리오가 없습니다.'}
      </p>
      {(searchTerm || selectedCategory !== 'all') && (
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}
          className={styles.clearFiltersButton}
        >
          필터 초기화
        </button>
      )}
    </div>
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
                onChange={handleSearchChange}
                className={styles.searchInput}
                disabled={portfoliosLoading}
              />
            </div>

            {/* 필터 및 정렬 그룹 */}
            <div className={styles.filterSortGroup}>
              {/* 필터 버튼 */}
              <button
                className={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
                disabled={categoriesLoading}
              >
                <Filter />
                <span>필터</span>
                <ChevronDown className={showFilters ? styles.rotate : ''} />
              </button>

              {/* 정렬 옵션 */}
              <select
                value={sortBy}
                onChange={handleSortChange}
                className={styles.sortSelect}
                disabled={portfoliosLoading}
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
                {categoriesLoading ? (
                  <div className={styles.filterLoading}>카테고리 로딩 중...</div>
                ) : categoriesError ? (
                  <div className={styles.filterError}>카테고리 로드 실패</div>
                ) : (
                  <div className={styles.filterOptions}>
                    {categories.map(category => (
                      <button
                        key={category.value}
                        className={`${styles.filterOption} ${selectedCategory === category.value ? styles.active : ''}`}
                        onClick={() => handleCategoryChange(category.value)}
                        disabled={portfoliosLoading}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 포트폴리오 그리드 섹션 */}
      <section className={styles.portfoliosGridSection}>
        <div className={styles.container}>
          {/* 로딩 상태 */}
          {portfoliosLoading && <LoadingSpinner />}

          {/* 에러 상태 */}
          {portfoliosError && !portfoliosLoading && (
            <ErrorMessage
              message={portfoliosError}
              onRetry={() => refresh()}
            />
          )}

          {/* 정상 데이터 표시 */}
          {!portfoliosLoading && !portfoliosError && (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  총 {pagination.totalItems}개의 포트폴리오
                </h2>
              </div>

              {/* 포트폴리오 그리드 또는 빈 결과 */}
              {portfolios.length > 0 ? (
                <div className={styles.portfoliosGrid}>
                  {portfolios.map((portfolio) => (
                    <PortfolioCard
                      key={portfolio.id}
                      portfolio={portfolio}
                      showRank={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyResults />
              )}

              {/* 페이지네이션 */}
              {pagination.totalPages > 1 && portfolios.length > 0 && (
                <div className={styles.pagination}>
                  <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    이전
                  </button>

                  <div className={styles.paginationNumbers}>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`${styles.paginationNumber} ${pagination.currentPage === page ? styles.active : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className={styles.paginationButton}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioBoard;