import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoMail as Mail, 
  IoLockClosed as Lock, 
  IoEye as Eye, 
  IoEyeOff as EyeOff,
  IoArrowForward as ArrowRight,
  IoCheckmarkCircle as CheckCircle
} from 'react-icons/io5';
import {
  FaGithub as Github,
  FaGoogle as Chrome,
  FaUsers as Users,
  FaStar as Star,
  FaTrophy as Award,
  FaBrain as Brain,
  FaChartLine as TrendingUp
} from 'react-icons/fa';
import {
  BsChatDots as MessageCircle
} from 'react-icons/bs';
import NetworkIcon from '../components/icons/NetworkIcon';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  const stats = [
    { icon: Users, label: "활성 사용자", value: "12,847+" },
    { icon: Star, label: "평균 평점", value: "4.9/5.0" },
    { icon: TrendingUp, label: "취업 성공률", value: "87%" },
    { icon: Award, label: "분석 완료", value: "45,920+" }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "AI 포트폴리오 분석",
      description: "최첨단 AI가 100개 항목으로 포트폴리오를 분석하고 개선점을 제시합니다"
    },
    {
      icon: MessageCircle,
      title: "개인화 면접 질문",
      description: "당신의 포트폴리오를 기반으로 맞춤형 면접 질문을 생성합니다"
    },
    {
      icon: Users,
      title: "전문가 커뮤니티",
      description: "15,000명의 개발자들과 포트폴리오를 공유하고 피드백을 받아보세요"
    }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // 실제로는 API 호출
    setTimeout(() => {
      setIsLoading(false);
      // 로그인 성공 후 리다이렉트
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // 소셜 로그인 처리
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.loginPage}>
      {/* 왼쪽 - 브랜딩 및 소개 */}
      <div className={styles.loginLeftSection}>
        {/* 배경 패턴 */}
        <div className={styles.backgroundPattern}>
          <div className={`${styles.patternCircle} ${styles.patternCircle1}`}></div>
          <div className={`${styles.patternCircle} ${styles.patternCircle2}`}></div>
          <div className={`${styles.patternCircle} ${styles.patternCircle3}`}></div>
        </div>
        
        <div className={styles.leftContent}>
          {/* 로고 */}
          <div className={styles.loginLogo} onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className={styles.loginLogoIcon}>
              <NetworkIcon size={32} />
            </div>
            <span className={styles.loginLogoText}>PORTFOLIA</span>
          </div>

          {/* 메인 메시지 */}
          <div className={styles.mainMessage}>
            <h1 className={styles.loginTitle}>
              AI가 분석하는<br />
              완벽한 포트폴리오
            </h1>
            <p className={styles.loginSubtitle}>
              포트폴리오 분석 플랫폼에서
              당신의 커리어를 한 단계 업그레이드하세요.
            </p>

            {/* 통계 */}
            <div className={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <stat.icon className={styles.statIcon} />
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 혜택 */}
          <div className={styles.benefitsList}>
            {benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <benefit.icon />
                </div>
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 - 로그인 폼 */}
      <div className={styles.loginRightSection}>
        <div className={styles.formContainer}>
          {/* 모바일 로고 */}
          <div className={styles.mobileLogo} onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className={styles.mobileLogoIcon}>
              <NetworkIcon size={24} />
            </div>
            <span className={styles.mobileLogoText}>PORTFOLIA</span>
          </div>

          {/* 탭 */}
          <div className={styles.tabContainer}>
            <button
              onClick={() => setActiveTab('login')}
              className={`${styles.tabButton} ${activeTab === 'login' ? styles.tabActive : ''}`}
            >
              로그인
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`${styles.tabButton} ${activeTab === 'signup' ? styles.tabActive : ''}`}
            >
              회원가입
            </button>
          </div>

          {/* 헤더 */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {activeTab === 'login' ? '다시 오신 것을 환영합니다' : '포트폴리오 분석을 시작하세요'}
            </h2>
            <p className={styles.formSubtitle}>
              {activeTab === 'login' 
                ? '계정에 로그인하여 포트폴리오 분석을 계속하세요' 
                : '3분 만에 가입하고 무료 AI 분석을 받아보세요'
              }
            </p>
          </div>

          {/* 소셜 로그인 */}
          <div className={styles.socialLogin}>
            <button
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              className={styles.socialButton}
            >
              <Github />
              <span>GitHub로 {activeTab === 'login' ? '로그인' : '시작하기'}</span>
            </button>
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className={styles.socialButton}
            >
              <Chrome />
              <span>Google로 {activeTab === 'login' ? '로그인' : '시작하기'}</span>
            </button>
          </div>

          {/* 구분선 */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>또는</span>
          </div>

          {/* 로그인 폼 */}
          <div className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                이메일
              </label>
              <div className={styles.inputContainer}>
                <Mail className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="이메일을 입력하세요"
                  className={styles.formInput}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                비밀번호
              </label>
              <div className={styles.inputContainer}>
                <Lock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="비밀번호를 입력하세요"
                  className={styles.formInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div className={styles.signupBenefits}>
                <div className={styles.benefitsContent}>
                  <CheckCircle className={styles.benefitsIcon} />
                  <div className={styles.benefitsText}>
                    <p className={styles.benefitsTitle}>가입하면 무료로 받을 수 있어요:</p>
                    <ul className={styles.benefitsListItems}>
                      <li>• AI 포트폴리오 분석 3회</li>
                      <li>• 개인화 면접 질문 생성</li>
                      <li>• 커뮤니티 피드백 받기</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'login' && (
              <div className={styles.loginOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span>로그인 상태 유지</span>
                </label>
                <button type="button" className={styles.forgotPassword}>
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <div className={styles.loadingSpinner}></div>
              ) : (
                <>
                  <span>{activeTab === 'login' ? '로그인' : '무료로 시작하기'}</span>
                  <ArrowRight />
                </>
              )}
            </button>
          </div>

          {/* 하단 링크 */}
          <div className={styles.formFooter}>
            {activeTab === 'login' ? (
              <p>
                계정이 없으신가요?{' '}
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={styles.linkButton}
                >
                  무료로 가입하기
                </button>
              </p>
            ) : (
              <p>
                이미 계정이 있으신가요?{' '}
                <button 
                  onClick={() => setActiveTab('login')}
                  className={styles.linkButton}
                >
                  로그인하기
                </button>
              </p>
            )}
          </div>

          {/* 약관 동의 (회원가입 시에만) */}
          {activeTab === 'signup' && (
            <div className={styles.termsNotice}>
              가입하시면{' '}
              <a href="#" className={styles.termsLink}>이용약관</a>
              {' '}및{' '}
              <a href="#" className={styles.termsLink}>개인정보처리방침</a>
              에 동의하는 것으로 간주됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;