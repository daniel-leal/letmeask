import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom'

import { AuthContextProvider } from './contexts/AuthContext'

import GlobalStyle from './styles/global'
import { CustomThemeProvider } from './contexts/CustomThemeContext'

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default App
