import { Outlet } from 'react-router-dom'

const ContentComponent = () => {
  return (
    <>
      <div className='content content__component component'>
        <div className='content__container content__component__container component__container'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ContentComponent