import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './ResultsInterpretationScene.css'

export default function ResultsInterpretationScene() {
  const { goToScene, answers, handleAnswer, showImageModal } = useContext(QuizContext)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(11, answer)
  }

  const handleViewGraph = () => {
    showImageModal(
      <div>
        <h3>Clinical Interpretation Graph</h3>
        <ImageWithPlaceholder
          src="/assets/question-11-correct-graph.png"
          alt="Graph showing the correct interpretation for question 11"
        />
      </div>
    )
  }

  const handleContinue = () => {
    goToScene('final')
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Results Interpretation</h1>
        <p className="subtitle">Translate the evidence into a clinical recommendation</p>

        <Card className="interpretation-card">
          <h3>Applying the Evidence</h3>
          <p>
            The systematic review supports neural mobilization, but evidence-based
            practice also requires matching the magnitude of benefit to the patient in
            front of you.
          </p>

          <div className="interpretation-grid">
            <div className="interpretation-box">
              <h4>Statistical Significance</h4>
              <p>
                Ask whether the pooled effect is likely due to the intervention rather
                than chance alone.
              </p>
            </div>

            <div className="interpretation-box">
              <h4>Clinical Significance</h4>
              <p>
                Ask whether the size of the effect is large enough to matter for this
                patient&apos;s pain and function.
              </p>
            </div>
          </div>

          <div className="graph-preview">
            <ImageWithPlaceholder
              src="/assets/question-11-correct-graph.png"
              alt="Preview of the clinical interpretation graph"
              className="graph-image"
              onClick={handleViewGraph}
              isClickable
            />
            <Button onClick={handleViewGraph} variant="secondary">
              View Full Graph
            </Button>
          </div>
        </Card>

        <QuestionCard
          questionNumber={11}
          title="Based on the evidence you reviewed, which conclusion is most appropriate for Kathy?"
          options={[
            'Neural mobilization should be considered because it has supportive evidence and fits her presentation.',
            'Neural mobilization should be avoided because the evidence only supports diagnosis, not treatment.',
            'No intervention should be recommended until imaging findings fully normalize.',
          ]}
          correctAnswer="Neural mobilization should be considered because it has supportive evidence and fits her presentation."
          onAnswer={handleAnswerQuestion}
          isAnswered={answers[11] !== undefined}
          selectedAnswer={answers[11]}
        />

        {answers[11] && (
          <div className="question-actions">
            <div className="summary-callout" role="status" aria-live="polite">
              <h4>Clinical Takeaway</h4>
              <p>
                Stronger decision making comes from combining patient presentation,
                diagnostic reasoning, and the best available intervention evidence.
              </p>
            </div>
            <Button onClick={handleContinue} size="lg">
              View Final Summary
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
