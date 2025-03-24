import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numallowed, setNumallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRaf hook
  const passwordRef = useRef(null)

  const handleGeneratePassword = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`"
    
    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(random)
    }
    setPassword(pass)
    }, [length, charallowed, numallowed, setPassword])

  const copyPasswordToclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {handleGeneratePassword()}, [handleGeneratePassword, length, charallowed, numallowed])
  return (
  
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
       <h1 className='text-white text-center my-3'>password genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='w-full px-4 py-2 bg-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setLength(e.target.value)
            }} />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={numallowed}
            id="numberInput"
            onChange={(e)=>{
              setNumallowed((prev) => !prev)
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={charallowed}
            id="characterInput"
            onChange={() => {
              setCharallowed((prev) => !prev )
          }}/>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
