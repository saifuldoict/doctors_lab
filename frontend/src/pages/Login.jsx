import React, { useState } from 'react'

const Login = () => {
  const [state, setState]= useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

const onSubmitHandler = async(e) => {
 e.preventDefault()
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 box-border shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-3 text-center">{state ==='Sign Up'? "Create Account": "Login"}</h2>
        <h3>Please {state === 'Sign Up'? 'Sign Up': 'Login'} to book appointment</h3>
        <form className=' '>
          {
            state === 'Sign Up'&&
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input onChange={(e)=>setName(e.target.value)}
              type="text"
              id="fullName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          }
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          > {state === 'Sign Up'? 'Create Account': 'Login'}</button>
            <div className="mt-4 text-center text-sm text-gray-600">
              {
                state  === 'Sign Up'
                ? <p>Already have an account? <span onClick={()=>setState('Login')} className="text-blue-500 hover:underline cursor-pointer">Login here</span></p>
                : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='text-blue-500 hover:underline cursor-pointer'>Click here</span></p>
              }
            </div>
        </form>
        
      </div>
    </div>
  )
}

export default Login