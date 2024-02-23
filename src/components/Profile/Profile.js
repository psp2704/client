import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext/AuthContext'

function Profile() {
    const { state, getProfile } = useContext(AuthContext);

    const handleFetchProfile = () => {
        getProfile();
    }

    return (
        <div>
            <h1 className="text-center">Profile</h1>
            <hr />
            <div className="container">
                <div>{state?.profile?.userData?.fullname}</div>
                <div>{state?.profile?.userData?.email}</div>
            </div>
            <hr />
            <button onClick={handleFetchProfile} className='px-3 py-2 w-20 m-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg'>Data</button>
        </div>
    )
}

export default Profile