import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import InputSection from './components/inputSection/InputSection';
import WordVectors from './wordVectors/WordVectors';
import Trajectory from './components/Trajectory/Trajectory';
// import {word2vec} from "word2vec";

function App() {
  const [input, setInput] = useState("");
  const [VectorHandler, setVectorHandler] = useState(undefined);
  const [poemVectors, setPoemVectors] = useState([]);

  useEffect(() => {
    if (VectorHandler === undefined) {
      const v = new WordVectors();
      v.loadVectors().then(() => {
        setVectorHandler(v);
      })
    }
  }, [VectorHandler])

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="Main-container">
        <div className='Left-section'>
          <InputSection 
            setInput={setInput} 
            poem={input} 
            VectorHandler={VectorHandler}
            poemVectors={poemVectors}
            setPoemVectors={setPoemVectors}
          />
        </div>
        <div className='Right-section'>
          <Trajectory data={poemVectors}/>
        </div>
      </div>
    </div>
  );
}

export default App;
