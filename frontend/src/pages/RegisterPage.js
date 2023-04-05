import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

function RegisterPage() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [error,setError] = useState('')

  const navigate = useNavigate();
  const register = async () => {
    try {
      if(password!==confirmpassword){
        setEmail('Passwords does not match');
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles')
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <>
    <h1>Create Account</h1>
    {error && <p className='error'>{error}</p>}
    <input type="text" placeholder='Enter Email address' value={email} onChange={e=>setEmail(e.target.value)}/>
    <input type="password" placeholder='Enter Password' value={password} onChange={e=>setPassword(e.target.value)}/>
    <input type="password" placeholder='Enter Password Again' value={confirmpassword} onChange={e=>setConfirmPassword(e.target.value)}/>
    <button onClick={register}>Login</button>
    <Link to="/login">Already have an account? Login here!</Link>
    </>
    
  )
}

export default RegisterPage