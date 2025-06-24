import axios from 'axios';
import MockPortfolioAPI from '../mock/MockPortfolioAPI';

// 환경변수 설정 (개발/프로덕션 구분)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true' || !process.env.REACT_APP_API_BASE_URL;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (인증 토큰 등 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 추후 JWT 토큰 등을 여기서 추가
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 에러 처리
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Portfolio API 서비스
class PortfolioAPI {
  // 포트폴리오 목록 조회
  static async getPortfolios(params = {}) {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for getPortfolios');
        return await MockPortfolioAPI.getPortfolios(params);
      }

      const response = await apiClient.get('/portfolios', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      return {
        success: false,
        error: error.response?.data?.message || '포트폴리오 조회 중 오류가 발생했습니다.'
      };
    }
  }

  // 개별 포트폴리오 조회
  static async getPortfolioById(id) {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for getPortfolioById');
        return await MockPortfolioAPI.getPortfolioById(id);
      }

      const response = await apiClient.get(`/portfolios/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return {
        success: false,
        error: error.response?.data?.message || '포트폴리오 조회 중 오류가 발생했습니다.'
      };
    }
  }

  // 카테고리 목록 조회
  static async getCategories() {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for getCategories');
        return await MockPortfolioAPI.getCategories();
      }

      const response = await apiClient.get('/categories');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        error: error.response?.data?.message || '카테고리 조회 중 오류가 발생했습니다.'
      };
    }
  }

  // 정렬 옵션 조회
  static async getSortOptions() {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for getSortOptions');
        return await MockPortfolioAPI.getSortOptions();
      }

      const response = await apiClient.get('/sort-options');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching sort options:', error);
      return {
        success: false,
        error: error.response?.data?.message || '정렬 옵션 조회 중 오류가 발생했습니다.'
      };
    }
  }

  // 포트폴리오 좋아요 토글
  static async toggleLike(portfolioId) {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for toggleLike');
        return await MockPortfolioAPI.toggleLike(portfolioId);
      }

      const response = await apiClient.post(`/portfolios/${portfolioId}/like`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error toggling like:', error);
      return {
        success: false,
        error: error.response?.data?.message || '좋아요 처리 중 오류가 발생했습니다.'
      };
    }
  }

  // 조회수 증가
  static async incrementViews(portfolioId) {
    try {
      if (USE_MOCK_API) {
        console.log('Using Mock API for incrementViews');
        return await MockPortfolioAPI.incrementViews(portfolioId);
      }

      const response = await apiClient.post(`/portfolios/${portfolioId}/view`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error incrementing views:', error);
      return {
        success: false,
        error: error.response?.data?.message || '조회수 업데이트 중 오류가 발생했습니다.'
      };
    }
  }

  // 포트폴리오 검색
  static async searchPortfolios(searchQuery, filters = {}) {
    try {
      const params = {
        search: searchQuery,
        ...filters
      };

      return await this.getPortfolios(params);
    } catch (error) {
      console.error('Error searching portfolios:', error);
      return {
        success: false,
        error: '검색 중 오류가 발생했습니다.'
      };
    }
  }
}

export default PortfolioAPI;