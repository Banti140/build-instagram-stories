import { useState } from 'react'
import './App.css'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import NewChatButton from './components/NewChatButton'

function App() {
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'Personal Notes', 
      type: 'direct',
      members: [],
      messages: [] 
    }
  ])
  
  const [activeChat, setActiveChat] = useState(1)

  const createChat = (name, type = 'direct', members = []) => {
    const newChat = {
      id: Date.now(),
      name: name || `Chat ${chats.length + 1}`,
      type,
      members,
      messages: []
    }
    
    setChats([...chats, newChat])
    setActiveChat(newChat.id)
  }

  const createGroupChat = (name, members) => {
    createChat(name, 'group', members)
  }

  const createChannel = (name) => {
    createChat(name, 'channel')
  }

  const deleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId))
        if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || null)
    }
  }

  const addMemberToChat = (chatId, memberId, memberName) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return { 
          ...chat, 
          members: [...chat.members, { id: memberId, name: memberName }] 
        }
      }
      return chat
    }))
  }

  const removeMemberFromChat = (chatId, memberId) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return { 
          ...chat, 
          members: chat.members.filter(member => member.id !== memberId) 
        }
      }
      return chat
    }))
  }

  const sendMessage = (content, sender = 'You') => {
    if (!content.trim()) return
    
    const newMessage = {
      id: Date.now(),
      content,
      sender,
      timestamp: new Date()
    }
    
    setChats(chats.map(chat => {
      if (chat.id === activeChat) {
        return { 
          ...chat, 
          messages: [...chat.messages, newMessage] 
        }
      }
      return chat
    }))
  }

  const currentChat = chats.find(chat => chat.id === activeChat) || chats[0]

  return (
    <div className="chat-app">
      <div className="sidebar">
        <NewChatButton 
          onCreateChat={createChat} 
          onCreateGroupChat={createGroupChat}
          onCreateChannel={createChannel}
        />
        <ChatList 
          chats={chats} 
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onDeleteChat={deleteChat}
        />
      </div>
      
      {currentChat && (
        <ChatWindow 
          chat={currentChat}
          onSendMessage={sendMessage}
          onAddMember={addMemberToChat}
          onRemoveMember={removeMemberFromChat}
        />
      )}
    </div>
  )
}

export default App
