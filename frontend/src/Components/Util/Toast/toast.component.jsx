import { useContext, useState, useRef, useEffect } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import UtilToastProgressBarComponent from './toast-progress-bar.component'

import { ToastContext } from '../../../Contexts/contexts.contexts'

import './toast.styles.sass'

const UtilToastComponent = () => {
  const [ toast, setToast ]         = useContext(ToastContext)

  let [ seconds, setSeconds ]       = useState(4)
  const [ isPaused, setPaused ]     = useState(false)

  const toastElement                = useRef(null)

  let interval                      = null

  const timer                       = () => {
    toastElement.current.classList.add('counting--down')

    interval                        = window.setInterval(() => {
      console.log(seconds)

      if(seconds > 0 && isPaused) window.clearInterval(interval)
      else if(seconds > 0 && !isPaused) setSeconds(--seconds)
      else {
        setSeconds(4)
        setToast({ message: null })

        toastElement.current.classList.remove('counting--down')

        window.clearInterval(interval)
      }
    }, 1000)
  }

  const handleCloseToast            = () => {
    setToast({ message: null })
    setPaused(false)
    setSeconds(4)

    return () => window.clearInterval(interval)
  }

  useEffect(() => {
    if(toast.message) timer()

    return () => window.clearInterval(interval)
  }, [ toast.message, isPaused ])

  return (
    <>
      { toast.message && (
        <div
          className={ `util__toast__component component
          ${ !toast.error && !toast.success ? 'default' : '' }
          ${ toast.error ? 'error' : '' }
          ${ toast.success ? 'success' : '' }` }
          onMouseOver={ () => setPaused(true) }
          onMouseOut={ () => setPaused(false) }
          ref={ toastElement }>
          <div className='util__toast__component__container component__container'>
            <div className='util__toast__content'>
              <div className='util__toast__content__container'>
                <span className='util__toast__message'>{ toast.message }</span>
              </div>
            </div>
            <div className='util__toast__close__button' role='button' onClick={ handleCloseToast }>
              <div className='util__toast__close__button__container'>
                <div className='util__toast__close__icon'>
                  <div className='util__toast__close__icon__container'>
                    <MdOutlineClose />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UtilToastProgressBarComponent />
        </div>
      ) }
    </>
  )
}

export default UtilToastComponent