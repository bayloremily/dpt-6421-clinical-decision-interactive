import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import './ImageLightbox.css'

const ZOOM_LEVELS = [75, 100, 125, 150, 175, 200]
const DEFAULT_ZOOM = 150

export default function ImageLightbox({
  src,
  alt,
  title,
  longDescription = null,
  imageClassName = '',
  buttonLabel = 'View Larger',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM)
  const titleId = useId()
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  const currentZoomIndex = ZOOM_LEVELS.indexOf(zoomLevel)

  const openLightbox = () => {
    setZoomLevel(DEFAULT_ZOOM)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const setZoomByIndex = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, ZOOM_LEVELS.length - 1))
    setZoomLevel(ZOOM_LEVELS[boundedIndex])
  }

  const handleZoomIn = () => {
    setZoomByIndex(currentZoomIndex + 1)
  }

  const handleZoomOut = () => {
    setZoomByIndex(currentZoomIndex - 1)
  }

  const handleReset = () => {
    setZoomLevel(DEFAULT_ZOOM)
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
        return
      }

      if (event.key === '0') {
        event.preventDefault()
        handleReset()
        return
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        handleZoomIn()
        return
      }

      if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        handleZoomOut()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = panelRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentZoomIndex, isOpen])

  const handleWheel = (event) => {
    if (!event.ctrlKey && !event.metaKey) return

    event.preventDefault()

    if (event.deltaY < 0) {
      handleZoomIn()
    } else if (event.deltaY > 0) {
      handleZoomOut()
    }
  }

  return (
    <>
      <div className="image-lightbox-trigger">
        <ImageWithPlaceholder
          src={src}
          alt={alt}
          className={imageClassName}
        />
        <button
          type="button"
          className="btn btn-secondary btn-md image-lightbox-trigger-button"
          onClick={openLightbox}
          aria-label={`${buttonLabel}: ${title ?? alt}`}
          ref={triggerRef}
        >
          <span aria-hidden="true">🔍</span>
          <span>{buttonLabel}</span>
        </button>
      </div>

      {isOpen
        ? createPortal(
            <div
              className="image-lightbox-backdrop"
              onClick={closeLightbox}
              role="presentation"
            >
              <div
                className="image-lightbox-panel"
                onClick={(event) => event.stopPropagation()}
                onWheel={handleWheel}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <div className="image-lightbox-header">
                  <h2 id={titleId} className="image-lightbox-title">
                    {title}
                  </h2>
                  <button
                    type="button"
                    className="image-lightbox-close"
                    onClick={closeLightbox}
                    ref={closeButtonRef}
                  >
                    Close
                  </button>
                </div>

                <div className="image-lightbox-toolbar" aria-label="Image zoom controls">
                  <Button
                    onClick={handleZoomOut}
                    variant="secondary"
                    disabled={currentZoomIndex <= 0}
                  >
                    Zoom Out
                  </Button>
                  <Button onClick={handleReset} variant="secondary">
                    Reset
                  </Button>
                  <Button
                    onClick={handleZoomIn}
                    variant="secondary"
                    disabled={currentZoomIndex >= ZOOM_LEVELS.length - 1}
                  >
                    Zoom In
                  </Button>
                  <span className="image-lightbox-zoom-value" aria-live="polite">
                    {zoomLevel}%
                  </span>
                </div>

                <div className="image-lightbox-viewport">
                  <ImageWithPlaceholder
                    src={src}
                    alt={alt}
                    className="image-lightbox-image"
                    style={{ width: `${zoomLevel}%` }}
                  />
                </div>

                {longDescription ? (
                  <div className="image-lightbox-description">
                    {longDescription}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
