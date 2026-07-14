import { useId, useState } from 'react'
import Button from './Button'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import Modal from './Modal'
import './AccessibleFigure.css'

export default function AccessibleFigure({
  src,
  alt,
  title,
  longDescription,
  imageClassName = '',
  modalImageClassName = '',
  modalContentClassName = '',
  zoomLabel = 'Zoom Image',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const descriptionId = useId()

  return (
    <>
      <div className="accessible-figure">
        <button
          type="button"
          className="accessible-figure-image-button"
          onClick={() => setIsOpen(true)}
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
          <Button onClick={() => setIsOpen(true)} variant="secondary">
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
              <ImageWithPlaceholder
                src={src}
                alt={alt}
                className={modalImageClassName || imageClassName}
              />
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
