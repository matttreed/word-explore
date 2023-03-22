import logo from './logo.svg';
import './App.css';
import "./fonts/SpaceGrotesk-Bold.ttf";
import "./fonts/SpaceGrotesk-Light.ttf";
import "./fonts/SpaceGrotesk-Medium.ttf";
import "./fonts/SpaceGrotesk-Regular.ttf";
import "./fonts/SpaceGrotesk-SemiBold.ttf";
import { useEffect, useState } from 'react';
import InputSection from './components/inputSection/InputSection';
import WordVectors from './wordVectors/WordVectors';
import Trajectory from './components/Trajectory/Trajectory';
import drawSVG from './d3/drawTrajectory';
import drawSupPoints from './d3/drawSupPoint';
// import {word2vec} from "word2vec";

function App() {
  const [input, setInput] = useState("");
  const [VectorHandler, setVectorHandler] = useState(undefined);
  const [data, setData] = useState([]);
  const [supPoints, setSupPoints] = useState([]);
  const [trendInput, setTrendInput] = useState("");
  const [trendWords, setTrendWords] = useState([]);
  const [tooltipText, setTooltipText] = useState("TEXT");

  useEffect(() => {
    if (VectorHandler === undefined) {
      const v = new WordVectors();
      v.loadVectors().then(() => {
        setVectorHandler(v);
      })
    }
  }, [VectorHandler])

  const onClickSVG = (vec) => {
    const wordData = VectorHandler.getWordForVec(vec);
    supPoints.push(wordData)
    setSupPoints(supPoints)
    drawSupPoints(supPoints);
  }

  console.log(VectorHandler?.getWordForVec([30,30]))

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='Header-text'>Poem Vectorizer <span className='Subheader-text'>An Application by Matt Reed</span></h1>
      </header>
      <div className="Main-container">
        <div className='Left-section'>
          <InputSection 
            setInput={setInput} 
            input={input}
            poem={input} 
            VectorHandler={VectorHandler}
            data={data}
            setData={setData}
            setTooltipText={setTooltipText}
            trendInput={trendInput}
            setTrendInput={setTrendInput}
            trendWords={trendWords}
            setTrendWords={setTrendWords}
            // onClickSVG={onClickSVG}
          />
        </div>
        <div className='Right-section'>
          <Trajectory 
            data={data} 
            tooltipText={tooltipText}
            setTooltipText={setTooltipText}
            onClickSVG={onClickSVG}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
