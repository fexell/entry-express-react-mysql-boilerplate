import { useContext, useRef } from 'react'

import FormLabelComponent from './label.component'
import FormErrorComponent from './error.component'

import { FormContext } from '../../Contexts/contexts.contexts'

/**
 * 
 * @param {*} id - Identifier for both ID and label for attribute.
 * @param {*} className - Additional classnames.
 * @param {*} labelText - The text for the label.
 * @param {*} icon - A react icons icon.
 * @param {*} type - Input type.
 * @param {*} name - The name for the input.
 * @param {*} placeholder - The placeholder text.
 * @param {*} error
 * @returns An input component.
 */
const FormInputComponent = ({
  id,
  className,
  labelText,
  icon,
  type,
  name,
  placeholder,
  defaultValue,
  error
}) => {
  const [ formData, setFormData ]           = useContext(FormContext)

  const formInputElement                    = useRef(null)

  const handleOnInputChange                 = (e) => {
    const { name, value }                   = e.target

    if(value.length) formInputElement.current.classList.add('has--content')
    else formInputElement.current.classList.remove('has--content')

    setFormData({
      ...formData,
      [ name ]: value
    })
  }

  const handleOnInputFocus                  = () => {
    formInputElement.current.classList.add('input--focused')
  }

  const handleOnInputBlur                   = () => {
    formInputElement.current.classList.remove('input--focused')
  }

  return (
    <>
      <div className='form__input__component component' ref={ formInputElement }>
        <div className='form__input__component__container component__container'>
          <FormLabelComponent id={ id } labelText={ labelText } />
          <div className='form__input__wrapper'>
            <div className='form__input__wrapper__container'>
              <div className='form__input__icon'>
                <div className='form__input__icon__container'>
                  { icon }
                </div>
              </div>
              <div className='input__container'>
                <input
                  id={ id }
                  className={ `input ${ className ? className : '' }` }
                  type={ type }
                  name={ name }
                  placeholder={ placeholder }
                  defaultValue={ defaultValue }
                  onChange={ handleOnInputChange }
                  onFocus={ handleOnInputFocus }
                  onBlur={ handleOnInputBlur }
                  style={{ paddingLeft: icon ? 'var(--unit-15)' : '', marginBottom: !labelText ? 'var(--unit-2)' : '' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormErrorComponent error={ error } />
    </>
  )
}

export default FormInputComponent