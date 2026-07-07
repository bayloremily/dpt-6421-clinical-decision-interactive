import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import './TreatmentLiteratureScene.css'

export default function TreatmentLiteratureScene() {
  const {
    goToScene,
    answers,
    handleAnswer,
    setIsTreatmentLiteratureComplete,
    devLocation,
    updateDevLocation,
  } = useContext(QuizContext)

  const [searchInput, setSearchInput] = useState('')
  const [searchAttempt, setSearchAttempt] = useState(false)
  const [showResults, setShowResults] = useState(false)
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

  const handleContinue = () => {
    updateDevLocation({ forestPlotQuestion: 8 })
    goToScene('forestPlot')
  }

  const treatmentCitations = [
    {
      id: 'A',
      value: 'A. Delphi study',
      studyType: 'Delphi Study',
      citation:
        'Thoomes E, Falla D, Cleland JA, Fernandez-de-Las-Penas C, Gallina A, de Graaf M. Conservative management for lumbar radiculopathy based on the stage of the disorder: a Delphi (survey) study. Disabil Rehabil. 2023;45(21):3539-3548.',
    },
    {
      id: 'B',
      value: 'B. Systematic review and meta-analysis',
      studyType: 'Systematic Review and Meta-Analysis',
      citation:
        'Lin LH, Lin TY, Chang KV, Wu WT, Ozcakar L. Neural Mobilization for Reducing Pain and Disability in Patients with Lumbar Radiculopathy: A Systematic Review and Meta-Analysis. Life (Basel). 2023;13(12):2255.',
    },
    {
      id: 'C',
      value: 'C. Randomized controlled trial',
      studyType: 'Randomized Controlled Trial',
      citation:
        'Ghasabmahaleh SH, Rezasoltani Z, Dadarkhah A, Hamidipanah S, Mofrad RK, Najafi S. Spinal Manipulation for Subacute and Chronic Lumbar Radiculopathy: A Randomized Controlled Trial. Am J Med. 2021;134(1):135-141.',
    },
  ]

  const questionView = devLocation.treatmentView === 'question'
  const shouldShowResults = showResults || questionView

  const handleAnswerQuestion = (answer) => {
    handleAnswer(7, answer)
    updateDevLocation({ treatmentView: 'question' })
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

          {searchAttempt && !showResults && !questionView && (
            <div className="search-feedback error" role="status" aria-live="polite">
              <p>
                No results found. Try searching for neural mobilization or treatment
                approaches for radiculopathy.
              </p>
            </div>
          )}

          {shouldShowResults && (
            <div className="search-results" role="status" aria-live="polite">
              <h3>Search Results</h3>

              <div className="answer-prompt">
                <p>
                  <strong>Question 7:</strong> Which article would you choose based on
                  it being the highest level of evidence?
                </p>
              </div>

              <div className="citation-list">
                {treatmentCitations.map((item) => {
                  const isSelected = answers[7] === item.value
                  const isCorrect = item.value === 'B. Systematic review and meta-analysis'

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`citation-card ${isSelected ? 'selected' : ''} ${
                        answers[7] && isCorrect ? 'correct' : ''
                      } ${
                        answers[7] && isSelected && !isCorrect ? 'incorrect' : ''
                      }`}
                      onClick={() => handleAnswerQuestion(item.value)}
                      disabled={answers[7] !== undefined}
                      aria-pressed={isSelected}
                    >
                      <div className="citation-label">{item.id}</div>
                      <div className="citation-copy">
                        <h4>{item.studyType}</h4>
                        <p>{item.citation}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {answers[7] && (
                <div className="continue-actions">
                  <Button onClick={handleContinue} size="lg" variant="primary">
                    Continue to Forest Plot Analysis
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
