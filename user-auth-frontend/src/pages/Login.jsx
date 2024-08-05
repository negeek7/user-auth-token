import React, { useState } from 'react'

function Login() {

    const [tabState, setTabState] = useState('login')

    return (
        <>
            <div className="flex flex-row justify-center items-center">
                <div className='border-2 border-red-400'>
                <button className={`${tabState === 'login' ? 'bg-purple-800' : 'bg-gray-500-800'}`}>Login</button>
                <button className={`${tabState === 'signup' ? 'bg-purple-800' : 'bg-gray-500-800'}`}>Sign up</button>



                <input 
                    className="bg-gray-600 p-6" 
                    type="text" 
                    onChange={(e) => handleInput(e, 'username')} 
                    value={formInfo.username} 
                />
                <input 
                    className="bg-gray-600 p-6" 
                    type="password" 
                    onChange={(e) => handleInput(e, 'password')} 
                    value={formInfo.password} 
                />
                <input 
                    className="bg-gray-600 p-6" 
                    type="password" 
                    onChange={(e) => handleInput(e, 'cpassword')} 
                    value={formInfo.cpassword} 
                />

                </div>

            </div>
        </>
    )
}

export default Login