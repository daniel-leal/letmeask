import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button'

import { database } from '../../services/firebase'
import {
  Banner,
  Container,
  Content,
  CreateRoomButton,
  JoinRoomForm,
  Main,
  Separator
} from './styles'

export const Home: React.FC = () => {
  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <Container>
      <Banner>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </Banner>
      <Main>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoomButton>
          <Separator>ou entre em uma sala</Separator>
          <JoinRoomForm onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </JoinRoomForm>
        </Content>
      </Main>
    </Container>
  )
}
