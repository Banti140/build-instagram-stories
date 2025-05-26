import { useState, useEffect, useRef } from 'react'
import '../styles/StoryView.css'

function StoryView({ stories, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  
  const currentStory = stories[currentIndex]
  
  useEffect(() => {
    setProgress(0)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    const intervalTime = 50 // Update progress every 50ms
    const totalTime = 5000 // 5 seconds total
    const increment = (intervalTime / totalTime) * 100
    
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          goToNextStory()
          return 0
        }
        return newProgress
      })
    }, intervalTime)
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, stories.length])
  
  const goToPrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onClose()
    }
  }
  
  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onClose()
    }
  }
  
  const handleTap = (e) => {
    const screenWidth = window.innerWidth
    const tapPosition = e.clientX
    
    if (tapPosition < screenWidth / 2) {
      goToPrevStory()
    } else {
      goToNextStory()
    }
  }
  
  return (
    <div className="story-view-container">
      <div className="story-view" onClick={handleTap}>
        <div className="progress-container">
          {stories.map((_, index) => (
            <div key={index} className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: index === currentIndex ? `${progress}%` : 
                         index < currentIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="story-header">
          <div className="user-info">
            <div className="user-avatar">
              <img src={currentStory.userAvatar} alt={currentStory.username} />
            </div>
            <div className="username">{currentStory.username}</div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="story-content">
          <img 
            src={currentStory.imageUrl} 
            alt="Story content" 
            className="story-image" 
          />
        </div>
      </div>
    </div>
  )
}

export default StoryView