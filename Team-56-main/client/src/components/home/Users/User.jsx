import React from 'react'
import { useParams } from 'react-router-dom';
const User = () => {

    const {jiya_id}=useParams();
  return (
    <>  
    <div className="bg-purple-700 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">User Details</h1>
        User: {jiya_id}
    </div>
    </>
  )
}

export default User
