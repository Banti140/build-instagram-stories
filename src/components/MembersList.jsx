import React from 'react'

function MembersList({ members, onRemoveMember, chatId }) {
  if (members.length === 0) {
    return <p className="no-members">No members yet</p>
  }

  return (
    <ul className="members-list">
      {members.map(member => (
        <li key={member.id} className="member-item">
          <span>{member.name}</span>
          <button 
            className="remove-member"
            onClick={() => onRemoveMember(chatId, member.id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MembersList