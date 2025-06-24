import { mockPortfolios, categories, sortOptions } from './portfolioData';

// API 응답 지연 시뮬레이션을 위한 함수
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API 클래스
class MockPortfolioAPI {
  // 포트폴리오 목록 조회
  static async getPortfolios(params = {}) {
    await delay(500); // 0.5초 지연으로 실제 API 호출 시뮬레이션
    
    const {
      search = '',
      category = 'all',
      sortBy = 'latest',
      page = 1,
      limit = 12
    } = params;

    let filteredPortfolios = [...mockPortfolios];

    // 검색 필터링
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredPortfolios = filteredPortfolios.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm) ||
        portfolio.author.toLowerCase().includes(searchTerm) ||
        portfolio.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        portfolio.description.toLowerCase().includes(searchTerm)
      );
    }

    // 카테고리 필터링
    if (category !== 'all') {
      filteredPortfolios = filteredPortfolios.filter(
        portfolio => portfolio.category === category
      );
    }

    // 정렬
    filteredPortfolios.sort((a, b) => {
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
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPortfolios = filteredPortfolios.slice(startIndex, endIndex);

    // API 응답 형태로 반환
    return {
      success: true,
      data: {
        portfolios: paginatedPortfolios,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredPortfolios.length / limit),
          totalItems: filteredPortfolios.length,
          itemsPerPage: limit
        }
      }
    };
  }

  // 개별 포트폴리오 조회
  static async getPortfolioById(id) {
    await delay(300);
    
    const portfolio = mockPortfolios.find(p => p.id === parseInt(id));
    
    if (!portfolio) {
      return {
        success: false,
        error: '포트폴리오를 찾을 수 없습니다.'
      };
    }

    return {
      success: true,
      data: portfolio
    };
  }

  // 카테고리 목록 조회
  static async getCategories() {
    await delay(200);
    
    return {
      success: true,
      data: categories
    };
  }

  // 정렬 옵션 조회
  static async getSortOptions() {
    await delay(200);
    
    return {
      success: true,
      data: sortOptions
    };
  }

  // 포트폴리오 좋아요 토글
  static async toggleLike(portfolioId) {
    await delay(300);
    
    const portfolio = mockPortfolios.find(p => p.id === parseInt(portfolioId));
    
    if (!portfolio) {
      return {
        success: false,
        error: '포트폴리오를 찾을 수 없습니다.'
      };
    }

    // 실제 구현에서는 사용자 좋아요 상태를 확인해야 함
    // 여기서는 단순히 좋아요 수를 증가/감소시킴
    const isLiked = Math.random() > 0.5; // 임시로 랜덤하게 결정
    portfolio.likes += isLiked ? 1 : -1;

    return {
      success: true,
      data: {
        portfolioId: portfolio.id,
        likes: portfolio.likes,
        isLiked
      }
    };
  }

  // 조회수 증가
  static async incrementViews(portfolioId) {
    await delay(100);
    
    const portfolio = mockPortfolios.find(p => p.id === parseInt(portfolioId));
    
    if (!portfolio) {
      return {
        success: false,
        error: '포트폴리오를 찾을 수 없습니다.'
      };
    }

    portfolio.views += 1;

    return {
      success: true,
      data: {
        portfolioId: portfolio.id,
        views: portfolio.views
      }
    };
  }
}

export default MockPortfolioAPI;