import { useContext, useEffect, useMemo, useRef } from 'react'
import { QuizContext } from '../context/QuizContext'

export function useDialogueAudio({
  hasStarted,
  dialogueIndex,
  ambienceSrc,
  ambienceVolume = 0.08,
  cueMap = {},
}) {
  const { soundEnabled } = useContext(QuizContext)
  const ambienceRef = useRef(null)
  const cueRefs = useRef({})

  const cueEntries = useMemo(() => Object.entries(cueMap), [cueMap])

  useEffect(() => {
    if (!ambienceSrc) return undefined

    const audio = new Audio(ambienceSrc)
    audio.loop = true
    audio.volume = ambienceVolume
    ambienceRef.current = audio

    return () => {
      audio.pause()
      audio.currentTime = 0
      ambienceRef.current = null
    }
  }, [ambienceSrc, ambienceVolume])

  useEffect(() => {
    const refs = {}

    cueEntries.forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.volume = 0.12
      refs[key] = audio
    })

    cueRefs.current = refs

    return () => {
      Object.values(refs).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
      })
      cueRefs.current = {}
    }
  }, [cueEntries])

  useEffect(() => {
    const ambience = ambienceRef.current

    if (!ambience) return undefined

    if (hasStarted && soundEnabled) {
      ambience.play().catch(() => {})
    } else {
      ambience.pause()
      ambience.currentTime = 0
    }

    return undefined
  }, [hasStarted, soundEnabled])

  useEffect(() => {
    if (!hasStarted || !soundEnabled) return undefined

    const audio = cueRefs.current[String(dialogueIndex)]
    if (!audio) return undefined

    audio.currentTime = 0
    audio.play().catch(() => {})

    return undefined
  }, [dialogueIndex, hasStarted, soundEnabled])
}
