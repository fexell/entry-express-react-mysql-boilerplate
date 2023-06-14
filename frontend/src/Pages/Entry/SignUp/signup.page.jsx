import SignUpComponent from '../../../Components/Entry/SignUp/signup.component'

import '../entry.styles.sass'

const SignUpPage = () => {
  return (
    <>
      <section id='SignUpPage' className='signup signup__page page'>
        <div className='signup__container signup__page__container page__container'>
          <SignUpComponent />
        </div>
      </section>
    </>
  )
}

export default SignUpPage