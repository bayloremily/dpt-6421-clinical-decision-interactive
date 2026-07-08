import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useAutoAudio } from '../hooks/useAutoAudio'
import './PreQuestionNineDialogueScene.css'
import preQuestionNineAudio from '../../assets/VO/Pre-Question_9_Narration_4.mp3'

export default function PreQuestionNineDialogueScene() {
  const { goToDevLocation } = useContext(QuizContext)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const dialogue = [
    {
      speaker: 'CI',
      text: 'Find anything interesting?',
    },
    {
      speaker: 'You',
      text: 'I think so. This literature review is pointing to neural mobilization.',
    },
    {
      speaker: 'CI',
      text: 'Literature reviews are so helpful because they can point you to other studies. To get more information about the details of the treatment, I would look more in depth into one of the studies that statistically favored neural mobilization.',
    },
  ]

  useAutoAudio({
    src: preQuestionNineAudio,
    enabled: !hasStarted,
  })

  const currentDialogue = dialogue[dialogueIndex]

  const handleContinueDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      goToDevLocation('forestPlot', { forestPlotQuestion: 9 })
    }
  }

  return (
    <div className="scene-container">
      <div className="pre-question-nine-scene">
        <div className="pre-question-nine-backdrop">
          <ImageWithPlaceholder
            src="/assets/breakroom.jpeg"
            alt="Clinic break room used for a quick conversation with the clinical instructor"
            className="pre-question-nine-image"
          />
          <div className="pre-question-nine-overlay" />
        </div>

        <div className="pre-question-nine-content">
          {!hasStarted ? (
            <Card className="pre-question-nine-card pre-question-nine-start-card">
              <div className="pre-question-nine-start-copy">
                <h1>Study Follow-Up</h1>
                <p>
                  Your CI checks in as you review the systematic review findings.
                </p>
              </div>

              <div className="pre-question-nine-actions">
                <Button
                  onClick={() => setHasStarted(true)}
                  size="lg"
                  className="pre-question-nine-button"
                >
                  Begin Dialogue
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="pre-question-nine-card">
              <div className="pre-question-nine-progress">
                <span>
                  {dialogueIndex + 1} / {dialogue.length}
                </span>
              </div>

              <div className="pre-question-nine-message">
                <div
                  className={`pre-question-nine-speaker ${currentDialogue.speaker
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  <span className="pre-question-nine-speaker-name">
                    {currentDialogue.speaker}
                  </span>
                </div>
                <p className="pre-question-nine-speaker-text">{currentDialogue.text}</p>
              </div>

              <div className="pre-question-nine-actions">
                <Button
                  onClick={handleContinueDialogue}
                  size="lg"
                  className="pre-question-nine-button"
                >
                  {dialogueIndex === dialogue.length - 1
                    ? 'Continue to Question 9'
                    : 'Next'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
