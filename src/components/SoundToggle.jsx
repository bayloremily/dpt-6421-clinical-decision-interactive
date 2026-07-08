import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import './SoundToggle.css'

export default function SoundToggle() {
  const { soundEnabled, setSoundEnabled } = useContext(QuizContext)

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={() => setSoundEnabled((prev) => !prev)}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
    >
      <span className="sound-toggle-label">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
    </button>
  )
}
