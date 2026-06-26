import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import './BreakRoomScene.css'

export default function BreakRoomScene() {
  const { goToScene } = useContext(QuizContext)
  const [dialogueIndex, setDialogueIndex] = useState(0)

  const dialogue = [
    {
      speaker: 'CI',
      text: "Good assessment so far! You've clearly done your homework on the diagnostic evidence.",
    },
    {
      speaker: 'You',
      text: 'Thank you! The sensory testing results were interesting - it seems better for ruling things in rather than ruling them out.',
    },
    {
      speaker: 'CI',
      text: 'Exactly. That\'s why we combine tests. Now, what about treatment? Have you looked at the literature on interventions?',
    },
    {
      speaker: 'You',
      text: "Not yet. I was thinking about neural mobilization based on her symptoms.",
    },
    {
      speaker: 'CI',
      text: 'Good instinct. Let\'s search the literature on that approach and see what the evidence says. The patient will be ready in about 5 minutes.',
    },
  ]

  const handleContinueDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      goToScene('treatmentLiterature')
    }
  }

  const currentDialogue = dialogue[dialogueIndex]

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Break Room</h1>
        <p className="subtitle">Discussion with your Clinical Instructor</p>

        <div className="breakroom-layout">
          <ImageWithPlaceholder
            src="/assets/breakroom.jpeg"
            alt="Physical therapy clinic break room with seating and bulletin boards"
            className="breakroom-image"
          />

          <Card className="dialogue-card">
            <div className="dialogue-progress">
              <span>
                {dialogueIndex + 1} / {dialogue.length}
              </span>
            </div>

            <div className="dialogue-message">
              <div className={`speaker ${currentDialogue.speaker.toLowerCase()}`}>
                <span className="speaker-name">{currentDialogue.speaker}</span>
              </div>
              <p className="speaker-text">{currentDialogue.text}</p>
            </div>

            <div className="dialogue-actions">
              <Button
                onClick={handleContinueDialogue}
                size="lg"
                className="continue-button"
              >
                {dialogueIndex === dialogue.length - 1
                  ? 'Continue to Treatment Literature'
                  : 'Continue'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
