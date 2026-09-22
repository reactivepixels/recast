import { useState, useEffect } from 'react'

export const FadeCarousel = ({ children, interval = 3000, className = "" }) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (childrenArray.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
    }, interval)

    return () => clearInterval(timer)
  }, [childrenArray.length, interval])

  if (!children) return null
  if (childrenArray.length === 1) return <div className={className}>{children}</div>

  return (
    <div className={`relative ${className}`}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  )
} 