import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './WelcomeScene.css'

export default function WelcomeScene() {
  const { goToScene } = useContext(QuizContext)

  const handleStart = () => {
    goToScene('patientChart')
  }

  return (
    <div className="scene-container">
      <div className="welcome-hero">
        <ImageWithPlaceholder
          src="/assets/clinic.jpeg"
          alt="Physical therapy clinic with treatment equipment"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">DPT 6421</h1>
            <p className="hero-subtitle">Evidence-Based Clinical Decision Making</p>
            <p className="hero-description">
              Final clinical rotation interactive experience
            </p>
            <Button
              size="lg"
              onClick={handleStart}
              className="start-button"
              ariaLabel="Start the clinical case quiz"
            >
              Start Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
