import React, { useState, useRef, useEffect } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

function ChatWindow({ chat, onSendMessage, onAddMember, onRemoveMember }) {
  const [showMembers, setShowMembers] = useState(false)
  const [newMember, setNewMember] = useState('')
  
  const messagesEndRef = useRef(null)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages])

  const handleAddMember = (e) => {
    e.preventDefault()
    if (newMember.trim()) {
      onAddMember(chat.id, Date.now(), newMember)
      setNewMember('')
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-info">
          <h2>
            {chat.type !== 'direct' && (
              <span className="chat-type-icon">
                {chat.type === 'group' ? '👥' : '#'}
              </span>
            )}
            {chat.name}
          </h2>
          
          {(chat.type === 'group' || chat.type === 'channel') && (
            <button 
              className="members-toggle"
              onClick={() => setShowMembers(!showMembers)}
            >
              {showMembers ? 'Hide Members' : 'Show Members'} ({chat.members.length})
            </button>
          )}
        </div>
      </div>
      
      <div className="chat-content">
        {showMembers && (chat.type === 'group' || chat.type === 'channel') && (
          <div className="members-panel">
            <h3>Members</h3>
            {chat.members.length > 0 ? (
              <ul className="members-list">
                {chat.members.map(member => (
                  <li key={member.id} className="member-item">
                    <span>{member.name}</span>
                    <button 
                      className="remove-member"
                      onClick={() => onRemoveMember(chat.id, member.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members yet</p>
            )}
            
            <form onSubmit={handleAddMember} className="add-member-form">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add member..."
              />
              <button type="submit">Add</button>
            </form>
          </div>
        )}
        
        <div className="messages-container">
          <MessageList messages={chat.messages} />
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <MessageInput 
        onSendMessage={onSendMessage} 
        placeholder={`Message ${chat.type === 'channel' ? '#' : ''}${chat.name}...`}
      />
    </div>
  )
}

export default ChatWindow
