import SignUpLeftComponent from './Left/signup-left.component'
import SignUpRightComponent from './Right/signup-right.component'

import '../entry.styles.sass'

const SignUpComponent = () => {
  return (
    <>
      <div className='signup__component entry__component component'>
        <div className='signup__component__container entry__component__container component__container'>
          <SignUpLeftComponent />
          <SignUpRightComponent />
        </div>
      </div>
    </>
  )
}

export default SignUpComponent