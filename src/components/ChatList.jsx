import React from 'react'

function ChatList({ chats, activeChat, onSelectChat, onDeleteChat }) {
  const getChatIcon = (type) => {
    if (type === 'direct') return '👤'
    if (type === 'group') return '👥'
    if (type === 'channel') return '#'
    return '💬'
  }

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li 
            key={chat.id} 
            className={activeChat === chat.id ? 'active' : ''}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="chat-info">
              <span className="chat-icon">{getChatIcon(chat.type)}</span>
              <span>{chat.name}</span>
              
              {chat.type !== 'direct' && chat.members.length > 0 && (
                <span className="member-count">{chat.members.length}</span>
              )}
            </div>
            
            <button 
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation() 
                onDeleteChat(chat.id)
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatList
