import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
       <div>
        <a style={{color:"blue"}} target="_blank" rel="noopener noreferrer">PmapG</a>
        <span className="ml-1">&copy; 2020.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a 
        // href="https://coreui.io/react" 
          href="https://pmaptechnotech.com/" 

        target="_blank" rel="noopener noreferrer">Pmap Technotech Pvt Ltd</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
