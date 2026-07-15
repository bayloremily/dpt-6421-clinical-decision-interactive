import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ImageWithPlaceholder from './ImageWithPlaceholder'
import './ImageLightbox.css'

export default function ImageLightbox({
  src,
  alt,
  title,
  longDescription = null,
  supplementalImageSrc = null,
  supplementalImageAlt = '',
  imageClassName = '',
  buttonLabel = 'View Larger',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  const openLightbox = () => {
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
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
  }, [isOpen])

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

                <div className="image-lightbox-viewport">
                  <ImageWithPlaceholder
                    src={src}
                    alt={alt}
                    className="image-lightbox-image"
                  />
                </div>

                {longDescription ? (
                  <div className="image-lightbox-description">
                    {supplementalImageSrc ? (
                      <ImageWithPlaceholder
                        src={supplementalImageSrc}
                        alt={supplementalImageAlt}
                        className="image-lightbox-description-image"
                      />
                    ) : null}
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
