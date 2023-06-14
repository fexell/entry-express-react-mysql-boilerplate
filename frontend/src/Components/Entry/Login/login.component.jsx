import LoginLeftComponent from './Left/login-left.component'
import LoginRightComponent from './Right/login-right.component'

import '../entry.styles.sass'

const LoginComponent = () => {
  return (
    <>
      <div className='login__component entry__component component'>
        <div className='login__component__container entry__component__container component__container'>
          <LoginLeftComponent />
          <LoginRightComponent />
        </div>
      </div>
    </>
  )
}

export default LoginComponent