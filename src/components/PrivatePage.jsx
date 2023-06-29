import React from 'react'
import { Link } from 'react-router-dom'
function PrivatePage() {
 
  return (
    <div>
     
      <p>Add your first Record</p>
      <Link to={"/addRecord"}>Add your first Record!</Link>
    </div>
    
  )
}

export default PrivatePage