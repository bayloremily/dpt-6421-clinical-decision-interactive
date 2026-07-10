import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './EfficacyArticleScene.css'
import efficacyArticleImage from '../../assets/efficacy-article.png'

export default function EfficacyArticleScene() {
  const { goToScene, answers, handleAnswer, showImageModal } = useContext(QuizContext)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(10, answer)
  }

  const handleViewArticle = () => {
    showImageModal(
      <ImageWithPlaceholder
        src={efficacyArticleImage}
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
        <p className="subtitle">Compare the study population to your patient before applying the findings</p>

        <Card className="concept-card">
          <p className="question-kicker">Question 10</p>
          <h3>Looking More Closely at ELDesoky 2016</h3>
          <p>
            Good choice. ELDesoky 2016 is a randomized controlled trial that found
            effectiveness of neural mobilization in patients with lumbar
            radiculopathy.
          </p>

          <div className="article-section">
            <h4>Study Article</h4>
            <ImageWithPlaceholder
              src={efficacyArticleImage}
              alt="ELDesoky 2016 article showing neural mobilization outcomes"
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

          <div className="comparison-grid">
            <div className="concept-box">
              <h4>Study Population</h4>
              <p>
                The study was performed in 60 patients with chronic low back pain and
                S1 radiculopathy.
              </p>
            </div>

            <div className="concept-box">
              <h4>Your Patient</h4>
              <p>
                Based on the intake forms, your patient presents with acute low back
                pain and L5 radiculopathy.
              </p>
            </div>
          </div>

          <div className="validity-prompt">
            <p>
              Because the population and clinical details are not an exact match, you
              should think carefully about whether the findings can be generalized to
              your patient.
            </p>
          </div>
        </Card>

        <QuestionCard
          questionNumber={10}
          title="You are a little concerned about the study’s ________, or the ability to generalize the results from this article to your patient."
          options={['Internal validity', 'External validity', 'Measurement validity']}
          correctAnswer="External validity"
          onAnswer={handleAnswerQuestion}
          isAnswered={answers[10] !== undefined}
          selectedAnswer={answers[10]}
        />

        {answers[10] && (
          <div className="question-actions">
            <Button onClick={handleContinue} size="lg">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
