import { useCallback, useState } from 'react'
import { useEffect ,useRef } from 'react';

import './App.css'

function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (characterAllowed) {
      str += "~!@#$%^&*(){}<>?/\|[]"

    }

    for (let i = 1; i <= length; i++) {
      let  char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char);


    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);


  const copyPasswordToClipboard=useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,50);

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();

  } ,[ length, numberAllowed, characterAllowed, passwordGenerator])






  return (
    <>
      <div className='w-full bg-gray-700 max-w-lg rounded-lg px-4 py-5 my-8 m-auto  '>
        <h1 className='text-white text-center my-3 text-2xl font-bold '> Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden bg-white mb-4'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordref}
          />
          <button 
          onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy </button>
        </div>

        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={5}
              max={100}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="length" className='text-white text-xl '> Length :{length}</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='number'
              onChange={(e) => {
                setNumberAllowed((prev) => !prev)
              }}



            />
            <label htmlFor="number" className='text-white text-xl '> Number</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id='character'
              onChange={(e) => {
                setCharacterAllowed((prev) => !prev)

              }}
            />
            <label htmlFor="charcter" className='text-white text-xl'> Character</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
