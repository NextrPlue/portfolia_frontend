import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPaperPlane as Send, 
  FaRobot as Bot, 
  FaUser as User, 
  FaFileAlt as FileText, 
  FaClock as Clock, 
  FaMicrophone as Mic, 
  FaMicrophoneSlash as MicOff 
} from 'react-icons/fa';
import Navigation from '../components/Navigation';
import styles from './InterviewChatbot.module.css';

const InterviewChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '포트폴리오 분석이 완료되었습니다! 총 8개의 프로젝트와 12개의 기술 스택을 바탕으로 맞춤형 면접 질문을 준비했습니다. 아래 질문들로 면접 연습을 시작해보세요.',
      timestamp: new Date(),
      questions: [
        {
          id: 1,
          text: 'React를 선택한 이유와 다른 프레임워크 대비 장점을 설명해주세요.',
          difficulty: 'medium',
          category: '기술 선택',
          followUp: 'Next.js나 Vue.js와 비교했을 때 React의 차별점은 무엇인가요?'
        },
        {
          id: 2,
          text: '가장 복잡했던 프로젝트에서 어떤 기술적 문제를 해결하셨나요?',
          difficulty: 'hard',
          category: '문제 해결',
          followUp: '같은 문제가 다시 발생한다면 어떻게 예방하시겠습니까?'
        },
        {
          id: 3,
          text: 'RESTful API 설계 시 고려사항과 실제 구현 경험을 말씀해주세요.',
          difficulty: 'medium',
          category: '백엔드 개발',
          followUp: 'GraphQL과 비교했을 때 REST API의 장단점은 무엇인가요?'
        },
        {
          id: 4,
          text: '팀 프로젝트에서 코드 리뷰나 협업 도구는 어떻게 활용하셨나요?',
          difficulty: 'easy',
          category: '협업 경험',
          followUp: '의견 충돌이 있었을 때는 어떻게 해결하셨나요?'
        }
      ],
      suggestions: ['기술적 질문 더 받기', '프로젝트별 세부 질문', '실무 상황 질문', '난이도 조정하기']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionInfo, setSessionInfo] = useState({
    questionsGenerated: 4,
    duration: 0,
    difficulty: 'medium'
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionInfo(prev => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sampleQuestions = [
    {
      category: '기술 심화',
      questions: [
        'React Hook의 동작 원리와 사용 경험을 설명해주세요.',
        'RESTful API 설계 시 고려한 사항과 실제 구현 방법은?',
        '데이터베이스 정규화와 성능 최적화 경험을 말씀해주세요.'
      ]
    },
    {
      category: '프로젝트 심화',
      questions: [
        '가장 복잡했던 기술적 문제와 해결 과정은?',
        '팀 프로젝트에서의 역할과 기여도를 구체적으로 설명해주세요.',
        '코드 리뷰와 품질 관리를 어떻게 수행하셨나요?'
      ]
    },
    {
      category: '실무 대응',
      questions: [
        '급한 버그 발생 시 대응 방법과 예방 전략은?',
        '새로운 기술 도입 시 학습 방법과 팀 전파 과정은?',
        '인수인계나 비즈니스 요구사항 변경 시 대응 사례는?'
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setSessionInfo(prev => ({ 
        ...prev, 
        questionsGenerated: prev.questionsGenerated + (botResponse.questions ? botResponse.questions.length : 0)
      }));
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let response = {
      id: messages.length + 2,
      type: 'bot',
      content: '',
      timestamp: new Date(),
      questions: [],
      suggestions: []
    };

    if (lowerInput.includes('react') || lowerInput.includes('javascript') || lowerInput.includes('프론트엔드')) {
      response.content = '프론트엔드 기술에 대한 심화 단계 질문을 준비했습니다. 당신의 포트폴리오에서 확인된 React 프로젝트를 기반으로 합니다.';
      response.questions = [
        { 
          id: 5, 
          text: 'React Hook의 동작 원리와 사용하면서 마주쳤던 문제는 무엇인가요?',
          difficulty: 'hard',
          category: '심화 기술',
          followUp: 'Custom Hook을 만들어 사용해본 경험이 있나요?'
        },
        { 
          id: 6, 
          text: '상태 관리 라이브러리 선택 기준과 실제 프로젝트 적용 사례를 설명해주세요.',
          difficulty: 'medium',
          category: '아키텍처 설계',
          followUp: '대규모 애플리케이션에서 상태 관리를 어떻게 기획하시나요?'
        }
      ];
      response.suggestions = ['비동기 처리 질문', '성능 최적화 질문', '백엔드 연동 질문'];
    } else if (lowerInput.includes('백엔드') || lowerInput.includes('api') || lowerInput.includes('데이터베이스')) {
      response.content = '백엔드 개발 경험을 바탕으로 심도 있는 질문을 준비했습니다.';
      response.questions = [
        {
          id: 7,
          text: '데이터베이스 설계와 정규화 과정에서 고려한 사항을 설명해주세요.',
          difficulty: 'hard',
          category: '데이터베이스 설계',
          followUp: 'N+1 문제를 해결해본 경험이 있나요?'
        },
        {
          id: 8,
          text: 'API 서버의 인증/인가 시스템을 어떻게 구현하셨나요?',
          difficulty: 'medium',
          category: '보안',
          followUp: 'JWT와 세션 비교 시 장단점은 무엇인가요?'
        }
      ];
      response.suggestions = ['성능 최적화 질문', '보안 관련 질문', '배포 경험 질문'];
    } else if (lowerInput.includes('협업') || lowerInput.includes('팀') || lowerInput.includes('리더십')) {
      response.content = '협업과 리더십 경험에 대한 심화 질문입니다.';
      response.questions = [
        {
          id: 9,
          text: '프로젝트 일정이 지연될 때 팀을 어떻게 이끔었나요?',
          difficulty: 'medium',
          category: '프로젝트 관리',
          followUp: '스크럼이나 애자일 방법론을 적용해본 경험이 있나요?'
        },
        {
          id: 10,
          text: '기술적 의사결정에서 다른 팀원들을 설득한 경험이 있나요?',
          difficulty: 'medium',
          category: '의사소통',
          followUp: '기술 선택에서 가장 중요하게 생각하는 기준은 무엇인가요?'
        }
      ];
      response.suggestions = ['간접 경험 질문', '미래 계획 질문', '기술적 질문'];
    } else {
      response.content = '포트폴리오 내용을 바탕으로 추가 맞춤형 질문을 준비했습니다.';
      response.questions = [
        {
          id: 11,
          text: '가장 인상 깊었던 프로젝트의 기술적 역량을 자세히 설명해주세요.',
          difficulty: 'medium',
          category: '프로젝트 심화',
          followUp: '이 프로젝트에서 얻은 교훈을 다른 프로젝트에 어떻게 적용하셨나요?'
        },
        {
          id: 12,
          text: '코드 품질 향상을 위해 어떤 노력을 하셨나요?',
          difficulty: 'medium',
          category: '코드 품질',
          followUp: '리팩토링 경험과 그 결과를 알려주세요.'
        }
      ];
      response.suggestions = ['심화 기술 질문', '실무 상황 질문', '난이도 높이기'];
    }

    return response;
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  return (
    <div className={styles.interviewChatbot}>
      {/* 네비게이션 */}
      <Navigation />
      
      <div className={styles.chatContainer}>
        {/* 사이드바 */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.sidebarTitle}>면접 연습 도우미</h1>
            <p className={styles.sidebarSubtitle}>포트폴리오 분석을 바탕으로 준비된 맞춤형 면접 질문으로 연습하세요</p>
          </div>

          {/* 세션 정보 */}
          <div className={styles.sessionInfo}>
            <h3 className={styles.sessionTitle}>세션 정보</h3>
            <div className={styles.sessionStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>생성된 질문</span>
                <span className={styles.statValue}>{sessionInfo.questionsGenerated}개</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>소요 시간</span>
                <span className={styles.statValue}>{formatTime(sessionInfo.duration)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>난이도</span>
                <span className={styles.statValue}>{sessionInfo.difficulty}</span>
              </div>
            </div>
          </div>

          {/* 질문 카테고리 */}
          <div className={styles.categories}>
            <h3 className={styles.categoriesTitle}>질문 카테고리</h3>
            <div className={styles.categoryList}>
              {sampleQuestions.map((category, index) => (
                <div key={index} className={styles.categoryItem}>
                  <h4 className={styles.categoryName}>{category.category}</h4>
                  <p className={styles.categoryCount}>{category.questions.length}개 질문</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 채팅 영역 */}
        <div className={styles.chatArea}>
          {/* 채팅 헤더 */}
          <div className={styles.chatHeader}>
            <div className={styles.botInfo}>
              <div className={styles.botAvatar}>
                <Bot className={styles.botIcon} />
              </div>
              <div className={styles.botDetails}>
                <h2 className={styles.botName}>면접 AI 어시스턴트</h2>
                <p className={styles.botStatus}>온라인</p>
              </div>
            </div>
            <div className={styles.sessionTimer}>
              <Clock className={styles.timerIcon} />
              <span className={styles.timerText}>{formatTime(sessionInfo.duration)}</span>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className={styles.messagesArea}>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.messageWrapper} ${message.type === 'user' ? styles.userMessage : styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <div className={styles.messageAvatar}>
                      {message.type === 'user' ? 
                        <User className={styles.avatarIcon} /> : 
                        <Bot className={styles.avatarIcon} />
                      }
                    </div>
                    <div className={styles.messageBubble}>
                      <p className={styles.messageText}>{message.content}</p>
                      
                      {/* 파일 표시 */}
                      {message.file && (
                        <div className={styles.fileDisplay}>
                          <div className={styles.fileInfo}>
                            <FileText className={styles.fileIcon} />
                            <span className={styles.fileName}>{message.file.name}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* 질문 리스트 */}
                      {message.questions && message.questions.length > 0 && (
                        <div className={styles.questionsList}>
                          {message.questions.map((question) => (
                            <div key={question.id} className={styles.questionCard}>
                              <div className={styles.questionHeader}>
                                <span className={styles.questionText}>{question.text}</span>
                                <span className={`${styles.difficultyBadge} ${styles[question.difficulty]}`}>
                                  {question.difficulty}
                                </span>
                              </div>
                              <div className={styles.questionMeta}>
                                <span className={styles.questionCategory}>카테고리: {question.category}</span>
                              </div>
                              {question.followUp && (
                                <div className={styles.followUpQuestion}>
                                  <strong>추가 질문:</strong> {question.followUp}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* 제안사항 */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className={styles.suggestions}>
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={styles.suggestionButton}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <div className={styles.messageTimestamp}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* 타이핑 표시 */}
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <div className={styles.messageAvatar}>
                      <Bot className={styles.avatarIcon} />
                    </div>
                    <div className={styles.messageBubble}>
                      <div className={styles.typingIndicator}>
                        <div className={styles.typingDot}></div>
                        <div className={styles.typingDot}></div>
                        <div className={styles.typingDot}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <div className={styles.textareaContainer}>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="추가 질문 요청이나 특정 기술/프로젝트에 대한 심화 질문을 입력하세요..."
                  className={styles.messageInput}
                  rows="3"
                />
              </div>
              <div className={styles.inputActions}>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${styles.recordButton} ${isRecording ? styles.recording : ''}`}
                >
                  {isRecording ? <MicOff className={styles.micIcon} /> : <Mic className={styles.micIcon} />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={styles.sendButton}
                >
                  <Send className={styles.sendIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewChatbot;