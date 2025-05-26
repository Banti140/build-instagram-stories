import '../styles/StoriesList.css'

function StoriesList({ stories, onStoryClick }) {
  return (
    <div className="stories-list">
      {stories.map((story, index) => (
        <div 
          key={story.id} 
          className="story-item"
          onClick={() => onStoryClick(index)}
        >
          <img 
            src={story.imageUrl} 
            alt={`Story by ${story.username}`} 
            className="story-thumbnail" 
          />
          <span className="story-username">{story.username}</span>
        </div>
      ))}
    </div>
  )
}

export default StoriesList