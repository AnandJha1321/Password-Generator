import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(0)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password,setPassword] = useState("")


  
  const passwordGenerator = useCallback(() => {
    let pass= ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmno"
    if (numAllowed) str+= "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let index = 1; index <= length; index++) {
      let char = Math.random() * str.length + 1;
      pass += str.charAt(char)      
}

    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null)

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
    alert("copied")

  })

  useEffect(() => {
    passwordGenerator()
  },[length, numAllowed, charAllowed])
  return (
    <>
    <div className='h-screen bg-blue-300 py-80'>
    <div className='w-full max-w-md mx-auto shadow-md 
    rounded-lg px-4 py-4  bg-gray-800 text-center text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input 
          type="text"
          value={password}
          className='ouline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
         />
         <button 
         className='bg-blue-700 text-700 text-white px-3 py-0.5 shrink-0'
         onClick={copypasswordToClipboard}>
          Copy
          </button> 
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked = {numAllowed}
          id='numberInput'
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}  
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked = {charAllowed}
          id='charInput'
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}  
          />
          <label htmlFor="charInput">Characters</label>
        </div>        
      </div>
  </div>

    </div>
  
       
    </>
  )
}

export default App
