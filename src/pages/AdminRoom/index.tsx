import React, { useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'
import { FiSun, FiMoon } from 'react-icons/fi'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useRoom } from '../../hooks/useRoom'

import { database } from '../../services/firebase'
import {
  Container,
  Content,
  Header,
  Main,
  QuestionList,
  RoomTitle
} from '../Room/styles'

import { useTheme } from '../../hooks/useTheme'

type RoomParams = {
  id: string
}

export const AdminRoom: React.FC = () => {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { colors } = useContext(ThemeContext)
  const { theme, toggleTheme } = useTheme()

  const { title, questions } = useRoom(roomId)

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  return (
    <Container>
      <Header>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
            <Switch
              onChange={toggleTheme}
              checked={theme.name === 'light'}
              checkedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 15,
                    paddingRight: 2
                  }}
                >
                  <FiSun size={15} />
                </div>
              }
              uncheckedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 15,
                    paddingRight: 2
                  }}
                >
                  <FiMoon size={15} color={colors.text} />
                </div>
              }
              offColor={colors.disabled}
              onColor={colors.ballSwitch}
            />
          </div>
        </Content>
      </Header>

      <Main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </RoomTitle>

        <QuestionList>
          {questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </QuestionList>
      </Main>
    </Container>
  )
}
