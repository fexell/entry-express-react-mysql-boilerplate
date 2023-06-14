import { useContext, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { MdPassword } from 'react-icons/md'
import axios from 'axios'

import FormComponent from '../../../Form/form.component'
import FormTitleComponent from '../../../Form/title.component'
import FormInputComponent from '../../../Form/input.component'
import FormButtonComponent from '../../../Form/button.component'
import FormSuccessComponent from '../../../Form/success.component'

import { ToastContext } from '../../../../Contexts/contexts.contexts'

import { ApiURI } from '../../../../Configs/mode.config'

const NewPasswordLeftComponent = () => {
  const [ , setToast ]                    = useContext(ToastContext)

  const [ formData, setFormData ]         = useState({ password: '', confirmPassword: '' })
  const [ error, setError ]               = useState({ error: null, message: null })
  const [ success, setSuccess ]           = useState({ success: null, message: null })

  const { passwordRecoveryToken }         = useParams()

  const handleSubmitNewPassword             = (e) => {
    e.preventDefault()

    axios.post(ApiURI + `/Auth/new-password/${ passwordRecoveryToken }`, formData)
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
      <div className='password__recovery__left__component entry__left__component component'>
        <div className='password__recovery__left__component__container entry__left__component__container component__container'>
          <FormComponent
            handleOnSubmit={ handleSubmitNewPassword }
            formData={ formData }
            setFormData={ setFormData }>
            <FormTitleComponent
              h1='New password'
              footnoteText='Please enter your new password.' />
            <FormInputComponent
              id='PasswordRecoveryPassword'
              labelText='Password'
              icon={ <MdPassword /> }
              type='password'
              name='password'
              placeholder='Enter your new password'
              error={ error.error === 'password' ? error : null } />
            <FormInputComponent
              id='PasswordRecoveryConfirmPassword'
              labelText='Confirm password'
              icon={ <MdPassword /> }
              type='password'
              name='confirmPassword'
              placeholder='Repeat your new password'
              error={ error.error === 'confirmPassword' ? error : null } />
            <FormSuccessComponent
              success={ success } />
            <FormButtonComponent
              type='submit'
              disabled={ !formData.password || !formData.confirmPassword }
              buttonText='Send'
              style={{ marginTop: 'var(--unit-4)' }} />
            <div className='entry__left__entry__link'>
              <div className='entry__left__entry__link__container'>
                <span>Don't need a new password? <NavLink to='/login'>Log in</NavLink></span>
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
    </>
  )
}

export default NewPasswordLeftComponent