import React from 'react'

function Message({ message }) {
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp)
  }

  return (
    <div className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="sender">{message.sender}</span>
          <span className="timestamp">{formatTime(message.timestamp)}</span>
        </div>
        <p>{message.content}</p>
      </div>
    </div>
  )
}

export default Message