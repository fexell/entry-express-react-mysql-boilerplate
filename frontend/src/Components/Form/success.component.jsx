import './success.styles.sass'

const FormSuccessComponent = ({
  success
}) => {
  return (
    <>
      { success.success && (
        <div className='form__success__component component'>
          <div className='form__success__component__container component__container'>
            <span className='success__text'>{ success.message }</span>
          </div>
        </div>
      ) }
    </>
  )
}

export default FormSuccessComponent