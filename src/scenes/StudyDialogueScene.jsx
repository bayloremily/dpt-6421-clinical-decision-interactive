import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useDialogueAudio } from '../hooks/useDialogueAudio'
import './StudyDialogueScene.css'
import hospitalAmbience from '../../assets/sounds/Hospital_Ambience_source_1044408/MA_Dauzkobza_HospitalAmbience_4_DentalClinic.wav'
import pageTurnCue from '../../assets/sounds/Page_Turning_Pack_source_197039/Page Turning_SFX (12).wav'
import keyboardCue from '../../assets/sounds/MA_SoundsByGfxSounds_OfficeKeyboardTyping_preview/MA_SoundsByGfxSounds_OfficeKeyboardTyping_1.wav'

export default function StudyDialogueScene() {
  const { goToScene } = useContext(QuizContext)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const dialogue = [
    {
      speaker: 'Student',
      text: 'Hey, can I ask you something about this study I’m looking at?',
    },
    {
      speaker: 'CI',
      text: 'Of course—what are you thinking?',
    },
    {
      speaker: 'You',
      text: 'Well... I’m a little unsure about how relevant it is to my patient. The population and some of the details don’t match exactly. Do you think I should still dig deeper into the study... or just drop it and look for something that matches my patient more closely?',
    },
    {
      speaker: 'CI',
      text: 'That’s a really good question—and it comes up all the time. Just because a study doesn’t perfectly match your patient doesn’t mean it has no value. If the study seems fairly relevant, it’s usually worth digging deeper. Take a closer look at how they performed the intervention, how they described their techniques, and whether those approaches could apply to your case. You can still gain useful clinical insights—even if it’s not a perfect fit. So instead of dropping it right away, I’d recommend taking a deeper look first.',
    },
  ]

  const handleContinueDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      goToScene('functionalDisability')
    }
  }

  const currentDialogue = dialogue[dialogueIndex]

  useDialogueAudio({
    hasStarted,
    dialogueIndex,
    ambienceSrc: hospitalAmbience,
    cueMap: {
      0: pageTurnCue,
      2: keyboardCue,
    },
  })

  return (
    <div className="scene-container">
      <div className="study-dialogue-scene">
        <div className="study-dialogue-backdrop">
          <ImageWithPlaceholder
            src="/assets/breakroom.jpeg"
            alt="Clinic break room used for a discussion with the clinical instructor"
            className="study-dialogue-image"
          />
          <div className="study-dialogue-overlay" />
        </div>

        <div className="study-dialogue-content">
          {!hasStarted ? (
            <Card className="study-dialogue-card study-dialogue-start-card">
              <div className="study-dialogue-start-copy">
                <h1>Study Discussion</h1>
                <p>
                  Pause and talk through what this article means for your patient
                  before moving on to the next research question.
                </p>
              </div>

              <div className="study-dialogue-actions">
                <Button onClick={() => setHasStarted(true)} size="lg" className="study-dialogue-button">
                  Begin Dialogue
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="study-dialogue-card">
              <div className="study-dialogue-progress">
                <span>
                  {dialogueIndex + 1} / {dialogue.length}
                </span>
              </div>

              <div className="study-dialogue-message">
                <div className={`study-speaker ${currentDialogue.speaker.toLowerCase().replace(' ', '-')}`}>
                  <span className="study-speaker-name">{currentDialogue.speaker}</span>
                </div>
                <p className="study-speaker-text">{currentDialogue.text}</p>
              </div>

              <div className="study-dialogue-actions">
                <Button
                  onClick={handleContinueDialogue}
                  size="lg"
                  className="study-dialogue-button"
                >
                  {dialogueIndex === dialogue.length - 1 ? 'Continue to Question 12' : 'Next'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
