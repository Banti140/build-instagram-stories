import React, { useState } from 'react'

function MessageInput({ onSendMessage, placeholder = "Type a message..." }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default MessageInput
