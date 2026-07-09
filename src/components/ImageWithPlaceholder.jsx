import { useState } from 'react'
import './ImageWithPlaceholder.css'

export default function ImageWithPlaceholder({
  src,
  alt,
  className = '',
  onClick,
  isClickable = false,
  ...props
}) {
  const [hasError, setHasError] = useState(false)
  const filename = src?.split('/').pop() || 'Image'

  if (hasError) {
    return (
      <div
        className={`image-placeholder ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="placeholder-icon">⚠️</div>
        <p className="placeholder-text">Missing: {filename}</p>
        <small className="placeholder-path">{src}</small>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`responsive-image ${isClickable ? 'clickable' : ''} ${className}`}
      onError={() => setHasError(true)}
      onClick={onClick}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      {...props}
    />
  )
}
