import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import axios from 'axios'

import FormComponent from '../../../Form/form.component'
import FormTitleComponent from '../../../Form/title.component'
import FormInputComponent from '../../../Form/input.component'
import FormButtonComponent from '../../../Form/button.component'
import FormSuccessComponent from '../../../Form/success.component'

import { ToastContext } from '../../../../Contexts/contexts.contexts'

import { ApiURI } from '../../../../Configs/mode.config'

const ForgotPasswordLeftComponent = () => {
  const [ , setToast ]                    = useContext(ToastContext)

  const [ formData, setFormData ]         = useState({ email: '' })
  const [ error, setError ]               = useState({ error: null, message: null })
  const [ success, setSuccess ]           = useState({ success: null, message: null })

  const handleSubmitForgotPassword        = (e) => {
    e.preventDefault()

    axios.post(ApiURI + '/Auth/forgot-password', formData)
      .then((response) => {
        console.log(response)
        setError({ error: null, message: null })
        setSuccess({ success: response.data.success, message: response.data.message })
      })
      .catch((error) => {
        console.error(error)
        setSuccess({ success: null, message: null })
        setError({ error: error.response.data.error, message: error.response.data.message })

        if(error.response.status === 500) return setToast({ error: true, message: error.response.data.message })
      })
  }

  return (
    <>
      <div className='forgot__password__left__component entry__left__component component'>
        <div className='forgot__password__left__component__container entry__left__component__container component__container'>
          <FormComponent
            handleOnSubmit={ handleSubmitForgotPassword }
            formData={ formData }
            setFormData={ setFormData }>
            <FormTitleComponent
              h1='Forgot password?'
              footnoteText='Forgotten your password? Please enter your email.' />
            <FormInputComponent
              id='ForgotPasswordEmail'
              labelText='Email'
              icon={ <FaEnvelope /> }
              type='email'
              name='email'
              placeholder='Enter your email'
              error={ error.error === 'email' ? error : null } />
            <FormSuccessComponent
              success={ success } />
            <FormButtonComponent
              type='submit'
              disabled={ !formData.email }
              buttonText='Send'
              style={{ marginTop: 'var(--unit-4)' }} />
            <div className='entry__left__entry__link'>
              <div className='entry__left__entry__link__container'>
                <span>Don't need to reset password? <NavLink to='/login'>Log in</NavLink></span>
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordLeftComponent