import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useAutoAudio } from '../hooks/useAutoAudio'
import './DiagnosticSummaryScene.css'
import preLunchroomNarration from '../../assets/VO/UPDATED_Pre_Lunchroom_3_Narration.mp3'
import laptopNoteImage from '../../assets/laptop-note.jpeg'

export default function DiagnosticSummaryScene() {
  const { goToScene } = useContext(QuizContext)

  useAutoAudio({
    src: preLunchroomNarration,
  })

  return (
    <div className="scene-container">
      <div className="scene-content diagnostic-summary-content">
        <div className="diagnostic-summary-layout">
          <Card className="diagnostic-summary-card">
            <h1>What the Evidence Tells You</h1>

            <div className="diagnostic-summary-copy">
              <p>
                As you read through the rest of the article, you notice the same,
                but less extreme pattern with both motor and tendon reflex testing.
              </p>

              <p>
                This means that your basic neurologic examination is better at
                &ldquo;ruling IN&rdquo; lumbar radiculopathy rather than
                &ldquo;ruling OUT&rdquo; lumbar radiculopathy.
              </p>

              <p>
                Well done! This research confirms that a basic neurologic
                examination is the correct approach to help you arrive at your
                diagnosis.
              </p>

              <p>
                Your first patient is here for the day, but remember Kathy does not
                arrive until after lunch so you may have time to do some additional
                research to prepare.
              </p>
            </div>

            <div className="diagnostic-summary-actions">
              <Button onClick={() => goToScene('breakRoom')} size="lg">
                Continue to Lunch Break
              </Button>
            </div>
          </Card>

          <Card className="diagnostic-summary-sidecar">
            <ImageWithPlaceholder
              src={laptopNoteImage}
              alt="Laptop and notes used to review clinical research"
              className="diagnostic-summary-image"
            />
            <div className="diagnostic-summary-note">
              <h2>Clinical Takeaway</h2>
              <p>
                The evidence supports using a basic lower extremity neurologic
                examination to help confirm your suspected diagnosis.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
