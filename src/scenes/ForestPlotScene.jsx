import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './ForestPlotScene.css'

export default function ForestPlotScene() {
  const { goToScene, answers, handleAnswer, showImageModal } = useContext(QuizContext)
  const [currentQuestion, setCurrentQuestion] = useState(8)

  const questions = [
    {
      number: 8,
      title:
        'Based on these systematic review results, would you recommend trying neural mobilization for this patient?',
      options: ['Yes', 'No'],
      correct: 'Yes',
      explanation:
        'The pooled effect favors neural mobilization over control, providing evidence-based support for this intervention approach.',
    },
    {
      number: 9,
      title:
        'Looking at the individual studies, which study would you choose to examine in more detail for methodology and patient similarity?',
      options: ['Ferreira 2016', 'Zahid 2014', 'ELDesoky 2016'],
      correct: 'ELDesoky 2016',
      explanation:
        'This study may have stronger methodological features or patient characteristics most similar to your patient.',
    },
  ]

  const currentQ = questions.find((q) => q.number === currentQuestion)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(currentQuestion, answer)
  }

  const handleNextQuestion = () => {
    if (currentQuestion === 8) {
      setCurrentQuestion(9)
    } else {
      goToScene('efficacyArticle')
    }
  }

  const isCurrentAnswered = answers[currentQuestion] !== undefined
  const isCurrentCorrect = answers[currentQuestion] === currentQ.correct

  const handleViewForestPlot = () => {
    showImageModal(
      <div>
        <h3>Meta-Analysis Results</h3>
        <ImageWithPlaceholder
          src="/assets/neural-article.png"
          alt="Neural article study showing meta-analysis overview"
        />
        <h4 style={{ marginTop: 'var(--spacing-lg)', color: 'var(--baylor-green)' }}>
          Forest Plot
        </h4>
        <ImageWithPlaceholder
          src="/assets/figure-2.png"
          alt="Forest plot showing individual study results and pooled effect size"
        />
      </div>
    )
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Meta-Analysis Results</h1>
        <p className="subtitle">Interpret the forest plot and treatment efficacy</p>

        <Card className="results-overview">
          <h3>Systematic Review: Neural Mobilization for Radiculopathy</h3>
          <p>
            Multiple randomized controlled trials have been synthesized to determine the
            pooled effect of neural mobilization compared to control interventions.
          </p>

          <div className="image-grid">
            <div className="image-item">
              <p className="image-label">Study Overview</p>
              <ImageWithPlaceholder
                src="/assets/neural-article.png"
                alt="Neural article research overview"
                className="article-thumbnail"
                onClick={handleViewForestPlot}
                isClickable
              />
            </div>

            <div className="image-item">
              <p className="image-label">Forest Plot Results</p>
              <ImageWithPlaceholder
                src="/assets/figure-2.png"
                alt="Forest plot showing effect sizes"
                className="article-thumbnail"
                onClick={handleViewForestPlot}
                isClickable
              />
            </div>
          </div>

          <Button onClick={handleViewForestPlot} variant="secondary" className="view-button">
            View Full Results
          </Button>
        </Card>

        <QuestionCard
          questionNumber={currentQ.number}
          title={currentQ.title}
          options={currentQ.options}
          correctAnswer={currentQ.correct}
          onAnswer={handleAnswerQuestion}
          isAnswered={isCurrentAnswered}
          selectedAnswer={answers[currentQuestion]}
        />

        {isCurrentAnswered && (
          <div className="question-actions">
            {isCurrentCorrect && (
              <div className="explanation-box" role="status" aria-live="polite">
                <h4>Explanation</h4>
                <p>{currentQ.explanation}</p>
              </div>
            )}
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestion === 9 ? 'Continue to Efficacy Article' : 'Next Question'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
