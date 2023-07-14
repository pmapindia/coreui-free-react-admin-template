import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
<<<<<<< HEAD
       <div>
        <a style={{color:"blue"}} target="_blank" rel="noopener noreferrer">PmapG</a>
        <span className="ml-1">&copy; 2020.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a 
        // href="https://coreui.io/react" 
          href="https://pmaptechnotech.com/" 
=======
       <div style={{fontWeight:"bold"}}>
        <a href="#" target="_blank" rel="noopener noreferrer">SVP Developers </a>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto" style={{fontWeight:"bold"}}>
        <span className="mr-1">Powered by</span>
        <a 
        // href="https://coreui.io/react" 
          href="#" 
>>>>>>> 3e4f60b80bfb93a13fe631da21fb02530bdc8689

        target="_blank" rel="noopener noreferrer">Pmap Technotech Pvt Ltd</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
