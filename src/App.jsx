import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const[length, setLength] = useState(8); // Length of the password
  const[isNumberAllowed, setIsNumberAllowed] = useState(false); // for adding the number in the password
  const[isCharAllowed, setIsCharAllowed] = useState(false); // for adding special char in the password
  const[password, setPassword] = useState(""); // The generated password


  // useRef(): helps you keep track of important things in your app
  const passwordRef = useRef(null);
  


// useCallback() : helps React remember functions, so they don't have to be recreated every time your component re-renders.    
// useCallback(fn, [dependencies])
  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumberAllowed)  str += "0123456789"
    if(isCharAllowed) str += "~`!@#$%^&*(){}[]'.,/"

    for(let i = 1; i<= length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,isNumberAllowed,isCharAllowed,setPassword])


  // to copy the password to  the clipboard
  const copyToClipboard = useCallback(() =>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
  },[password])




// useEffect() : helps your React components do something whenever certain things change, like when the component first shows up, or when some data it needs is updated.
 
// In our case whenever the following dependecies are changed useEffect is calles
 // useEffect (fn, [dependencies])  dependencies: The list of all reactive values referenced inside of the fn code
  useEffect(() =>{
    passwordGenerator()
  }, [length, isNumberAllowed, isCharAllowed,passwordGenerator])
  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white'>
          <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4"> 
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-black"
              placeholder="Password"
              readOnly
              ref={passwordRef}  /* here a refernece of the password is taken to select the password*/
          />
          <button
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'
          >copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
          type="range"
          min={8}
          max={24}
          value={length}
          className='cursor-pointer text-white'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            id="numberInput"
            onChange={() => {
                setIsNumberAllowed((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={isCharAllowed}
              id="characterInput"
              onChange={() => {
                  setIsCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
      </div>
    
    </>
  )
}

export default App
