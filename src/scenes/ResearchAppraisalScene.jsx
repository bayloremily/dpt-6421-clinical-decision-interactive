import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './ResearchAppraisalScene.css'

export default function ResearchAppraisalScene() {
  const {
    goToScene,
    answers,
    handleAnswer,
    showImageModal,
    devLocation,
    updateDevLocation,
  } = useContext(QuizContext)
  const currentQuestion = devLocation.researchQuestion

  const questions = [
    {
      number: 2,
      title: 'Which quality assessment tool would you expect for a diagnostic study?',
      options: ['PEDro', 'QUADAS', 'Harvard Scale'],
      correct: 'QUADAS',
      hint: 'This tool is specifically designed for diagnostic accuracy studies.',
      showImageOn: 'correct',
      image: '/assets/table-1.png',
      imageAlt: 'QUADAS quality assessment table for diagnostic studies',
    },
    {
      number: 3,
      title: 'Severe nerve compression only on MRI without symptoms is a case of:',
      options: ['Spectrum Bias', 'Work-up Bias', 'Lack of blinding'],
      correct: 'Spectrum Bias',
      hint: 'This occurs when findings differ between asymptomatic and symptomatic populations.',
    },
    {
      number: 4,
      title: 'When appraising a diagnostic accuracy study, how should you proceed?',
      options: ['Delve into the results section', 'Go straight to conclusions', 'Skip the methods'],
      correct: 'Delve into the results section',
      hint: 'Understanding the data is critical before drawing conclusions.',
    },
    {
      number: 5,
      title:
        'Looking at the diagnostic test pattern for sensory testing, what do you observe?',
      options: [
        'Both sensitivity and specificity are good',
        'Both sensitivity and specificity are poor',
        'Sensitivity is poor and specificity is good',
      ],
      correct: 'Sensitivity is poor and specificity is good',
      hint: 'This means the test is better at ruling IN a condition than ruling it OUT.',
      showImageOn: 'correct',
      image: '/assets/table-3.png',
      imageAlt: 'Sensitivity and specificity table for diagnostic tests',
    },
    {
      number: 6,
      title: 'Sensory testing is better at:',
      options: [
        'Ruling IN lumbar radiculopathy',
        'Ruling OUT lumbar radiculopathy',
      ],
      correct: 'Ruling IN lumbar radiculopathy',
      hint: 'Think about high specificity vs high sensitivity for clinical utility.',
    },
  ]

  const currentQ = questions.find((q) => q.number === currentQuestion)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(currentQuestion, answer)
    // If correct and there's an image to show
    if (answer === currentQ.correct && currentQ.showImageOn === 'correct') {
      setTimeout(() => {
        showImageModal(
          <ImageWithPlaceholder
            src={currentQ.image}
            alt={currentQ.imageAlt}
          />
        )
      }, 500)
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion > 6) {
      goToScene('diagnosticSummary')
    } else {
      updateDevLocation({ researchQuestion: nextQuestion })
    }
  }

  const isCurrentAnswered = answers[currentQuestion] !== undefined
  const isCurrentCorrect = answers[currentQuestion] === currentQ.correct

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Research Appraisal</h1>
        <p className="subtitle">Evaluate the quality and interpret the evidence</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion - 1) / 5) * 100}%` }}
          />
        </div>

        <QuestionCard
          questionNumber={currentQ.number}
          title={currentQ.title}
          options={currentQ.options}
          correctAnswer={currentQ.correct}
          onAnswer={handleAnswerQuestion}
          isAnswered={isCurrentAnswered}
          selectedAnswer={answers[currentQuestion]}
        />

        {currentQ.hint && !isCurrentAnswered && (
          <div className="hint-box" role="status">
            <p>
              <strong>Hint:</strong> {currentQ.hint}
            </p>
          </div>
        )}

        {isCurrentAnswered && (
          <div className="question-actions">
            {isCurrentCorrect ? (
              <div className="success-message" role="status" aria-live="polite">
                <p>Great! You've understood this concept.</p>
              </div>
            ) : null}
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestion === 6 ? 'Continue' : 'Next Question'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
