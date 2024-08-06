import React, { useState } from 'react'
import apiCaller from '../apiCaller/apiCaller'

function Login() {

    const [tabState, setTabState] = useState('login')
    const [formInfo, setFormInfo] = useState({ username: '', password: '', cpassword: '' })

    const handleInput = (e, type) => {
        let value = e.target.value
        if (type === "username") setFormInfo(prevState => ({ ...prevState, username: value }))
        if (type === "password") setFormInfo(prevState => ({ ...prevState, password: value }))
        if (type === "cpassword") setFormInfo(prevState => ({ ...prevState, cpassword: value }))
    }

    const handleSubmit = () => {
        if(tabState === 'login')
        console.log(formInfo, "FORM INFO")
        apiCaller('/signup', 'POST', formInfo)
    }

    console.log(import.meta.env.LOCAL_API_CALLER, 'import.meta.env.LOCAL_API_CALLER')
    console.log(import.meta.env.MODE, 'import.meta.env.MODE')

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>




            <div className='flex flex-row gap-4 mb-10'>
                <button className={`focus:outline-none ${tabState === 'login' ? 'bg-purple-800' : 'bg-gray-500-800'}`} onClick={() => setTabState('login')}>
                    Login
                </button>
                <button className={`focus:outline-none ${tabState === 'signup' ? 'bg-purple-800' : 'bg-gray-500-800'}`} onClick={() => setTabState('signup')}>Sign up</button>
            </div>



            <div className='max-h-56 h-auto flex flex-col justify-start items-center gap-4 transition-height'>
                <input
                    className="bg-gray-800 p-4 rounded-lg focus:outline-none"
                    placeholder='enter username'
                    type="text"
                    onChange={(e) => handleInput(e, 'username')}
                    value={formInfo.username}
                />
                <input
                    className="bg-gray-800 p-4 rounded-lg focus:outline-none"
                    placeholder='enter password'
                    type="password"
                    onChange={(e) => handleInput(e, 'password')}
                    value={formInfo.password}
                />
                {
                    tabState === 'signup' &&
                    <input
                        className="bg-gray-800 p-4 rounded-lg focus:outline-none"
                        placeholder='enter cpassword'
                        type="password"
                        onChange={(e) => handleInput(e, 'cpassword')}
                        value={formInfo.cpassword}
                    />
                }
            </div>
            <button 
                className="hover:bg-purple-900 bg-purple-800 mt-8 focus:outline-none"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default Login