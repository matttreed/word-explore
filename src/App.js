import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputSection from './components/inputSection/InputSection';
// import {word2vec} from "word2vec";

function App() {
  const [input, setInput] = useState("");

  useEffect(() => {
    // const result = loadModel("text.txt", () => {})
  }, [input])

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="Main-container">
        <div className='Left-section'>
          <InputSection setInput={setInput} poem={input}/>
        </div>
        <div className='Right-section'>
          <InputSection setInput={setInput} poem={input}/>
        </div>
      </div>
    </div>
  );
}

export default App;
