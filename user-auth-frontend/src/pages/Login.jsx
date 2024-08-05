import React, { useState } from 'react'

function Login() {

    const [tabState, setTabState] = useState('login')
    const [formInfo, setFormInfo] = useState({ username: '', password: '', cpassword: '' })

    const handleInput = (e, type) => {
        let value = e.target.value
        if (type === "username") setFormInfo(prevState => ({ ...prevState, username: value }))
        if (type === "password") setFormInfo(prevState => ({ ...prevState, password: value }))
        if (type === "cpassword") setFormInfo(prevState => ({ ...prevState, cpassword: value }))
    }


    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>




            <div className='flex flex-row gap-4 border-2 mb-10 border-blue-800'>
                <button className={`focus:outline-none ${tabState === 'login' ? 'bg-purple-800' : 'bg-gray-500-800'}`} onClick={() => setTabState('login')}>
                    Login
                </button>
                <button className={`focus:outline-none ${tabState === 'signup' ? 'bg-purple-800' : 'bg-gray-500-800'}`} onClick={() => setTabState('signup')}>Sign up</button>
            </div>



            <div className='max-h-56 h-56 border-2 border-red-500 flex flex-col justify-start items-center gap-4 transition-height'>
                    <input
                        className="bg-gray-800 p-4 rounded-lg"
                        placeholder='enter username'
                        type="text"
                        onChange={(e) => handleInput(e, 'username')}
                        value={formInfo.username}
                    />
                    <input
                        className="bg-gray-800 p-4 rounded-lg"
                        placeholder='enter password'
                        type="password"
                        onChange={(e) => handleInput(e, 'password')}
                        value={formInfo.password}
                    />
                    {
                        tabState === 'signup' &&
                        <input
                            className="bg-gray-800 p-4 rounded-lg"
                            placeholder='enter cpassword'
                            type="password"
                            onChange={(e) => handleInput(e, 'cpassword')}
                            value={formInfo.cpassword}
                        />
                    }
                </div>
        </div>
    )
}

export default Login