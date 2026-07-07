import { useContext, useEffect, useRef, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useDialogueAudio } from '../hooks/useDialogueAudio'
import './BreakRoomScene.css'
import hospitalAmbience from '../../assets/sounds/Hospital_Ambience_source_1044408/MA_Dauzkobza_HospitalAmbience_4_DentalClinic.wav'
import footstepsCue from '../../assets/sounds/Footsteps_on_Concrete_source_60681/LDj_Audio - Reaching Footsteps on Concrete in Hallway in Boots.wav'
import doorCue from '../../assets/sounds/Open_Door_source_890033/Open Door 3.wav'
import keyboardCue from '../../assets/sounds/MA_SoundsByGfxSounds_OfficeKeyboardTyping_preview/MA_SoundsByGfxSounds_OfficeKeyboardTyping_2.wav'
import keyboardLoop from '../../assets/sounds/MA_SoundsByGfxSounds_OfficeKeyboardTyping_preview/MA_SoundsByGfxSounds_OfficeKeyboardTyping_4.wav'

export default function BreakRoomScene() {
  const { goToDevLocation } = useContext(QuizContext)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const typingLoopRef = useRef(null)

  const dialogue = [
    {
      type: 'stage',
      speaker: 'Scene',
      text: 'Footsteps approach. Door opens.',
    },
    {
      speaker: 'CI',
      text: 'Hey—how’s your prep going for your patient this afternoon?',
    },
    {
      speaker: 'You',
      text: 'I think it’s going well. Based on what I’ve reviewed, I’m suspecting lumbar radiculopathy. I looked into the literature, and it seems like a lower extremity neurologic examination should be helpful for ruling it in.',
    },
    {
      speaker: 'CI',
      text: 'Good—that’s a solid start. And how are you feeling about performing the exam?',
    },
    {
      speaker: 'You',
      text: 'Pretty confident. I think I can carry it out effectively.',
    },
    {
      speaker: 'CI',
      text: 'That’s great to hear. But let me ask you this… Once you’ve confirmed your diagnosis, what’s your plan for treatment? You’ve identified the problem… but which research-backed interventions are you going to use?',
    },
    {
      type: 'stage',
      speaker: 'Scene',
      text: 'CI gestures toward your laptop.',
    },
    {
      speaker: 'CI',
      text: 'Why don’t you take a few minutes and do a quick search? See what the current literature says about treating lumbar radiculopathy. This is always a best practice because it helps you make sure your plan is backed by more than just experience or habit.',
    },
    {
      type: 'narration',
      speaker: 'Narrator',
      text: 'Your CI heads out to grab their lunch, leaving you with a clear next step. You turn back to your laptop. Time to dive into the research—again.',
    },
  ]

  const handleContinueDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    } else {
      goToDevLocation('treatmentLiterature', { treatmentView: 'search' })
    }
  }

  const currentDialogue = dialogue[dialogueIndex]

  useDialogueAudio({
    hasStarted,
    dialogueIndex,
    ambienceSrc: hospitalAmbience,
    cueMap: {
      0: footstepsCue,
      1: doorCue,
      8: keyboardCue,
    },
  })

  useEffect(() => {
    const audio = typingLoopRef.current ?? new Audio(keyboardLoop)
    audio.loop = true
    audio.volume = 0.06
    typingLoopRef.current = audio

    if (hasStarted && dialogueIndex === 8) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [dialogueIndex, hasStarted])

  return (
    <div className="scene-container">
      <div className="breakroom-scene">
        <div className="breakroom-backdrop">
          <ImageWithPlaceholder
            src="/assets/breakroom.jpeg"
            alt="Physical therapy clinic break room with seating and bulletin boards"
            className="breakroom-image"
          />
          <div className="breakroom-overlay" />
        </div>

        <div className="breakroom-content">
          {!hasStarted ? (
            <Card className="dialogue-card dialogue-start-card">
              <div className="dialogue-start-copy">
                <h1>Lunch Break Conversation</h1>
                <p>
                  Take a moment to check in with your Clinical Instructor before
                  moving into treatment research.
                </p>
              </div>

              <div className="dialogue-actions">
                <Button onClick={() => setHasStarted(true)} size="lg" className="continue-button">
                  Begin Dialogue
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="dialogue-card">
              <div className="dialogue-progress">
                <span>
                  {dialogueIndex + 1} / {dialogue.length}
                </span>
              </div>

              <div className="dialogue-message">
                {currentDialogue.type !== 'stage' && (
                  <div className={`speaker ${currentDialogue.speaker.toLowerCase()}`}>
                    <span className="speaker-name">{currentDialogue.speaker}</span>
                  </div>
                )}
                {currentDialogue.type === 'stage' && (
                  <p className="stage-direction">{currentDialogue.text}</p>
                )}
                {currentDialogue.type === 'narration' && (
                  <p className="speaker-text narration-text">{currentDialogue.text}</p>
                )}
                {!currentDialogue.type && (
                  <p className="speaker-text">{currentDialogue.text}</p>
                )}
              </div>

              <div className="dialogue-actions">
                <Button
                  onClick={handleContinueDialogue}
                  size="lg"
                  className="continue-button"
                >
                  {dialogueIndex === dialogue.length - 1
                    ? 'Continue to Treatment Literature'
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
