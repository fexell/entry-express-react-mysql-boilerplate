
/**
 * 
 * @param {*} type - The button type.
 * @param {*} className - Additional classnames.
 * @param {*} disabled - Whether the button is disabled or not.
 * @param {*} buttonText - The text to be displayed for the button.
 * @param {*} style - Styles
 * @returns A Form Button component.
 */
const FormButtonComponent = ({
  type,
  className,
  disabled,
  buttonText,
  style
}) => {
  return (
    <>
      <div className='form__button__component component'>
        <div className='form__button__component__container component__container'>
          <button
            className={ `button ${ className ? className : '' }` }
            type={ type }
            disabled={ disabled }
            style={ style }>{ buttonText }</button>
        </div>
      </div>
    </>
  )
}

export default FormButtonComponent