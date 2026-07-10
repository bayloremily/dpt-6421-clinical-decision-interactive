import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './LiteratureSearchScene.css'
import literatureArticleImage from '../../assets/literature-article.png'

export default function LiteratureSearchScene() {
  const {
    goToDevLocation,
    setIsFirstLiteratureComplete,
    showImageModal,
  } = useContext(QuizContext)

  const [searchInput, setSearchInput] = useState('')
  const [searchAttempt, setSearchAttempt] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const validKeywords = [
    'lumbar radiculopathy',
    'lumbosacral radiculopathy',
    'lumbo-sacral radiculopathy',
    'radiculopathy',
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    const normalizedInput = searchInput.trim().toLowerCase()
    setSearchAttempt(true)

    if (validKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      setShowResult(true)
      setIsFirstLiteratureComplete(true)
    }
  }

  const handleContinue = () => {
    goToDevLocation('researchAppraisal', { researchQuestion: 2 })
  }

  const handleViewImage = () => {
    showImageModal(
      <ImageWithPlaceholder
        src={literatureArticleImage}
        alt="Literature article search result showing peer-reviewed clinical study"
      />
    )
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Literature Search</h1>
        <p className="subtitle">Search the clinical database for relevant literature</p>

        <Card variant="outlined" className="search-card">
          <form onSubmit={handleSearch} className="search-form">
            <label htmlFor="search-input" className="search-label">
              Database Search
            </label>
            <div className="search-container">
              <input
                id="search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter search query (e.g., 'lumbar radiculopathy')"
                className="search-input"
                aria-label="Literature database search"
              />
              <Button
                type="submit"
                variant="primary"
                className="search-button"
                ariaLabel="Search literature database"
              >
                Search
              </Button>
            </div>
            <div className="search-hint">
              <p>
                <strong>Hint:</strong> Try searching the suspected diagnosis.
              </p>
            </div>
          </form>

          {searchAttempt && !showResult && (
            <div className="search-feedback error" role="status" aria-live="polite">
              <p>
                No results found. Try searching for the suspected diagnosis or related
                terms.
              </p>
            </div>
          )}

          {showResult && (
            <div className="search-results" role="status" aria-live="polite">
              <h3>Search Results</h3>
              <Card
                variant="accent"
                className="result-card"
                isClickable
                onClick={handleViewImage}
              >
                <div className="result-header">
                  <h4>Clinical Research Article</h4>
                  <span className="result-type">Peer-Reviewed Study</span>
                </div>
                <p className="result-description">
                  Evidence on clinical examination and neural mobilization for
                  radiculopathy management. Click to view full article.
                </p>
                <div className="result-preview">
                  <ImageWithPlaceholder
                    src={literatureArticleImage}
                    alt="Literature article preview"
                    className="preview-image"
                  />
                </div>
              </Card>

              <div className="continue-actions">
                <Button onClick={handleContinue} size="lg">
                  Proceed to Research Appraisal
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
