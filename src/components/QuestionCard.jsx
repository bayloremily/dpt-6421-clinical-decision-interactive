import { useState } from 'react'
import Card from './Card'
import Button from './Button'
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

  const handleOptionClick = (option) => {
    if (isAnswered) return

    if (option === correctAnswer) {
      setFeedback('Correct! Well done.')
      setShowFeedback(true)
      onAnswer(option)
    } else {
      setFeedback('Incorrect. Try again.')
      setShowFeedback(true)
      // Clear feedback after 2 seconds if wrong
      setTimeout(() => setShowFeedback(false), 2000)
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
          className={`feedback ${selectedAnswer === correctAnswer ? 'success' : 'error'}`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>
      )}
    </Card>
  )
}
