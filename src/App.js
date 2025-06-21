import './App.css';
import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [lastEval, setLastEval] = useState(false);

  function handleText(event) {
    const value = event.target.value;
    
    // Prevent invalid first characters
    if (inputText === '' && ['0', '/', '*', '-', '+', '%'].includes(value)) {
      return;
    }
    
    // Prevent multiple decimal points in the same number
    if (value === '.') {
      const lastNumber = inputText.split(/[-+*/%]/).pop();
      if (lastNumber.includes('.')) {
        return;
      }
    }
    // resets evaluated numbers to a new input instead of appending to the current evaluation when a number is clicked but alows for the evaluated number to be evaluated again if a symbol is clicked instead

    
    if (lastEval && !isNaN(value)) {
      setInputText(value);
      setLastEval(false);
    } else {
      setInputText(prevInputText => prevInputText + value);
      setLastEval(false);
    }
  }
function handleEqual() {
  try {
    // eslint-disable-next-line no-eval
    setInputText(eval(inputText).toString());
    setLastEval(true);
  } catch (error) {
    alert('Invalid expression');
  }
}


  function handleDel() {
    setInputText(prevInputText => prevInputText.slice(0, -1));
    setLastEval(false);
  }

  return (
    <div className="container">
      <input type="text" value={inputText} className='textSection' readOnly />
      <div className="buttons">
        <input type="button" value="AC" className="ac" onClick={() => setInputText('')} />
        <input type="button" value="Del" className="del" onClick={handleDel} />
        <input type="button" value="%" onClick={handleText} />
        <input type="button" value="/" onClick={handleText} />
        <input type="button" value="7" onClick={handleText} />
        <input type="button" value="8" onClick={handleText} />
        <input type="button" value="9" onClick={handleText} />
        <input type="button" value="+" onClick={handleText} />
        <input type="button" value="4" onClick={handleText} />
        <input type="button" value="5" onClick={handleText} />
        <input type="button" value="6" onClick={handleText} />
        <input type="button" value="-" onClick={handleText} />
        <input type="button" value="1" onClick={handleText} />
        <input type="button" value="2" onClick={handleText} />
        <input type="button" value="3" onClick={handleText} />
        <input type="button" value="*" onClick={handleText} />
        <input type="button" value="0" onClick={handleText} />
        <input type="button" value="." onClick={handleText} />
        <input type="button" value="=" className="equalTo" onClick={handleEqual} />
      </div>
    </div>
  );
}

export default App;
