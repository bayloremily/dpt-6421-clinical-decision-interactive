import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import './DevToc.css'

const tocSections = [
  {
    title: 'Introduction',
    items: [
      { label: 'Start Screen', scene: 'welcome' },
      { label: 'Welcome to Your Final Clinical Rotation', scene: 'rotationWelcome' },
    ],
  },
  {
    title: 'Patient Review',
    items: [
      {
        label: 'Patient Chart',
        scene: 'patientChart',
        devLocation: { patientChartView: 'chart' },
      },
      {
        label: 'Question 1',
        scene: 'patientChart',
        devLocation: { patientChartView: 'question' },
      },
    ],
  },
  {
    title: 'Diagnostic Research',
    items: [
      { label: 'Literature Search', scene: 'literatureSearch' },
      {
        label: 'Question 2 - QUADAS',
        scene: 'researchAppraisal',
        devLocation: { researchQuestion: 2 },
      },
      {
        label: 'Question 3 - Spectrum Bias',
        scene: 'researchAppraisal',
        devLocation: { researchQuestion: 3 },
      },
      {
        label: 'Question 4 - Results vs. Conclusions',
        scene: 'researchAppraisal',
        devLocation: { researchQuestion: 4 },
      },
      {
        label: 'Question 5 - Sensitivity & Specificity',
        scene: 'researchAppraisal',
        devLocation: { researchQuestion: 5 },
      },
      {
        label: 'Question 6 - Rule In / Rule Out',
        scene: 'researchAppraisal',
        devLocation: { researchQuestion: 6 },
      },
      { label: 'Slide 9 - Diagnostic Summary', scene: 'diagnosticSummary' },
    ],
  },
  {
    title: 'Lunch Break',
    items: [{ label: 'CI Conversation', scene: 'breakRoom' }],
  },
  {
    title: 'Treatment Research',
    items: [
      {
        label: 'Literature Search',
        scene: 'treatmentLiterature',
        devLocation: { treatmentView: 'search' },
      },
      {
        label: 'Question 7',
        scene: 'treatmentLiterature',
        devLocation: { treatmentView: 'question' },
      },
      {
        label: 'Question 8',
        scene: 'forestPlot',
        devLocation: { forestPlotQuestion: 8 },
      },
      {
        label: 'Pre-Question 9 Dialogue',
        scene: 'preQuestionNineDialogue',
      },
      {
        label: 'Question 9',
        scene: 'forestPlot',
        devLocation: { forestPlotQuestion: 9 },
      },
    ],
  },
  {
    title: 'Applying Evidence',
    items: [
      { label: 'Question 10', scene: 'efficacyArticle' },
      { label: 'Study Dialogue', scene: 'studyDialogue' },
      { label: 'Question 11', scene: 'resultsInterpretation' },
      { label: 'Question 12', scene: 'functionalDisability' },
      { label: 'Question 13', scene: 'finalCheck' },
    ],
  },
  {
    title: 'Conclusion',
    items: [
      { label: 'End Screen', scene: 'final' },
    ],
  },
]

export default function DevToc({ isOpen, onToggle }) {
  const { currentScene, devLocation, goToDevLocation } = useContext(QuizContext)

  const isItemActive = (item) => {
    if (!item.scene || item.scene !== currentScene) return false

    if (!item.devLocation) return true

    return Object.entries(item.devLocation).every(
      ([key, value]) => devLocation[key] === value,
    )
  }

  return (
    <>
      <button
        type="button"
        className={`dev-toc-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="dev-toc-panel"
      >
        TOC
      </button>

      <aside
        id="dev-toc-panel"
        className={`dev-toc-panel ${isOpen ? 'open' : ''}`}
        aria-label="Development scene navigation"
      >
        <div className="dev-toc-header">
          <div>
            <p className="dev-toc-eyebrow">Development Navigation</p>
            <h2>Scene TOC</h2>
          </div>
          <button
            type="button"
            className="dev-toc-close"
            onClick={onToggle}
            aria-label="Close table of contents"
          >
            ×
          </button>
        </div>

        <div className="dev-toc-body">
          {tocSections.map((section) => (
            <section key={section.title} className="dev-toc-section">
              <h3>{section.title}</h3>
              <ul className="dev-toc-list">
                {section.items.map((item) => {
                  const active = isItemActive(item)

                  return (
                    <li key={`${section.title}-${item.label}`}>
                      <button
                        type="button"
                        className={`dev-toc-link ${active ? 'active' : ''}`}
                        onClick={() => item.scene && goToDevLocation(item.scene, item.devLocation)}
                        disabled={item.unavailable}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span>{item.label}</span>
                        {item.unavailable && <small>Coming soon</small>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </aside>
    </>
  )
}
