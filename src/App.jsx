import { useContext, useState } from 'react'
import { QuizProvider, QuizContext } from './context/QuizContext'
import WelcomeScene from './scenes/WelcomeScene'
import RotationWelcomeScene from './scenes/RotationWelcomeScene'
import PatientChartScene from './scenes/PatientChartScene'
import LiteratureSearchScene from './scenes/LiteratureSearchScene'
import ResearchAppraisalScene from './scenes/ResearchAppraisalScene'
import DiagnosticSummaryScene from './scenes/DiagnosticSummaryScene'
import BreakRoomScene from './scenes/BreakRoomScene'
import TreatmentLiteratureScene from './scenes/TreatmentLiteratureScene'
import ForestPlotScene from './scenes/ForestPlotScene'
import PreQuestionNineDialogueScene from './scenes/PreQuestionNineDialogueScene'
import EfficacyArticleScene from './scenes/EfficacyArticleScene'
import StudyDialogueScene from './scenes/StudyDialogueScene'
import ResultsInterpretationScene from './scenes/ResultsInterpretationScene'
import FunctionalDisabilityScene from './scenes/FunctionalDisabilityScene'
import FinalCheckScene from './scenes/FinalCheckScene'
import FinalScene from './scenes/FinalScene'
import Modal from './components/Modal'
import DevToc from './components/DevToc'
import SoundToggle from './components/SoundToggle'
import './App.css'

function AppContent() {
  const [isTocOpen, setIsTocOpen] = useState(true)
  const { currentScene, showModal, closeModal, modalContent } = useContext(QuizContext)

  const renderScene = () => {
    switch (currentScene) {
      case 'welcome':
        return <WelcomeScene />
      case 'rotationWelcome':
        return <RotationWelcomeScene />
      case 'patientChart':
        return <PatientChartScene />
      case 'literatureSearch':
        return <LiteratureSearchScene />
      case 'researchAppraisal':
        return <ResearchAppraisalScene />
      case 'diagnosticSummary':
        return <DiagnosticSummaryScene />
      case 'breakRoom':
        return <BreakRoomScene />
      case 'treatmentLiterature':
        return <TreatmentLiteratureScene />
      case 'forestPlot':
        return <ForestPlotScene />
      case 'preQuestionNineDialogue':
        return <PreQuestionNineDialogueScene />
      case 'efficacyArticle':
        return <EfficacyArticleScene />
      case 'studyDialogue':
        return <StudyDialogueScene />
      case 'resultsInterpretation':
        return <ResultsInterpretationScene />
      case 'functionalDisability':
        return <FunctionalDisabilityScene />
      case 'finalCheck':
        return <FinalCheckScene />
      case 'final':
        return <FinalScene />
      default:
        return <WelcomeScene />
    }
  }

  return (
    <div className={`app-container ${isTocOpen ? 'toc-open' : 'toc-closed'}`}>
      <DevToc isOpen={isTocOpen} onToggle={() => setIsTocOpen((prev) => !prev)} />
      <SoundToggle />
      {renderScene()}
      {showModal && <Modal content={modalContent} onClose={closeModal} />}
    </div>
  )
}

function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  )
}

export default App
