import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState()
  const [copy, setCopy] = useState("")
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num = "1234567890"
    let pass = "";
    if (numberAllowed) str += num;
    if (charAllowed) str += "!@#$%^&*_=+-'~";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
      // pass += str[char];
    }
    setPassword(pass)
  }, [numberAllowed, length, charAllowed]);
  useEffect(() => {
    passwordGenerator()
  }, [numberAllowed, length, charAllowed])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    setCopy("done!")
  }
  return (
    <>
      <h1>PASSWORD GENERATOR </h1>
      <input
        type="text"
        value={password}
        placeholder="Password"
        className='outline-none w-full py-1 px-3' />
      <span><button onClick={copyToClipboard}>copy</button> {copy} </span><br />
      <button onClick={passwordGenerator}>Generate</button>
      <div> <input type="range"
        min={6}
        max={50}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {
          return setLength(e.target.value)
        }}
      />
        <label >length: {length}</label>
        <input type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => (!prev)) }} />Numbers
        <input type="checkbox" defaultChecked={charAllowed} onChange={() => { setCharAllowed((prev) => (!prev)) }} />Characters
      </div>
    </>
  )

}
export default App