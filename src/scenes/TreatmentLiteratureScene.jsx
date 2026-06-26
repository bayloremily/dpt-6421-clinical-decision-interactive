import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './TreatmentLiteratureScene.css'

export default function TreatmentLiteratureScene() {
  const {
    goToScene,
    answers,
    handleAnswer,
    isTreatmentLiteratureComplete,
    setIsTreatmentLiteratureComplete,
  } = useContext(QuizContext)

  const [searchInput, setSearchInput] = useState('')
  const [searchAttempt, setSearchAttempt] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)

  const validKeywords = [
    'neural mobilization lumbar radiculopathy',
    'neural mobilisation lumbar radiculopathy',
    'lumbar radiculopathy treatment',
    'neural mobilization',
    'neural mobilisation',
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    const normalizedInput = searchInput.trim().toLowerCase()
    setSearchAttempt(true)

    if (validKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      setShowResults(true)
      setIsTreatmentLiteratureComplete(true)
    }
  }

  const handleAnswerQuestion = (answer) => {
    handleAnswer(7, answer)
  }

  const handleContinue = () => {
    goToScene('forestPlot')
  }

  if (showQuestion) {
    return (
      <div className="scene-container">
        <div className="scene-content">
          <h1>Treatment Evidence Evaluation</h1>
          <QuestionCard
            questionNumber={7}
            title="Which study type represents the highest level of evidence for treatment efficacy?"
            options={[
              'A. Delphi study',
              'B. Systematic review and meta-analysis',
              'C. Randomized controlled trial',
            ]}
            correctAnswer="B. Systematic review and meta-analysis"
            onAnswer={handleAnswerQuestion}
            isAnswered={answers[7] !== undefined}
            selectedAnswer={answers[7]}
          />
          {answers[7] && (
            <div className="question-actions">
              <Button onClick={handleContinue} size="lg">
                Continue to Forest Plot Analysis
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Treatment Literature Search</h1>
        <p className="subtitle">Search for evidence on neural mobilization treatment</p>

        <Card variant="outlined" className="search-card">
          <form onSubmit={handleSearch} className="search-form">
            <label htmlFor="treatment-search" className="search-label">
              Database Search
            </label>
            <div className="search-container">
              <input
                id="treatment-search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter search query (e.g., 'neural mobilization lumbar radiculopathy')"
                className="search-input"
                aria-label="Treatment literature database search"
              />
              <Button
                type="submit"
                variant="primary"
                className="search-button"
                ariaLabel="Search treatment literature"
              >
                Search
              </Button>
            </div>
            <div className="search-hint">
              <p>
                <strong>Hint:</strong> Try searching the diagnosis plus a treatment
                approach.
              </p>
            </div>
          </form>

          {searchAttempt && !showResults && (
            <div className="search-feedback error" role="status" aria-live="polite">
              <p>
                No results found. Try searching for neural mobilization or treatment
                approaches for radiculopathy.
              </p>
            </div>
          )}

          {showResults && (
            <div className="search-results" role="status" aria-live="polite">
              <h3>Search Results</h3>

              <div className="results-grid">
                <Card variant="default" className="result-card">
                  <div className="result-label">A.</div>
                  <h4>Delphi Study</h4>
                  <p className="result-description">
                    Expert consensus study on neural mobilization approaches
                  </p>
                </Card>

                <Card variant="accent" className="result-card highlighted">
                  <div className="result-label">B. ⭐</div>
                  <h4>Systematic Review and Meta-Analysis</h4>
                  <p className="result-description">
                    Comprehensive analysis of neural mobilization efficacy for
                    radiculopathy management
                  </p>
                </Card>

                <Card variant="default" className="result-card">
                  <div className="result-label">C.</div>
                  <h4>Randomized Controlled Trial</h4>
                  <p className="result-description">
                    Single RCT comparing neural mobilization to control
                  </p>
                </Card>
              </div>

              <div className="answer-prompt">
                <p>
                  <strong>Question:</strong> Which study type represents the highest
                  level of evidence?
                </p>
              </div>

              <div className="continue-actions">
                <Button
                  onClick={() => setShowQuestion(true)}
                  size="lg"
                  variant="primary"
                >
                  Answer Question 7
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
