import React from 'react'

import copyImg from '../../assets/images/copy.svg'

import { Button, CopyButton, RoomLabel } from './styles'

type RoomCodeProps = {
  code: string
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function copyRoomCodeToClippboard() {
    navigator.clipboard.writeText(code)
  }

  return (
    <Button onClick={copyRoomCodeToClippboard}>
      <CopyButton>
        <img src={copyImg} alt="Copy room code" />
      </CopyButton>
      <RoomLabel>Sala {code}</RoomLabel>
    </Button>
  )
}
