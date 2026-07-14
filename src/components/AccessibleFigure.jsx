import { useId, useState } from 'react'
import Button from './Button'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import Modal from './Modal'
import './AccessibleFigure.css'

const DEFAULT_ZOOM = 1
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.25

export default function AccessibleFigure({
  src,
  alt,
  title,
  longDescription,
  imageClassName = '',
  modalImageClassName = '',
  modalContentClassName = '',
  enableModalZoomControls = false,
  zoomLabel = 'Zoom Image',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM)
  const descriptionId = useId()

  const openModal = () => {
    setZoomLevel(DEFAULT_ZOOM)
    setIsOpen(true)
  }

  const handleZoomIn = () => {
    setZoomLevel((current) => Math.min(current + ZOOM_STEP, MAX_ZOOM))
  }

  const handleZoomOut = () => {
    setZoomLevel((current) => Math.max(current - ZOOM_STEP, MIN_ZOOM))
  }

  return (
    <>
      <div className="accessible-figure">
        <button
          type="button"
          className="accessible-figure-image-button"
          onClick={openModal}
          aria-describedby={descriptionId}
          aria-label={`Open enlarged view of ${title ?? alt}`}
        >
          <ImageWithPlaceholder
            src={src}
            alt={alt}
            className={imageClassName}
          />
        </button>

        <div className="accessible-figure-actions">
          <Button onClick={openModal} variant="secondary">
            {zoomLabel}
          </Button>
        </div>

        <div id={descriptionId} className="sr-only accessible-figure-description">
          {title ? <h4>{title}</h4> : null}
          {longDescription}
        </div>
      </div>

      {isOpen && (
        <Modal
          className={modalContentClassName}
          onClose={() => setIsOpen(false)}
          content={
            <div className="accessible-figure-modal">
              {title ? <h3>{title}</h3> : null}
              {enableModalZoomControls ? (
                <div className="accessible-figure-modal-toolbar" aria-label="Image zoom controls">
                  <Button
                    onClick={handleZoomOut}
                    variant="secondary"
                    disabled={zoomLevel <= MIN_ZOOM}
                  >
                    Zoom Out
                  </Button>
                  <span className="accessible-figure-zoom-value" aria-live="polite">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <Button
                    onClick={handleZoomIn}
                    variant="secondary"
                    disabled={zoomLevel >= MAX_ZOOM}
                  >
                    Zoom In
                  </Button>
                </div>
              ) : null}
              <div className="accessible-figure-modal-image-frame">
                <ImageWithPlaceholder
                  src={src}
                  alt={alt}
                  className={modalImageClassName || imageClassName}
                  style={
                    enableModalZoomControls
                      ? { transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }
                      : undefined
                  }
                />
              </div>
              <div className="accessible-figure-modal-description">
                {longDescription}
              </div>
            </div>
          }
        />
      )}
    </>
  )
}
