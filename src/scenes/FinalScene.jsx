import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import './FinalScene.css'

const scoredQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const correctAnswers = {
  1: 'Lower extremity neurologic examination',
  2: 'QUADAS',
  3: 'Spectrum Bias',
  4: 'Delve into the results section',
  5: 'Sensitivity is poor and specificity is good',
  6: 'Ruling IN lumbar radiculopathy',
  7: 'B. Systematic review and meta-analysis',
  8: 'Yes',
  9: 'ELDesoky 2016',
  10: 'External validity',
  11: 'C. Interaction between time and group.',
  12: 'C. Both A and B are true',
  13: 'B. Treatment Threshold',
}

export default function FinalScene() {
  const { answers, resetQuiz } = useContext(QuizContext)

  const score = scoredQuestions.reduce((total, questionNumber) => {
    return total + (answers[questionNumber] === correctAnswers[questionNumber] ? 1 : 0)
  }, 0)

  const percentage = Math.round((score / scoredQuestions.length) * 100)

  return (
    <div className="scene-container">
      <div className="scene-content final-scene-content">
        <div className="final-hero">
          <p className="completion-tag">Case Complete</p>
          <h1>Clinical Decision Made</h1>
          <p className="subtitle">
            You worked through patient evaluation, literature search, appraisal, and
            treatment interpretation to support an evidence-based plan of care.
          </p>
        </div>

        <div className="final-grid">
          <Card className="score-card">
            <p className="score-label">Overall Score</p>
            <div className="score-ring" aria-label={`${score} out of ${scoredQuestions.length}`}>
              <span>{score}</span>
              <small>/ {scoredQuestions.length}</small>
            </div>
            <p className="score-percentage">{percentage}% correct</p>
          </Card>

          <Card className="takeaway-card">
            <h3>What This Case Reinforced</h3>
            <ul className="takeaway-list">
              <li>Review the full patient story before committing to an exam focus.</li>
              <li>Search literature with focused diagnosis and treatment terms.</li>
              <li>Appraise diagnostic and treatment evidence before applying it.</li>
              <li>Use external validity to judge whether results fit your patient.</li>
            </ul>
          </Card>
        </div>

        <Card className="reflection-card">
          <h3>Recommended Clinical Plan</h3>
          <p>
            Kathy&apos;s presentation is consistent with lumbar radiculopathy, and the
            literature you reviewed supports considering neural mobilization as part of
            a broader evidence-based intervention strategy.
          </p>
          <p>
            The next clinical step is to combine this evidence with patient values,
            symptom irritability, and ongoing reassessment during treatment.
          </p>
        </Card>

        <div className="final-actions">
          <Button onClick={resetQuiz} size="lg">
            Restart Interactive
          </Button>
        </div>
      </div>
    </div>
  )
}
