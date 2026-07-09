import { useContext, useEffect, useRef, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import { useDialogueAudio } from '../hooks/useDialogueAudio'
import './FinalCheckScene.css'
import hospitalAmbience from '../../assets/sounds/Hospital_Ambience_source_1044408/MA_Dauzkobza_HospitalAmbience_4_DentalClinic.wav'
import keyboardCue from '../../assets/sounds/MA_SoundsByGfxSounds_OfficeKeyboardTyping_preview/MA_SoundsByGfxSounds_OfficeKeyboardTyping_3.wav'
import keyboardLoop from '../../assets/sounds/MA_SoundsByGfxSounds_OfficeKeyboardTyping_preview/MA_SoundsByGfxSounds_OfficeKeyboardTyping_4.wav'
import notificationCue from '../../assets/sounds/MA_SoundsByGFXSounds_DingNotification/MA_SoundsByGFXSounds_DingNotification_2.wav'
import finalNarration5 from '../../assets/VO/Final_Narration_5.mp3'
import finalNarration6 from '../../assets/VO/Final_Narration_6.mp3'
import q13Ci1 from '../../assets/VO/Q_13_CI_1.mp3'
import q13Ci2 from '../../assets/VO/Q_13_CI_2.mp3'
import q13CiAnswerFeedback from '../../assets/VO/Q_13_CI_Answer_Feedback.mp3'
import { useAutoAudio } from '../hooks/useAutoAudio'

export default function FinalCheckScene() {
  const { goToScene, answers, handleAnswer, soundEnabled } = useContext(QuizContext)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [canPlayFinalNarration, setCanPlayFinalNarration] = useState(false)
  const typingLoopRef = useRef(null)
  const hadAnsweredRef = useRef(false)

  const dialogue = [
    {
      type: 'narration',
      speaker: 'Narrator',
      text: 'Lunch is wrapping up. You close out the research articles on your laptop. You’ve spent the last few minutes reviewing treatment options for lumbar radiculopathy. You feel more prepared, your plan is grounded in evidence, and you’re ready to put it into action.',
    },
    {
      type: 'stage',
      speaker: 'Scene',
      text: 'Phone/computer notification appears.',
    },
    {
      speaker: 'Front Desk',
      text: 'Your 1:00 patient, Kathy, has arrived.',
    },
    {
      speaker: 'CI',
      text: 'Hey, one more quick question before you go grab her. During your examination, how do you know when it’s time to stop testing and move into treatment?',
    },
    {
      type: 'stage',
      speaker: 'Scene',
      text: 'Beat. Reflection moment.',
    },
    {
      speaker: 'CI',
      text: 'At what point have you gathered enough information?',
    },
  ]

  const handleContinueDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1)
    }
  }

  const handleAnswerQuestion = (answer) => {
    handleAnswer(13, answer)
  }

  const currentDialogue = dialogue[dialogueIndex]
  const showQuestion = hasStarted && dialogueIndex === dialogue.length - 1

  useDialogueAudio({
    hasStarted,
    dialogueIndex,
    ambienceSrc: hospitalAmbience,
    cueMap: {
      0: keyboardCue,
      1: notificationCue,
    },
  })

  useAutoAudio({
    src: finalNarration5,
    enabled: hasStarted && dialogueIndex === 0,
  })

  useAutoAudio({
    src: finalNarration6,
    enabled: canPlayFinalNarration,
  })

  useAutoAudio({
    src: q13Ci1,
    enabled: hasStarted && dialogueIndex === 3,
  })

  useAutoAudio({
    src: q13Ci2,
    enabled: hasStarted && dialogueIndex === 5,
  })

  useEffect(() => {
    const audio = typingLoopRef.current ?? new Audio(keyboardLoop)
    audio.loop = true
    audio.volume = 0.06
    typingLoopRef.current = audio

    if (soundEnabled && hasStarted && dialogueIndex === 0) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [dialogueIndex, hasStarted, soundEnabled])

  useEffect(() => {
    if (!answers[13]) {
      hadAnsweredRef.current = false
      setCanPlayFinalNarration(false)
      return undefined
    }

    if (hadAnsweredRef.current || !soundEnabled) return undefined

    hadAnsweredRef.current = true
    setCanPlayFinalNarration(false)

    const audio = new Audio(q13CiAnswerFeedback)
    audio.play().catch(() => {})
    audio.onended = () => {
      setCanPlayFinalNarration(true)
    }

    return () => {
      audio.onended = null
      audio.pause()
      audio.currentTime = 0
    }
  }, [answers[13], soundEnabled])

  return (
    <div className="scene-container">
      <div className="final-check-scene">
        <div className="final-check-backdrop">
          <ImageWithPlaceholder
            src="/assets/breakroom.jpeg"
            alt="Clinic break room as lunch wraps up before the patient arrives"
            className="final-check-image"
          />
          <div className="final-check-overlay" />
        </div>

        <div className="final-check-content">
          {!hasStarted ? (
            <Card className="final-check-card final-check-start-card">
              <div className="final-check-start-copy">
                <h1>Final Check Before Patient Arrival</h1>
                <p>
                  Return to the lunchroom for one last conversation before you head
                  out to meet Kathy.
                </p>
              </div>

              <div className="final-check-actions">
                <Button onClick={() => setHasStarted(true)} size="lg" className="final-check-button">
                  Begin Dialogue
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="final-check-card">
              <div className="final-check-progress">
                <span>
                  {dialogueIndex + 1} / {dialogue.length}
                </span>
              </div>

              <div className="final-check-message">
                {currentDialogue.type !== 'stage' && (
                  <div className={`final-check-speaker ${currentDialogue.speaker.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                    <span className="final-check-speaker-name">{currentDialogue.speaker}</span>
                  </div>
                )}
                {currentDialogue.type === 'stage' && (
                  <p className="final-check-stage">{currentDialogue.text}</p>
                )}
                {currentDialogue.type === 'narration' && (
                  <p className="final-check-text final-check-narration">{currentDialogue.text}</p>
                )}
                {!currentDialogue.type && (
                  <p className="final-check-text">{currentDialogue.text}</p>
                )}
              </div>

              {!showQuestion && (
                <div className="final-check-actions">
                  <Button onClick={handleContinueDialogue} size="lg" className="final-check-button">
                    Next
                  </Button>
                </div>
              )}

              {showQuestion && (
                <div className="final-check-question-block">
                  <QuestionCard
                    questionNumber={13}
                    title="At what point have you gathered enough information?"
                    options={[
                      'A. Test Threshold',
                      'B. Treatment Threshold',
                      'C. Hypothesis Threshold',
                    ]}
                    correctAnswer="B. Treatment Threshold"
                    onAnswer={handleAnswerQuestion}
                    isAnswered={answers[13] !== undefined}
                    selectedAnswer={answers[13]}
                  />

                  {answers[13] && (
                    <div className="final-check-actions">
                      <div className="final-check-summary" role="status" aria-live="polite">
                        <p>
                          Exactly. Treatment Threshold is the point where you&apos;ve
                          collected enough objective information to feel confident
                          starting intervention.
                        </p>
                      </div>
                      <Button onClick={() => goToScene('final')} size="lg" className="final-check-button">
                        Go Meet Kathy
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
