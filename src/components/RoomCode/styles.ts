import styled from 'styled-components'

export const Button = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: #fff;
  border: 1px solid ${props => props.theme.colors.primary};
  cursor: pointer;

  display: flex;
`

export const CopyButton = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const RoomLabel = styled.span`
  display: block;
  align-self: center;
  flex: 1;
  padding: 0 16px 0 12px;
  width: 240px;
  font-size: 14px;
  font-weight: 500;
`
