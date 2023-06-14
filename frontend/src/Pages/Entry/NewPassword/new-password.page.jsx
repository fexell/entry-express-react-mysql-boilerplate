import NewPasswordComponent from '../../../Components/Entry/NewPassword/new-password.component'

const NewPasswordPage = () => {
  return (
    <>
      <section id='NewPasswordPage' className='new__password new__password__page page'>
        <div className='new__password__container new__password__page__container page__container'>
          <NewPasswordComponent />
        </div>
      </section>
    </>
  )
}

export default NewPasswordPage