import React, {useState} from "react";
import "./XCalculator.css";

const XCalculator = () => {
    const [input,setInput] = useState("");
    const [isResultFlag, setIsResultFlag] = useState(false);
    const [result, setResult] = useState("");

    // useEffect(()=> {setIsResultFlag(true);},[input]);

    const buttonArray = ['7','8','9','+','4','5','6','-','1','2','3','*','C','0','=','/'];

    const validExpressionPattern = /^[\d\s\+\-\*\/\(\)]+$/; // Allow digits, spaces, and arithmetic operators

    const handleBlur = (e) => {
        setIsResultFlag(false);

        const targetValue = e.target.value;
        if (validExpressionPattern.test(targetValue)){
            setInput(targetValue);
        }else{
            setIsResultFlag(true);
            setResult("Invalid Input")
        }
    }

    const handleBtnClick = (value) => {
        setIsResultFlag(false);

        if (value === '='){ 
            if (!input){
                setResult('Error');
                setIsResultFlag(true);
                return;
            }

            try {setResult(eval(input).toString()); // Evaluate the expression 
                setIsResultFlag(true);
            } 
            catch (error) { setResult('Error'); // Handle any errors 
            } 
        } else if (value === 'C') { 
            setInput(''); // Clear the display 
            setResult('');
            setIsResultFlag(false);
        } else { 
            setInput(input + value); // Append value to the display  
        };
    }

    return(
        <div className="main-container">
            <h1>React Calculator</h1>
            <label htmlFor="input"></label>
            <input  type="text" 
                    name="input" 
                    value={input} 
                    onChange={(e) => {setInput(e.target.value)}}
                    onBlur = {handleBlur}    
            ></input>
            <div>
                {isResultFlag? (<p>{result}</p>) : null}
            </div>
            <div className="calc-grid-container">
                {buttonArray.map((btn,idx) => (
                    <button className="button" key={idx} onClick={()=>handleBtnClick(btn)}>{btn}</button>
                ))}
            </div>
        </div>
    )
};

export default XCalculator