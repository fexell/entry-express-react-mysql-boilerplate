import { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import axios from 'axios'

import FormComponent from '../../../Form/form.component'
import FormTitleComponent from '../../../Form/title.component'
import FormInputComponent from '../../../Form/input.component'
import FormButtonComponent from '../../../Form/button.component'

import {
  UserContext,
  AccessTokenContext,
  RefreshTokenContext,
  ToastContext
} from '../../../../Contexts/contexts.contexts'

import { ApiURI } from '../../../../Configs/mode.config'

const LoginLeftComponent = () => {
  const [ , setUser ]                   = useContext(UserContext)
  const [ , setAccessToken ]            = useContext(AccessTokenContext)
  const [ , setRefreshToken ]           = useContext(RefreshTokenContext)
  const [ , setToast ]                  = useContext(ToastContext)

  const [ formData, setFormData ]       = useState({ email: '', password: '' })
  const [ error, setError ]             = useState({ error: null, message: null })
  const [ rememberMe, setRememberMe ]   = useState(false)

  const handleLogin                     = (e) => {
    e.preventDefault()

    axios.post(ApiURI + '/Auth/login', formData)
      .then((response) => {
        console.log(response)

        if(response.data.data) {
          setUser(response.data.data.user)
          setAccessToken(response.data.data.accessToken)
          setRefreshToken(response.data.data.refreshToken)

          window.localStorage.setItem('user', JSON.stringify(response.data.data.user))
          window.localStorage.setItem('accessToken', response.data.data.accessToken)
          window.localStorage.setItem('refreshToken', response.data.data.refreshToken)

          setToast({ message: 'You\'ve logged in successfully.' })
        }
      })
      .catch((error) => {
        setError({ error: error.response.data.error, message: error.response.data.message })

        if(error.response.status === 500) setToast({ error: true, message: error.response.data.message })
      })
  }

  useEffect(() => {
    if(rememberMe) window.localStorage.setItem('email', formData.email)
  }, [ formData.email, rememberMe ])

  return (
    <>
      <div className='login__left__component entry__left__component component'>
        <div className='login__left__component__container entry__left__component__container component__container'>
          <FormComponent
            buttonText='Log in'
            handleOnSubmit={ handleLogin }
            formData={ formData }
            setFormData={ setFormData }>
            <FormTitleComponent
              h1='Welcome back!'
              footnoteText='Please enter your details.' />
            <FormInputComponent
              id='LoginEmail'
              icon={ <FaEnvelope /> }
              labelText='Email'
              type='email'
              name='email'
              placeholder='Enter your email'
              defaultValue={ window.localStorage.getItem('email') }
              error={ error.error === 'email' ? error : null } />
            <FormInputComponent
              id='LoginPassword'
              icon={ <MdPassword /> }
              labelText='Password'
              type='password'
              name='password'
              placeholder='Enter your password'
              error={ error.error === 'password' ? error : null } />
            <div className='entry__left__additional'>
              <div className='entry__left__additional__container'>
                <div className='entry__left__additional__left'>
                  <div className='entry__left__additional__left__container'>
                    <input
                      id='LoginRememberMe'
                      type='checkbox'
                      name='rememberMe'
                      defaultChecked={ !!window.localStorage.getItem('email') }
                      onChange={ () => setRememberMe(!rememberMe) } />
                    <label className='label' htmlFor='LoginRememberMe'>Remember my email</label>
                  </div>
                </div>
                <div className='entry__left__additional__right'>
                  <div className='entry__left__additional__right__container'>
                    <span><NavLink to='/forgot-password'>Forgot password?</NavLink></span>
                  </div>
                </div>
              </div>
            </div>
            <FormButtonComponent
              buttonText='Sign in'
              disabled={ !formData.email || !formData.password } />
            <div className='entry__left__entry__link'>
              <div className='entry__left__entry__link__container'>
                <span>Don't have an account? <NavLink to='/sign-up'>Sign up</NavLink></span>
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
    </>
  )
}

export default LoginLeftComponent