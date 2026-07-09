import { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizContext'
import Card from '../components/Card'
import Button from '../components/Button'
import QuestionCard from '../components/QuestionCard'
import ImageWithPlaceholder from '../components/ImageWithPlaceholder'
import Modal from '../components/Modal'
import { useAutoAudio } from '../hooks/useAutoAudio'
import './PatientChartScene.css'
import slide1Narration from '../../assets/VO/Slide_1_Narration.mp3'
import slide2Narration from '../../assets/VO/Slide_2_Narration.mp3'

export default function PatientChartScene() {
  const {
    goToScene,
    completedChartTabs,
    handleTabClick,
    isChartTabsComplete,
    answers,
    handleAnswer,
    setIsChartComplete,
    devLocation,
    updateDevLocation,
  } = useContext(QuizContext)

  const tabs = [
    { id: 'history', label: 'Patient History' },
    { id: 'complaint', label: 'Chief Complaint' },
    { id: 'treatment', label: 'Previous Treatment' },
    { id: 'bodychart', label: 'Body Chart' },
  ]

  const [activeTab, setActiveTab] = useState('history')
  const [isBodyChartZoomed, setIsBodyChartZoomed] = useState(false)

  useAutoAudio({
    src: slide1Narration,
    enabled: devLocation.patientChartView === 'chart',
  })

  useAutoAudio({
    src: slide2Narration,
    enabled: devLocation.patientChartView === 'question' && answers[1] !== undefined,
  })

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    handleTabClick(tabId)
  }

  const handleReviewCurrentTab = () => {
    handleTabClick(activeTab)
  }

  const handleProceedToQuestion = () => {
    if (!isChartTabsComplete()) {
      alert('Please review all chart tabs before proceeding.')
      return
    }
    updateDevLocation({ patientChartView: 'question' })
  }

  const handleAnswerQuestion = (answer) => {
    handleAnswer(1, answer)
    setIsChartComplete(true)
  }

  const handleContinue = () => {
    goToScene('literatureSearch')
  }

  if (devLocation.patientChartView === 'question') {
    return (
      <div className="scene-container">
        <div className="scene-content">
          <h1>Patient Assessment</h1>
          <QuestionCard
            questionNumber={1}
            title="Based on the patient's presentation, what examination should you prioritize?"
            options={[
              'Lower extremity neurologic examination',
              'Upper extremity neurologic examination',
              'Cardiovascular stress test',
            ]}
            correctAnswer="Lower extremity neurologic examination"
            onAnswer={handleAnswerQuestion}
            isAnswered={answers[1] !== undefined}
            selectedAnswer={answers[1]}
          />
          {answers[1] && (
            <div className="question-transition-layout">
              <Card className="question-transition-card">
                <div className="question-transition-media">
                  <ImageWithPlaceholder
                    src="/assets/laptop-note.jpeg"
                    alt="Laptop and research notes representing a literature search"
                    className="question-transition-image"
                  />
                </div>

                <div className="question-transition-copy">
                  <p className="question-transition-kicker">Clinical Reflection</p>
                  <h2>Before You Search the Literature</h2>
                  <div className="question-transition-body">
                    <p>
                      You&apos;ve performed these tests before... but how confident
                      are you, really, in their accuracy for a patient like this?
                    </p>
                    <p>
                      Will these tests truly help you confirm a diagnosis of
                      lumbo-sacral radiculopathy?
                    </p>
                    <p>
                      Rather than relying on routine alone, you decide to take a step
                      back and consult the evidence.
                    </p>
                    <p>You perform a quick search of the literature.</p>
                  </div>

                  <div className="question-actions">
                    <Button onClick={handleContinue} size="lg">
                      Search the Literature
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="scene-container">
      <div className="scene-content">
        <h1>Patient Chart Review</h1>
        <p className="subtitle">EMR Interface - Review all tabs before proceeding</p>

        <Card className="emr-card">
          {!completedChartTabs.has(activeTab) && (
            <div className="emr-overlay">
              <Button onClick={handleReviewCurrentTab} size="lg">
                Review Patient File
              </Button>
            </div>
          )}

          <div className="chart-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''} ${
                  completedChartTabs.has(tab.id) ? 'completed' : ''
                }`}
                onClick={() => handleTabChange(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <span className="tab-label">{tab.label}</span>
                {completedChartTabs.has(tab.id) && (
                  <span className="tab-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'history' && (
              <div className="tab-pane">
                <h3>Patient History</h3>
                <p>
                  <strong>Patient:</strong> Kathy, 45-year-old female
                </p>
                <p>
                  <strong>Occupation:</strong> Office manager, sedentary
                </p>
                <p>
                  <strong>Medical History:</strong> Hypertension (controlled), no
                  previous back injuries
                </p>
                <p>
                  <strong>Onset:</strong> 2 weeks ago, insidious, no traumatic
                  event
                </p>
              </div>
            )}

            {activeTab === 'complaint' && (
              <div className="tab-pane">
                <h3>Chief Complaint</h3>
                <p>
                  <strong>Primary Complaint:</strong> Left lower back and leg pain
                </p>
                <p>
                  <strong>Pain Location:</strong> Lower lumbar region radiating to
                  left foot
                </p>
                <p>
                  <strong>Pain Level:</strong> 6/10 at rest, 8/10 with prolonged
                  sitting
                </p>
                <p>
                  <strong>Associated Symptoms:</strong> Tingling and numbness in
                  left foot, weakness with walking
                </p>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="tab-pane">
                <h3>Previous Treatment</h3>
                <p>
                  <strong>Physician Evaluation:</strong> MRI performed, showing L5-S1
                  disc herniation with possible nerve compression
                </p>
                <p>
                  <strong>Previous PT:</strong> None prior to this clinic visit
                </p>
                <p>
                  <strong>Imaging:</strong> MRI ordered by referring physician
                </p>
              </div>
            )}

            {activeTab === 'bodychart' && (
              <div className="tab-pane">
                <h3>Body Chart</h3>
                <div className="body-chart-wrapper">
                  <button
                    type="button"
                    className="body-chart-button"
                    onClick={() => setIsBodyChartZoomed(true)}
                    aria-label="Open enlarged body chart"
                  >
                    <ImageWithPlaceholder
                      src="/assets/BodyChart.png"
                      alt="Anatomical body chart showing pain distribution pattern"
                      className="body-chart-image"
                    />
                  </button>
                  <Button onClick={() => setIsBodyChartZoomed(true)}>
                    Zoom In on Body Chart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="chart-actions">
          <p className="review-status">
            {isChartTabsComplete()
              ? '✓ All tabs reviewed - Ready to proceed'
              : `Tabs reviewed: ${completedChartTabs.size} of ${tabs.length}`}
          </p>
          <Button
            onClick={handleProceedToQuestion}
            size="lg"
            disabled={!isChartTabsComplete()}
          >
            Proceed to Assessment Question
          </Button>
        </div>

        {isBodyChartZoomed && (
          <Modal
            onClose={() => setIsBodyChartZoomed(false)}
            content={
              <div className="body-chart-modal">
                <h3>Body Chart</h3>
                <ImageWithPlaceholder
                  src="/assets/BodyChart.png"
                  alt="Enlarged anatomical body chart showing pain distribution pattern"
                  className="body-chart-modal-image"
                />
              </div>
            }
          />
        )}
      </div>
    </div>
  )
}
