import './Card.css'

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  isClickable = false,
}) {
  return (
    <div
      className={`card card-${variant} ${isClickable ? 'card-clickable' : ''} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyPress={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick && onClick()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}
