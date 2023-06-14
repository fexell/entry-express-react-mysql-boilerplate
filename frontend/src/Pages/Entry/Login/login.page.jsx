import LoginComponent from '../../../Components/Entry/Login/login.component'

import '../entry.styles.sass'

const LoginPage = () => {
  return (
    <>
      <section id='LoginPage' className='login login__page page'>
        <div className='login__container login__page__container page__container'>
          <LoginComponent />
        </div>
      </section>
    </>
  )
}

export default LoginPage