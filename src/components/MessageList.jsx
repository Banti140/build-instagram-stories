import React from 'react'
import Message from './Message'

function MessageList({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="message-list empty">
        <p className="empty-message">No messages yet. Start the conversation!</p>
      </div>
    )
  }

  return (
    <div className="message-list">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList