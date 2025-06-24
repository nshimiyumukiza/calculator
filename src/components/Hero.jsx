import { useEffect } from "react";
import { useState } from "react"

const Hero = () => {
    const [input, setInput] = useState("");

// add keyboard support
useEffect(() => {
    const handleKeyPress = (event) => {
        const {key} = event;
        if(!isNaN(key) || ["+","-","*","/"].includes(key)){
            handleClick(key);
        }else 
            if(key === "Enter"){
                caluclate();
            } else if (key === "Backspace"){
                setInput((prev) => prev.slice(0, -1));
            } else if(key.toLowerCase() === "c"){
                clear();
            }
         
    }
    window.addEventListener( "keydown",handleKeyPress);
    return () => window.removeEventListener( "keydown",handleKeyPress);
},[input])


    const isOperetor = (val) => ["+","*","-","/"].includes(val);

    const handleClick = (value) =>{
        const lastChar = input.slice(-1);
        if(isOperetor(value) && (input === "" || isOperetor(lastChar))) return;
        if(value === "." && (lastChar === "." || input.split(/[\+\-\*\/]/).pop().includes(".")))
            return
        setInput(input +value)

    }

    const caluclate = () => {
        try {
            setInput(eval(input).toString());
            
        } catch (error) {
            setInput(error)
            
        }
    }
    const clear = () => {
        setInput("");
    }
    return(
        <div className=" bg-gray-800 max-w-md mx-auto px-4 py-3 ">
            <div className="bg-gray-700 p-4 rounded-xl shadow-md w-full">
                <div className="mb-4">
                    <input value={input} className="w-full text-right text-2xl rounded-md bg-gray-50 pr-3" readOnly type="text" />
                </div>

            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 ">
                {["7","8","9","/",
                    "4","5","6","*",
                    "1","2","3","-",
                    "0",".","=","+"
                ].map((item) => item === "=" ? (
                    <button key={item} onClick={caluclate} className="bg-gray-500 col-span-1  py-2 rounded text-white text-lg">{item}</button>
                ): (
                    <button key={item} onClick={ () => handleClick(item)} className="bg-gray-700 py-2 rounded text-white text-xl">{item}</button>
                ))}
                <button onClick={clear} className="col-span-4 bg-red-600 py-2 rounded text-white text-xl">clear</button>

            </div>

        </div>
    )

}
export default Hero
