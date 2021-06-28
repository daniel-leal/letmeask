import React from 'react'

import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function copyRoomCodeToClippboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClippboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {code}</span>
    </button>
  )
}
