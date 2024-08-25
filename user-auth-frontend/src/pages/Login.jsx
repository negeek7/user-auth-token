import React, { useEffect, useState } from 'react'
import apiCaller from '../apiCaller/apiCaller'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [tabState, setTabState] = useState('login')
    const [formInfo, setFormInfo] = useState({ username: '', password: '', cpassword: '' })

    let navigate = useNavigate() 


    useEffect(() => {
        setFormInfo({ username: '', password: '', cpassword: '' })
    }, [tabState])

    const handleInput = (e, type) => {
        let value = e.target.value
        if (type === "username") setFormInfo(prevState => ({ ...prevState, username: value }))
        if (type === "password") setFormInfo(prevState => ({ ...prevState, password: value }))
        if (type === "cpassword") setFormInfo(prevState => ({ ...prevState, cpassword: value }))
    }

    const handleSubmit = async () => {
        if (tabState === 'login') {
            let response = await apiCaller('/signin', 'POST', formInfo)    
            console.log(response, "response")
            if(response.message == "Authenticated") {
                navigate('/home') 
            }
        }
        if(tabState === 'signup') {
            console.log(formInfo, "FORM INFO")
            apiCaller('/api/signup', 'POST', formInfo)       
        }
    }

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