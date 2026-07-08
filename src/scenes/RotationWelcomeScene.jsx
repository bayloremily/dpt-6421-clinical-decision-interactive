import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useAutoAudio } from '../hooks/useAutoAudio'
import './RotationWelcomeScene.css'
import slide0Narration from '../../assets/VO/Slide_0_Narration.mp3'

export default function RotationWelcomeScene() {
  const { goToDevLocation } = useContext(QuizContext)

  useAutoAudio({
    src: slide0Narration,
  })

  return (
    <div className="scene-container">
      <div className="scene-content rotation-welcome-content">
        <div className="rotation-welcome-hero">
          <ImageWithPlaceholder
            src="/assets/clinic.jpeg"
            alt="Outpatient clinic environment"
            className="rotation-welcome-image"
          />
          <div className="rotation-welcome-overlay" />
        </div>

        <div className="rotation-welcome-grid">
          <Card className="rotation-welcome-main">
            <p className="rotation-welcome-kicker">Clinical Simulation</p>
            <h1>Welcome to Your Final Clinical Rotation</h1>

            <div className="rotation-welcome-stack">
              <section className="rotation-welcome-section">
                <p>
                  You&apos;re just a few weeks away from graduation, and today
                  you&apos;re stepping into the role of an entry-level physical
                  therapist.
                </p>
              </section>

              <section className="rotation-welcome-section">
                <h3>Today&apos;s Situation</h3>
                <p>You arrive at your outpatient clinic early in the morning.</p>
                <p>The schedule is full.</p>
                <p>Your CI (Clinical Instructor) is counting on you.</p>
                <p>There&apos;s one patient in particular on your mind.</p>
                <p>This is the patient case you&apos;ve chosen for your final presentation.</p>
              </section>

              <section className="rotation-welcome-section">
                <h3>Your Challenge</h3>
                <p>
                  You&apos;re not completely confident that you&apos;re using the best
                  tests and measures for this case.
                </p>
                <p>
                  As a soon-to-be physical therapist, your decisions need to be
                  grounded in evidence, not habit, not guesswork.
                </p>
                <p>
                  Before your patient arrives, you decide to take a closer look at
                  the research.
                </p>
              </section>

              <section className="rotation-welcome-section">
                <h3>Throughout this experience, you&apos;ll:</h3>
                <ul className="rotation-welcome-list">
                  <li>Review research related to your patient case</li>
                  <li>Evaluate clinical tests and measures</li>
                  <li>Make decisions that impact patient care</li>
                </ul>
              </section>

              <section className="rotation-welcome-section">
                <p>
                  Each choice you make will shape how you evaluate and treat your
                  patient.
                </p>
                <p>
                  Your patient is scheduled to arrive after lunch, so you have a
                  little time to prepare.
                </p>
                <p className="rotation-welcome-closing">Let&apos;s see if you&apos;re ready.</p>
              </section>
            </div>

            <div className="rotation-welcome-actions">
              <Button
                size="lg"
                onClick={() =>
                  goToDevLocation('patientChart', { patientChartView: 'chart' })
                }
                className="rotation-welcome-button"
              >
                Begin Preparing
              </Button>
            </div>
          </Card>

          <Card className="rotation-schedule-card">
            <p className="rotation-schedule-kicker">Today&apos;s Schedule</p>
            <h2>Clinic Day</h2>
            <ul className="rotation-schedule-list">
              <li>
                <span>8:00 AM</span>
                <strong>Review Patient Chart</strong>
              </li>
              <li>
                <span>9:00 AM</span>
                <strong>Research Diagnostic Tests</strong>
              </li>
              <li>
                <span>12:00 PM</span>
                <strong>Lunch with CI</strong>
              </li>
              <li>
                <span>1:00 PM</span>
                <strong>Kathy Arrives</strong>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
