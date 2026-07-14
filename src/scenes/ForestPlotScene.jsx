import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import AccessibleFigure from '../components/AccessibleFigure'
import { forestPlotDescription } from '../content/accessibleDescriptions'
import './ForestPlotScene.css'
import neuralArticleImage from '../../assets/neural-article.png'
import figure2Image from '../../assets/figure-2.png'

export default function ForestPlotScene() {
  const {
    goToScene,
    answers,
    handleAnswer,
    devLocation,
    updateDevLocation,
  } = useContext(QuizContext)
  const currentQuestion = devLocation.forestPlotQuestion

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
      goToScene('preQuestionNineDialogue')
    } else {
      goToScene('efficacyArticle')
    }
  }

  const isCurrentAnswered = answers[currentQuestion] !== undefined
  const isCurrentCorrect = answers[currentQuestion] === currentQ.correct

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
              <AccessibleFigure
                src={neuralArticleImage}
                alt="Systematic review article overview for neural mobilization in lumbar radiculopathy"
                title="Study Overview"
                longDescription={
                  <p>
                    Article preview image for the systematic review and meta-analysis on
                    neural mobilization in patients with lumbar radiculopathy.
                  </p>
                }
                imageClassName="article-thumbnail"
                zoomLabel="Zoom Study Overview"
              />
            </div>
          </div>
        </Card>

        <div className="forest-plot-question-figure">
          <p className="image-label">Forest Plot Results</p>
          <AccessibleFigure
            src={figure2Image}
            alt="Forest plot showing individual study results and pooled effect size"
            title="Forest Plot Results"
            longDescription={forestPlotDescription}
            imageClassName="forest-plot-question-image"
            modalImageClassName="modal-large-image"
            modalContentClassName="modal-content-wide"
            zoomLabel="View Forest Plot"
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

        {isCurrentAnswered && (
          <div className="question-actions">
            {isCurrentCorrect && (
              <div className="explanation-box" role="status" aria-live="polite">
                <h4>Explanation</h4>
                <p>{currentQ.explanation}</p>
              </div>
            )}
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestion === 9 ? 'Continue to Efficacy Article' : 'Continue'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
