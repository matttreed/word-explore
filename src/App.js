import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputSection from './components/inputSection/InputSection';
import { loadVectors } from './wordVectors/loadVectors';
// import {word2vec} from "word2vec";

function App() {
  const [input, setInput] = useState("");
  const [vectors, setVectors] = useState(undefined);

  useEffect(() => {
    if (vectors === undefined) {
      loadVectors().then(({size, dim, vectors}) => {
        setVectors(vectors);
      }).catch(error => {
        console.log("Error loading vectors: " + error);
      })
    }
  }, [vectors])

  const getVecForWord = word => {
    return (vectors && vectors[word]) || [0,0];
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="Main-container">
        <div className='Left-section'>
          <InputSection setInput={setInput} poem={input} getVecForWord={getVecForWord}/>
        </div>
        <div className='Right-section'>
          <InputSection setInput={setInput} poem={input}/>
        </div>
      </div>
    </div>
  );
}

export default App;
