import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUpload, 
  FaFileAlt, 
  FaExclamationCircle, 
  FaCheckCircle, 
  FaChartLine,
  FaQuestionCircle,
  FaLightbulb,
  FaShare
} from 'react-icons/fa';
import Navigation from '../components/Navigation';
import styles from './PortfolioAnalysis.module.css';

const PortfolioAnalysis = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      // 분석 시뮬레이션
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const handleStartInterview = () => {
    navigate('/interview');
  };

  const analysisData = {
    overallScore: 85,
    strengths: [
      "프로젝트 다양성이 우수함",
      "기술 스택 설명이 상세함",
      "시각적 디자인이 깔끔함",
      "성과 지표가 구체적임"
    ],
    improvements: [
      "팀 프로젝트 경험 추가 필요",
      "문제 해결 과정 보완",
      "사용자 피드백 반영 사례 부족",
      "코드 품질 개선 사례 필요"
    ],
    categories: [
      { name: "기술 역량", score: 90, color: "blue" },
      { name: "프로젝트 완성도", score: 85, color: "green" },
      { name: "창의성", score: 80, color: "purple" },
      { name: "협업 능력", score: 70, color: "orange" },
      { name: "문서화", score: 88, color: "indigo" }
    ],
    interviewQuestions: [
      "이 프로젝트에서 가장 어려웠던 기술적 문제는 무엇이었나요?",
      "React를 선택한 이유와 다른 프레임워크와의 차이점을 설명해주세요.",
      "프로젝트 진행 중 발생한 문제를 어떻게 해결했는지 구체적인 사례를 말씀해주세요.",
      "향후 이 프로젝트를 어떻게 발전시킬 계획인가요?",
      "팀원들과의 협업에서 어려움은 없었나요? 어떻게 극복했나요?",
      "가장 자신 있는 기술 스택은 무엇이고, 왜 그렇게 생각하시나요?",
      "코드 리뷰나 테스트 코드 작성 경험이 있다면 설명해주세요."
    ]
  };

  return (
    <div className={styles.portfolioAnalysis}>
      {/* 네비게이션 */}
      <Navigation />
      
      {/* 헤더 섹션 */}
      <section className={styles.analysisHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.analysisTitle}>포트폴리오 분석 및 피드백</h1>
              <p className={styles.analysisSubtitle}>AI가 당신의 포트폴리오를 분석하고 전문적인 피드백을 제공합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 섹션 */}
      <section className={styles.analysisMainSection}>
        <div className={styles.container}>
          <div className={styles.analysisContent}>
            {/* 파일 업로드 섹션 */}
            <div className={styles.uploadSection}>
              <div className={styles.uploadCard}>
                <h2 className={styles.uploadTitle}>파일 업로드</h2>
                
                {!uploadedFile ? (
                  <div className={styles.uploadArea}>
                    <FaUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>포트폴리오 파일을 드래그하거나 클릭하여 업로드</p>
                    <p className={styles.uploadSubtext}>PDF 파일 지원 (최대 10MB)</p>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className={styles.uploadInput}
                      id="file-upload"
                      accept=".pdf"
                    />
                    <label htmlFor="file-upload" className={styles.uploadButton}>
                      파일 선택
                    </label>
                  </div>
                ) : (
                  <div className={styles.fileInfo}>
                    <div className={styles.fileDetails}>
                      <FaFileAlt className={styles.fileIcon} />
                      <div>
                        <p className={styles.fileName}>{uploadedFile.name}</p>
                        <p className={styles.fileSize}>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {isAnalyzing && (
                      <div className={styles.analyzing}>
                        <div className={styles.analyzingText}>
                          <div className={styles.spinner}></div>
                          <span>분석 중...</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill}></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 분석 통계 */}
              {analysisComplete && (
                <div className={styles.statsCard}>
                  <h3 className={styles.statsTitle}>분석 통계</h3>
                  <div className={styles.statsList}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>총 페이지</span>
                      <span className={styles.statValue}>24페이지</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>프로젝트 수</span>
                      <span className={styles.statValue}>8개</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>기술 스택</span>
                      <span className={styles.statValue}>12개</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>분석 시간</span>
                      <span className={styles.statValue}>3초</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 분석 결과 메인 섹션 */}
            <div className={styles.resultsSection}>
              {!analysisComplete ? (
                <div className={styles.emptyState}>
                  <FaFileAlt className={styles.emptyIcon} />
                  <h3 className={styles.emptyTitle}>분석을 시작하세요</h3>
                  <p className={styles.emptyText}>포트폴리오 파일을 업로드하면 AI가 자동으로 분석합니다</p>
                </div>
              ) : (
                <div className={styles.resultsContent}>
                  {/* 종합 점수 */}
                  <div className={styles.scoreCard}>
                    <div className={styles.scoreHeader}>
                      <h3 className={styles.scoreTitle}>종합 점수</h3>
                      <button className={styles.downloadButton}>
                      <FaShare />
                      <span>포트폴리오 개시하기</span>
                      </button>
                    </div>
                    <div className={styles.scoreContent}>
                      <div className={styles.scoreCircle}>
                        <svg className={styles.circleChart} viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray={`${analysisData.overallScore}, 100`}
                          />
                        </svg>
                        <div className={styles.scoreNumber}>{analysisData.overallScore}</div>
                      </div>
                      <div className={styles.scoreDetails}>
                        <p className={styles.scoreGrade}>우수한 포트폴리오</p>
                        <p className={styles.scoreDescription}>체계적으로 정리된 전문적인 포트폴리오입니다</p>
                      </div>
                    </div>
                  </div>

                  {/* 카테고리별 점수 */}
                  <div className={styles.categoriesCard}>
                    <h3 className={styles.categoriesTitle}>카테고리별 평가</h3>
                    <div className={styles.categoriesList}>
                      {analysisData.categories.map((category, index) => (
                        <div key={index} className={styles.categoryItem}>
                          <div className={styles.categoryHeader}>
                            <span className={styles.categoryName}>{category.name}</span>
                            <span className={styles.categoryScore}>{category.score}점</span>
                          </div>
                          <div className={styles.categoryProgress}>
                            <div 
                              className={`${styles.categoryFill} ${styles[category.color]}`}
                              style={{width: `${category.score}%`}}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 강점과 개선사항 */}
                  <div className={styles.feedbackGrid}>
                    <div className={styles.strengthsCard}>
                      <div className={styles.feedbackHeader}>
                        <FaCheckCircle className={`${styles.feedbackIcon} ${styles.success}`} />
                        <h3 className={styles.feedbackTitle}>강점</h3>
                      </div>
                      <ul className={styles.feedbackList}>
                        {analysisData.strengths.map((strength, index) => (
                          <li key={index} className={styles.feedbackItem}>
                            <div className={`${styles.feedbackBullet} ${styles.success}`}></div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.improvementsCard}>
                      <div className={styles.feedbackHeader}>
                        <FaExclamationCircle className={`${styles.feedbackIcon} ${styles.warning}`} />
                        <h3 className={styles.feedbackTitle}>개선사항</h3>
                      </div>
                      <ul className={styles.feedbackList}>
                        {analysisData.improvements.map((improvement, index) => (
                          <li key={index} className={styles.feedbackItem}>
                            <div className={`${styles.feedbackBullet} ${styles.warning}`}></div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 상세 피드백 */}
                  <div className={styles.detailedFeedback}>
                    <h3 className={styles.detailedTitle}>상세 피드백</h3>
                    <div className={styles.detailedContent}>
                      <p className={styles.feedbackParagraph}>
                        전반적으로 <strong>우수한 포트폴리오</strong>입니다. 기술적 역량과 프로젝트 완성도가 높은 수준을 보여주고 있으며, 
                        특히 다양한 기술 스택을 활용한 프로젝트들이 인상적입니다.
                      </p>
                      <p className={styles.feedbackParagraph}>
                        <strong>기술 역량 부분</strong>에서는 최신 프레임워크와 라이브러리를 적절히 활용하고 있으며, 
                        코드의 구조화와 최적화에 대한 이해도가 높습니다. React, Node.js, Python 등의 기술 스택을 
                        프로젝트 성격에 맞게 잘 선택하여 사용하고 있습니다.
                      </p>
                      <p className={styles.feedbackParagraph}>
                        <strong>개선이 필요한 부분</strong>으로는 팀 프로젝트 경험이 부족해 보입니다. 협업 도구 사용, 
                        코드 리뷰, 버전 관리 등 실무에서 중요한 협업 능력을 보여줄 수 있는 사례를 추가하는 것을 권장합니다.
                      </p>
                      <p className={styles.feedbackParagraph}>
                        또한 사용자 피드백을 바탕으로 한 개선 사례나 성능 최적화 경험을 추가하면 
                        더욱 완성도 높은 포트폴리오가 될 것입니다.
                      </p>
                    </div>
                  </div>

                  {/* 추천 액션 */}
                  <div className={styles.recommendations}>
                    <div className={styles.recommendationsHeader}>
                      <FaChartLine className={styles.recommendationsIcon} />
                      <h3 className={styles.recommendationsTitle}>다음 단계 추천</h3>
                    </div>
                    <div className={styles.recommendationsGrid}>
                      <div className={styles.recommendationCard}>
                        <h4 className={styles.recommendationTitle}>팀 프로젝트 추가</h4>
                        <p className={styles.recommendationText}>협업 경험을 보여줄 수 있는 팀 프로젝트를 1-2개 추가하세요</p>
                      </div>
                      <div className={styles.recommendationCard}>
                        <h4 className={styles.recommendationTitle}>성과 지표 보완</h4>
                        <p className={styles.recommendationText}>각 프로젝트의 구체적인 성과와 학습 내용을 명시하세요</p>
                      </div>
                    </div>
                  </div>

                  {/* AI 추천 면접 질문 */}
                  <div className={styles.interviewQuestions}>
                    <div className={styles.interviewHeader}>
                      <div className={styles.interviewTitleGroup}>
                        <FaQuestionCircle className={styles.interviewIcon} />
                        <h3 className={styles.interviewTitle}>AI 추천 면접 질문</h3>
                      </div>
                      <button className={styles.interviewStartButton} onClick={handleStartInterview}>
                        <FaQuestionCircle />
                        <span>AI 면접 시작하기</span>
                      </button>
                    </div>
                    <div className={styles.questionsList}>
                      {analysisData.interviewQuestions.map((question, index) => (
                        <div key={index} className={styles.questionItem}>
                          <div className={styles.questionNumber}>
                            Q{index + 1}
                          </div>
                          <p className={styles.questionText}>{question}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.interviewTip}>
                      <div className={styles.tipHeader}>
                        <FaLightbulb className={styles.tipIcon} />
                        <span className={styles.tipTitle}>면접 팁</span>
                      </div>
                      <p className={styles.tipText}>
                        각 질문에 대해 STAR 방법론(Situation, Task, Action, Result)을 활용하여 
                        구체적인 사례와 성과를 포함한 답변을 준비해보세요.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioAnalysis;