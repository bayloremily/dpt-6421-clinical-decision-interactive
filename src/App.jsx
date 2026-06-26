import { useContext } from 'react'
import { QuizProvider, QuizContext } from './context/QuizContext'
import WelcomeScene from './scenes/WelcomeScene'
import PatientChartScene from './scenes/PatientChartScene'
import LiteratureSearchScene from './scenes/LiteratureSearchScene'
import ResearchAppraisalScene from './scenes/ResearchAppraisalScene'
import BreakRoomScene from './scenes/BreakRoomScene'
import TreatmentLiteratureScene from './scenes/TreatmentLiteratureScene'
import ForestPlotScene from './scenes/ForestPlotScene'
import EfficacyArticleScene from './scenes/EfficacyArticleScene'
import ResultsInterpretationScene from './scenes/ResultsInterpretationScene'
import FinalScene from './scenes/FinalScene'
import Modal from './components/Modal'
import './App.css'

function AppContent() {
  const { currentScene, showModal, closeModal, modalContent } = useContext(QuizContext)

  const renderScene = () => {
    switch (currentScene) {
      case 'welcome':
        return <WelcomeScene />
      case 'patientChart':
        return <PatientChartScene />
      case 'literatureSearch':
        return <LiteratureSearchScene />
      case 'researchAppraisal':
        return <ResearchAppraisalScene />
      case 'breakRoom':
        return <BreakRoomScene />
      case 'treatmentLiterature':
        return <TreatmentLiteratureScene />
      case 'forestPlot':
        return <ForestPlotScene />
      case 'efficacyArticle':
        return <EfficacyArticleScene />
      case 'resultsInterpretation':
        return <ResultsInterpretationScene />
      case 'final':
        return <FinalScene />
      default:
        return <WelcomeScene />
    }
  }

  return (
    <div className="app-container">
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
