import React, { createContext, useState, useCallback } from 'react'

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState('welcome')
  const [devLocation, setDevLocation] = useState({
    patientChartView: 'chart',
    researchQuestion: 2,
    treatmentView: 'search',
    forestPlotQuestion: 8,
  })
  const [completedChartTabs, setCompletedChartTabs] = useState(new Set())
  const [answers, setAnswers] = useState({})
  const [searchQueries, setSearchQueries] = useState({})
  const [isChartComplete, setIsChartComplete] = useState(false)
  const [isFirstLiteratureComplete, setIsFirstLiteratureComplete] = useState(false)
  const [isTreatmentLiteratureComplete, setIsTreatmentLiteratureComplete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleAnswer = useCallback((questionNumber, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }))
  }, [])

  const handleTabClick = useCallback((tabName) => {
    setCompletedChartTabs((prev) => new Set([...prev, tabName]))
  }, [])

  const isChartTabsComplete = useCallback(() => {
    return completedChartTabs.has('history') &&
           completedChartTabs.has('complaint') &&
           completedChartTabs.has('treatment') &&
           completedChartTabs.has('bodychart')
  }, [completedChartTabs])

  const goToScene = useCallback((scene) => {
    setCurrentScene(scene)
    // Scroll to top
    window.scrollTo(0, 0)
  }, [])

  const updateDevLocation = useCallback((updates) => {
    setDevLocation((prev) => ({
      ...prev,
      ...updates,
    }))
  }, [])

  const goToDevLocation = useCallback((scene, updates = {}) => {
    setDevLocation((prev) => ({
      ...prev,
      ...updates,
    }))
    setCurrentScene(scene)
    window.scrollTo(0, 0)
  }, [])

  const showImageModal = useCallback((content) => {
    setModalContent(content)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const resetQuiz = useCallback(() => {
    setCurrentScene('welcome')
    setDevLocation({
      patientChartView: 'chart',
      researchQuestion: 2,
      treatmentView: 'search',
      forestPlotQuestion: 8,
    })
    setCompletedChartTabs(new Set())
    setAnswers({})
    setSearchQueries({})
    setIsChartComplete(false)
    setIsFirstLiteratureComplete(false)
    setIsTreatmentLiteratureComplete(false)
    setShowModal(false)
    setModalContent(null)
    window.scrollTo(0, 0)
  }, [])

  return (
    <QuizContext.Provider
      value={{
        currentScene,
        setCurrentScene,
        goToScene,
        devLocation,
        updateDevLocation,
        goToDevLocation,
        completedChartTabs,
        handleTabClick,
        isChartTabsComplete,
        answers,
        handleAnswer,
        searchQueries,
        setSearchQueries,
        isChartComplete,
        setIsChartComplete,
        isFirstLiteratureComplete,
        setIsFirstLiteratureComplete,
        isTreatmentLiteratureComplete,
        setIsTreatmentLiteratureComplete,
        soundEnabled,
        setSoundEnabled,
        showModal,
        setShowModal,
        modalContent,
        setModalContent,
        showImageModal,
        closeModal,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}
