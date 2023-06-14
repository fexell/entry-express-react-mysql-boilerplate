import './title.styles.sass'

/**
 * 
 * @param {*} h1 - Returns an h1 tag and its text.
 * @param {*} h2 - Returns an h1 tag and its text.
 * @param {*} h3 - Returns an h1 tag and its text.
 * @param {*} h4 - Returns an h1 tag and its text.
 * @param {*} h5 - Returns an h1 tag and its text.
 * @param {*} h6 - Returns an h1 tag and its text.
 * @param {*} footnoteText - A footnote text.
 * @returns 
 */
const FormTitleComponent = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  footnoteText
}) => {
  return (
    <>
      <div className='form__title__component component'>
        <div className='form__title__component__container component__container'>
          <header className='form__title__heading'>
            <div className='form__title__heading__container'>
            { !!h1 && (<h1>{ h1 }</h1>) }
            { !!h2 && (<h2>{ h2 }</h2>) }
            { !!h3 && (<h3>{ h3 }</h3>) }
            { !!h4 && (<h4>{ h4 }</h4>) }
            { !!h5 && (<h5>{ h5 }</h5>) }
            { !!h6 && (<h6>{ h6 }</h6>) }
            </div>
          </header>
          <footer className='form__title__footnote'>
            <div className='form__title__footnote__container'>
              <span className='footnote__text'>{ footnoteText }</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default FormTitleComponent