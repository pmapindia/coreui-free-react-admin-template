import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
       <div style={{fontWeight:"bold"}}>
        <a href="#" target="_blank" rel="noopener noreferrer">SVP Developers </a>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto" style={{fontWeight:"bold"}}>
        <span className="mr-1">Powered by</span>
        <a 
        // href="https://coreui.io/react" 
          href="#" 

        target="_blank" rel="noopener noreferrer">Pmap Technotech Pvt Ltd</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
