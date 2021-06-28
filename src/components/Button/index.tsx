import React, { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import { ButtonContainer } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  isOutlined = false,
  ...props
}) => <ButtonContainer className={cx({ isOutlined: 'outlined' })} {...props} />
