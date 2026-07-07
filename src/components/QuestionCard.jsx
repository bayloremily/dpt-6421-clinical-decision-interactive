import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import './QuestionCard.css'

export default function QuestionCard({
  questionNumber,
  title,
  options,
  correctAnswer,
  onAnswer,
  isAnswered,
  selectedAnswer,
}) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState('')
  const hideFeedbackTimeoutRef = useRef(null)

  useEffect(() => {
    setShowFeedback(false)
    setFeedback('')
    setFeedbackType('')

    if (hideFeedbackTimeoutRef.current) {
      window.clearTimeout(hideFeedbackTimeoutRef.current)
      hideFeedbackTimeoutRef.current = null
    }
  }, [questionNumber])

  useEffect(() => {
    return () => {
      if (hideFeedbackTimeoutRef.current) {
        window.clearTimeout(hideFeedbackTimeoutRef.current)
      }
    }
  }, [])

  const handleOptionClick = (option) => {
    if (isAnswered) return

    if (option === correctAnswer) {
      setFeedback('Correct! Well done.')
      setFeedbackType('success')
      setShowFeedback(true)
      onAnswer(option)
    } else {
      setFeedback('Incorrect. Try again.')
      setFeedbackType('error')
      setShowFeedback(true)
      // Clear feedback after 2 seconds if wrong
      hideFeedbackTimeoutRef.current = window.setTimeout(() => {
        setShowFeedback(false)
        setFeedback('')
        setFeedbackType('')
        hideFeedbackTimeoutRef.current = null
      }, 2000)
    }
  }

  return (
    <Card variant="outlined" className="question-card">
      <div className="question-header">
        <h3 className="question-number">Question {questionNumber}</h3>
        <h2 className="question-title">{title}</h2>
      </div>

      <div className="question-options">
        {options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index) // A, B, C, etc.
          const isSelected = selectedAnswer === option
          const isCorrect = option === correctAnswer

          return (
            <button
              key={index}
              className={`option-button ${isSelected ? 'selected' : ''} ${
                isAnswered && isCorrect ? 'correct' : ''
              } ${isAnswered && isSelected && !isCorrect ? 'incorrect' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              aria-pressed={isSelected}
            >
              <span className="option-letter">{optionLetter}.</span>
              <span className="option-text">{option}</span>
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div
          className={`feedback ${feedbackType}`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>
      )}
    </Card>
  )
}
