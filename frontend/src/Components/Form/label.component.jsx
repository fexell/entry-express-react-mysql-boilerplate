import './label.styles.sass'

/**
 * 
 * @param {*} id - Identifier for the "for" attribute.
 * @param {*} labelText - The label text.
 * @returns A Form Label component.
 */
const FormLabelComponent = ({
  id,
  labelText
}) => {
  return (
    <>
      { !!labelText && (
        <div className='form__label form__label__component component'>
          <div className='form__label__container form__label__component__container component__container'>
            <label className='label' htmlFor={ id }>{ labelText }</label>
          </div>
        </div>
      ) }
    </>
  )
}

export default FormLabelComponent