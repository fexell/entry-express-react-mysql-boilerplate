import NewPasswordLeftComponent from './Left/new-password-left.component'
import NewPasswordRightComponent from './Right/new-password-right.component'

const NewPasswordComponent = () => {
  return (
    <>
      <div className='password__recovery__component entry__component component'>
        <div className='password__recovery__component__container entry__component__container component__container'>
          <NewPasswordLeftComponent />
          <NewPasswordRightComponent />
        </div>
      </div>
    </>
  )
}

export default NewPasswordComponent