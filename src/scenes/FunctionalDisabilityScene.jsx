import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageLightbox from '../components/ImageLightbox'
import { mixedModelTablesDescription } from '../content/accessibleDescriptions'
import './FunctionalDisabilityScene.css'
import question11GraphImage from '../../assets/question-11-correct-graph.png'

export default function FunctionalDisabilityScene() {
  const { goToScene, answers, handleAnswer } = useContext(QuizContext)

  const handleAnswerQuestion = (answer) => {
    handleAnswer(12, answer)
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Functional Disability Findings</h1>
        <p className="subtitle">Interpret the ODI results before finalizing your clinical takeaway</p>

        <Card className="odi-card">
          <p className="question-kicker">Question 12</p>
          <h3>Reviewing Functional Disability (ODI)</h3>
          <p>
            The study reports functional disability outcomes using the Oswestry
            Disability Index (ODI). To interpret the findings correctly, you need to
            consider both how the groups changed over time and whether one group
            improved more than the other.
          </p>

          <div className="odi-grid">
            <div className="odi-box">
              <h4>Main Effect of Time</h4>
              <p>
                ODI scores improved across the study period, indicating meaningful
                change over time.
              </p>
            </div>

            <div className="odi-box">
              <h4>Interaction Effect</h4>
              <p>
                The neural mobilization group improved more over time than the control
                group.
              </p>
            </div>
          </div>

          <div className="odi-article-section">
            <ImageLightbox
              src={question11GraphImage}
              alt="Study results image showing ODI values and mixed-model ANOVA findings"
              title="Clinical Interpretation Graph"
              longDescription={mixedModelTablesDescription}
              imageClassName="odi-image"
              buttonLabel="View Larger"
            />
          </div>
        </Card>

        <QuestionCard
          questionNumber={12}
          title="What would be the most appropriate interpretation of these findings in terms of functional disability (ODI)?"
          options={[
            'A. Both groups statistically improved over time',
            'B. Patients treated with neural mobilization showed more improvement over time than patients in the control group',
            'C. Both A and B are true',
          ]}
          correctAnswer="C. Both A and B are true"
          onAnswer={handleAnswerQuestion}
          isAnswered={answers[12] !== undefined}
          selectedAnswer={answers[12]}
        />

        {answers[12] && (
          <div className="question-actions">
            <Button onClick={() => goToScene('finalCheck')} size="lg">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
