import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
function PrivatePage() {
  const location = useLocation();
  const user = location.state?.requestBody;
  return (
    <div>
      <p>Hi, {user.email}</p>
      <p>Add your first Record</p>
      <Link to={"/addRecord"}>Add your first Record!</Link>
    </div>
    
  )
}

export default PrivatePage