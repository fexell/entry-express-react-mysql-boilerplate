import { useState } from 'react'

import ForgotPasswordLeftComponent from './Left/forgot-password-left.component'
import ForgotPasswordRightComponent from './Right/forgot-password-right.component'

import '../entry.styles.sass'

const ForgotPasswordComponent = () => {
  return (
    <>
      <div className='forgot__password__component entry__component component'>
        <div className='forgot__password__component__container entry__component__container component__container'>
          <ForgotPasswordLeftComponent />
          <ForgotPasswordRightComponent />
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordComponent