import { useState, useEffect, useCallback } from 'react';
import PortfolioAPI from '../api/portfolioAPI';

// 포트폴리오 목록을 위한 커스텀 훅
export const usePortfolios = (initialParams = {}) => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  // 포트폴리오 데이터 가져오기
  const fetchPortfolios = useCallback(async (params = initialParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await PortfolioAPI.getPortfolios(params);
      
      if (result.success) {
        setPortfolios(result.data.portfolios);
        setPagination(result.data.pagination);
      } else {
        setError(result.error);
        setPortfolios([]);
      }
    } catch (err) {
      console.error('Failed to fetch portfolios:', err);
      setError('포트폴리오 데이터를 불러오는데 실패했습니다.');
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 검색 함수
  const searchPortfolios = useCallback(async (searchQuery, filters = {}) => {
    const params = {
      search: searchQuery,
      ...filters,
      page: 1 // 검색 시 첫 페이지로 리셋
    };
    
    await fetchPortfolios(params);
  }, [fetchPortfolios]);

  // 페이지 변경 함수
  const changePage = useCallback(async (page, currentParams = {}) => {
    const params = {
      ...currentParams,
      page
    };
    
    await fetchPortfolios(params);
  }, [fetchPortfolios]);

  // 새로고침 함수
  const refresh = useCallback(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    portfolios,
    loading,
    error,
    pagination,
    fetchPortfolios,
    searchPortfolios,
    changePage,
    refresh
  };
};

// 개별 포트폴리오를 위한 커스텀 훅
export const usePortfolio = (portfolioId) => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async (id = portfolioId) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await PortfolioAPI.getPortfolioById(id);
      
      if (result.success) {
        setPortfolio(result.data);
      } else {
        setError(result.error);
        setPortfolio(null);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setError('포트폴리오 데이터를 불러오는데 실패했습니다.');
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    portfolio,
    loading,
    error,
    refetch: fetchPortfolio
  };
};

// 카테고리를 위한 커스텀 훅
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await PortfolioAPI.getCategories();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        setError(result.error);
        setCategories([]);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('카테고리 데이터를 불러오는데 실패했습니다.');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};

// 좋아요 토글을 위한 커스텀 훅
export const useLikeToggle = () => {
  const [loading, setLoading] = useState(false);

  const toggleLike = useCallback(async (portfolioId) => {
    setLoading(true);

    try {
      const result = await PortfolioAPI.toggleLike(portfolioId);
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Failed to toggle like:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    toggleLike,
    loading
  };
};