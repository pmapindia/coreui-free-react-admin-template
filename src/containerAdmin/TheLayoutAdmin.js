import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayoutAdmin = ({children}) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          {children}
          {/* <TheContent/> */}
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayoutAdmin
