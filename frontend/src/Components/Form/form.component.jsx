import { FormContext } from '../../Contexts/contexts.contexts'

/**
 * 
 * @param {*} children - Child-elements.
 * @param {*} handleOnSubmit - The function to be called when submitting the form.
 * @param {*} formData - The form data state object.
 * @param {*} setFormData - Set the form data state.
 * @returns A form component, with children.
 */
const FormComponent = ({
  children,
  handleOnSubmit,
  formData,
  setFormData
}) => {
  return (
    <>
      <div className='form__component component'>
        <div className='form__component__container component__container'>
          <FormContext.Provider value={[ formData, setFormData ]}>
            <form className='form' onSubmit={ handleOnSubmit }>
              <div className='form__container'>
                { children }
              </div>
            </form>
          </FormContext.Provider>
        </div>
      </div>
    </>
  )
}

export default FormComponent