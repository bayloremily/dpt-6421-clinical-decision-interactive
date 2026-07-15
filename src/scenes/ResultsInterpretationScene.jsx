import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageLightbox from '../components/ImageLightbox'
import { mixedModelTablesDescription } from '../content/accessibleDescriptions'
import './ResultsInterpretationScene.css'
import question11GraphImage from '../../assets/question-11-correct-graph.png'

export default function ResultsInterpretationScene() {
  const { goToScene, answers, handleAnswer } = useContext(QuizContext)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(11, answer)
  }

  const handleContinue = () => {
    goToScene('studyDialogue')
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
            <ImageLightbox
              src={question11GraphImage}
              alt="Study results image showing descriptive outcome values and mixed-model ANOVA findings"
              title="Clinical Interpretation Graph"
              longDescription={mixedModelTablesDescription}
              imageClassName="graph-image"
              buttonLabel="View Larger"
            />
          </div>
        </Card>

        <QuestionCard
          questionNumber={11}
          title="To if determine if patients treated with neural mobilization showed more improvement than patients in the control group, which is the most relevant result to look at?"
          options={[
            'A. Main effect of group',
            'B. Main effect of time',
            'C. Interaction between time and group.',
          ]}
          correctAnswer="C. Interaction between time and group."
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
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
