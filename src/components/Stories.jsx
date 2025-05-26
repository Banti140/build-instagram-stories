import { useState, useEffect } from 'react'
import '../styles/Stories.css'
import StoriesList from './StoriesList'
import StoryView from './StoryView'
import storiesData from '../data/stories.json'

function Stories() {
  const [stories, setStories] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setStories(storiesData)
      } catch (error) {
        console.error('Error fetching stories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const openStory = (index) => {
    setCurrentStoryIndex(index)
  }

  const closeStory = () => {
    setCurrentStoryIndex(null)
  }

  return (
    <div className="stories-container">
      {loading ? (
        <div className="loading">Loading stories...</div>
      ) : (
        <>
          <StoriesList stories={stories} onStoryClick={openStory} />
          {currentStoryIndex !== null && (
            <StoryView 
              stories={stories} 
              initialIndex={currentStoryIndex} 
              onClose={closeStory} 
            />
          )}
        </>
      )}
    </div>
  )
}

export default Stories