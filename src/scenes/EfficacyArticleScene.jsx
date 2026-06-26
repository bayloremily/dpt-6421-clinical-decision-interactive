import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './EfficacyArticleScene.css'

export default function EfficacyArticleScene() {
  const { goToScene, answers, handleAnswer, showImageModal } = useContext(QuizContext)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(10, answer)
  }

  const handleViewArticle = () => {
    showImageModal(
      <ImageWithPlaceholder
        src="/assets/efficacy-article.png"
        alt="Efficacy article examining treatment outcomes and generalizability"
      />
    )
  }

  const handleContinue = () => {
    goToScene('resultsInterpretation')
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Efficacy and Generalizability</h1>
        <p className="subtitle">Understanding research applicability to clinical practice</p>

        <Card className="concept-card">
          <h3>Key Concept: Study Validity</h3>
          <p>
            When evaluating whether research findings apply to your patient, you must
            consider two dimensions:
          </p>

          <div className="concept-grid">
            <div className="concept-box">
              <h4>Internal Validity</h4>
              <p>
                Whether the study design and methodology are sound and the results are
                valid within the study population.
              </p>
            </div>

            <div className="concept-box">
              <h4>External Validity</h4>
              <p>
                Whether the study results can be generalized and applied to populations
                beyond the study sample.
              </p>
            </div>
          </div>

          <div className="article-section">
            <h4>Study Article</h4>
            <ImageWithPlaceholder
              src="/assets/efficacy-article.png"
              alt="Efficacy article showing treatment outcomes"
              className="article-image"
              onClick={handleViewArticle}
              isClickable
            />
            <Button
              onClick={handleViewArticle}
              variant="secondary"
              className="view-article-btn"
            >
              View Full Article
            </Button>
          </div>
        </Card>

        <QuestionCard
          questionNumber={10}
          title="The ability to generalize results to your patient is called:"
          options={['Internal validity', 'External validity', 'Measurement validity']}
          correctAnswer="External validity"
          onAnswer={handleAnswerQuestion}
          isAnswered={answers[10] !== undefined}
          selectedAnswer={answers[10]}
        />

        {answers[10] && (
          <div className="question-actions">
            <Button onClick={handleContinue} size="lg">
              Continue to Results Interpretation
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
