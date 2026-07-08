import { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'

export function useAutoAudio({
  src,
  enabled = true,
  volume = 1,
  loop = false,
}) {
  const { soundEnabled } = useContext(QuizContext)

  useEffect(() => {
    if (!src || !enabled || !soundEnabled) return undefined

    const audio = new Audio(src)
    audio.volume = volume
    audio.loop = loop
    audio.play().catch(() => {})

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [enabled, loop, soundEnabled, src, volume])
}
