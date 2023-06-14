import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom'
import axios from 'axios'

import LoginPage from './Pages/Entry/Login/login.page'
import SignUpPage from './Pages/Entry/SignUp/signup.page'
import ForgotPasswordPage from './Pages/Entry/ForgotPassword/forgot-password.page'
import NewPasswordPage from './Pages/Entry/NewPassword/new-password.page'

import HomePage from './Pages/Home/home.page'

import ContentComponent from './Components/Content/content.component'
import UtilToastComponent from './Components/Util/Toast/toast.component'

import {
  UserContext,
  AccessTokenContext,
  RefreshTokenContext,
  IsLoggedInContext,
  ToastContext,
  LogoutContext
} from './Contexts/contexts.contexts'

import { ApiURI } from './Configs/mode.config'

import { Socket } from './Utils/Socket.util'

import './App.styles.sass'
import './Pages/pages.styles.sass'

const ProtectedRoutes = ({
  isLoggedIn,
  redirectPath = '/login'
}) => {
  if(!isLoggedIn) return <Navigate to={ redirectPath } replace />

  return <Outlet />
}

const App = () => {
  const [ user, setUser ]                   = useState(window.localStorage.getItem('user') || null)
  const [ accessToken, setAccessToken ]     = useState(window.localStorage.getItem('accessToken') || null)
  const [ refreshToken, setRefreshToken ]   = useState(window.localStorage.getItem('refreshToken') || null)
  const [ isLoggedIn, setLoggedIn ]         = useState(user && accessToken && refreshToken ? true : false)
  const [ toast, setToast ]                 = useState({ error: null, success: null, message: null })

  const router                              = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/'>
          <Route element={ <ProtectedRoutes isLoggedIn={ isLoggedIn } /> }>
            <Route element={ <ContentComponent /> }>
              <Route index element={ <HomePage /> } />
            </Route>
          </Route>
          <Route path='/login' element={ !isLoggedIn ? <LoginPage /> : <Navigate to='/' replace /> } />
          <Route path='/sign-up' element={ !isLoggedIn ? <SignUpPage /> : <Navigate to='/' replace /> } />
          <Route path='/forgot-password' element={ !isLoggedIn ? <ForgotPasswordPage /> : <Navigate to='/' replace /> } />
          <Route path='/new-password/:passwordRecoveryToken' element={ !isLoggedIn ? <NewPasswordPage /> : <Navigate to='/' replace /> } />
        </Route>
      </>
    )
  )

  const handleLogout                        = () => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)

    window.localStorage.removeItem('user')
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
  }

  const handleRefresh                       = () => {
    axios.put(ApiURI + '/Auth/refresh', null, {
      headers: {
        Authorization: refreshToken
      }
    })
      .then((response) => {
        // console.log(response)

        setUser(response.data.data.user)
        setAccessToken(response.data.data.accessToken)

        window.localStorage.setItem('user', JSON.stringify(response.data.data.user))
        window.localStorage.setItem('accessToken', response.data.data.accessToken)
      })
      .catch((error) => {
        if(error.response.status === 403 || error.response.status === 401) return handleLogout()
        else if(error.response.status === 500) setToast({ error: true, message: error.response.data.message })
      })
  }

  useEffect(() => {
    setLoggedIn(user && accessToken && refreshToken ? true : false)

    if(refreshToken) handleRefresh()
  }, [ accessToken, refreshToken ])

  return (
    <>
      <UserContext.Provider value={[ user, setUser ]}>
        <AccessTokenContext.Provider value={[ accessToken, setAccessToken ]}>
          <RefreshTokenContext.Provider value={[ refreshToken, setRefreshToken ]}>
            <IsLoggedInContext.Provider value={[ isLoggedIn, setLoggedIn ]}>
              <ToastContext.Provider value={[ toast, setToast ]}>
                <LogoutContext.Provider value={ handleLogout }>

                  <main id='App' className={ `app ${ isLoggedIn ? 'logged--in' : 'logged--out' }` }>
                    <div className='app__container'>
                      <RouterProvider router={ router } />
                      <UtilToastComponent />
                    </div>
                  </main>

                </LogoutContext.Provider>
              </ToastContext.Provider>
            </IsLoggedInContext.Provider>
          </RefreshTokenContext.Provider>
        </AccessTokenContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
