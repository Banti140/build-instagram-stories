import React, { useState } from 'react'

function NewChatButton({ onCreateChat, onCreateGroupChat, onCreateChannel }) {
  const [isCreating, setIsCreating] = useState(false)
  const [chatName, setChatName] = useState('')
  const [chatType, setChatType] = useState('direct')
  const [members, setMembers] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (chatType === 'direct') {
      onCreateChat(chatName)
    } else if (chatType === 'group') {
      const membersList = members
        .split(',')
        .map(m => m.trim())
        .filter(m => m !== '')
        .map(name => ({ 
          id: Date.now() + Math.random(), 
          name 
        }))
      
      onCreateGroupChat(chatName, membersList)
    } else if (chatType === 'channel') {
      onCreateChannel(chatName)
    }
    
    setChatName('')
    setMembers('')
    setChatType('direct')
    setIsCreating(false)
  }

  return (
    <div className="new-chat">
      {isCreating ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Chat name"
            autoFocus
          />
          
          <select 
            value={chatType} 
            onChange={(e) => setChatType(e.target.value)}
            className="chat-type-select"
          >
            <option value="direct">Direct Message</option>
            <option value="group">Group Chat</option>
            <option value="channel">Channel</option>
          </select>
          
          {chatType === 'group' && (
            <input
              type="text"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Members (comma-separated)"
            />
          )}
          
          <div className="buttons">
            <button type="submit">Create</button>
            <button 
              type="button" 
              onClick={() => setIsCreating(false)}
              className="cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button 
          className="new-chat-btn"
          onClick={() => setIsCreating(true)}
        >
          + New Chat
        </button>
      )}
    </div>
  )
}

export default NewChatButton
