import './error.styles.sass'

/**
 * 
 * @param {*} error - The error object containing error.error and error.message.
 * @returns A Form Error component
 */
const FormErrorComponent = ({
  error
}) => {
  return (
    <>
      { error && (
        <div className='form__error__component component'>
          <div className='form__error__component__container component__container'>
            <span className='error__text'>{ error.message }</span>
          </div>
        </div>
      ) }
    </>
  )
}

export default FormErrorComponent