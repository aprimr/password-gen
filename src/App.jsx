import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"

export default function App() {
  const [length, setLength] = useState(25);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState();
  let passRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if(number) str += "0123456789"
    if(character) str += "!@#$%&*_?/."

    for(let i=1; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,number,character,password]);

  const copyPass = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{passwordGenerator()},[length,number,character])
  
  return (
    <>
    <div className="h-screen w-full flex justify-center items-center bg-blue-400 ">
      <div className=" w-full md:w-1/2 xl:w-1/3 flex flex-col rounded-xl bg-white p-10 ">
        <p className="text-3xl font-serif mb-4 flex justify-center text-center" style={{fontFamily: "poppins"}}>Password Generator</p>
        <div className="h-10 w-full flex justify-center border-2 border-gray-600 rounded">
          <input ref={passRef} type="text" placeholder="Password" value={password} readOnly className="w-4/5 px-2 outline-none"/>
          <button onClick={copyPass} className="w-1/5 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all">COPY</button>
        </div>
        <div className="w-full flex justify-center flex-wrap flex-row mt-6 gap-8 sm:gap-4">
          <div className="flex gap-2">
            <input type="range" min={5} max={25} onChange={(e)=>{setLength(e.target.value)}}/>
            <p> Length : {length} </p>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="num" onClick={()=>{
              setNumber((prev) => !prev);
              // console.log(number)
              }}/>
            <label htmlFor="num">Numbers </label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="char" onClick={()=>{
              setCharacter((prev) => !prev)
              // console.log(character)
            }}/>
            <label htmlFor="char">Characters</label>
          </div>
         
          
        </div>
      </div>
    </div>
    </>
  )
}
