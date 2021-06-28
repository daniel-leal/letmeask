import React, { ReactNode } from 'react'
import cx from 'classnames'

import { Container, Footer, UserInfo } from './styles'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false
}) => {
  return (
    <Container
      className={cx(
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <Footer>
        <UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>{children}</div>
      </Footer>
    </Container>
  )
}
