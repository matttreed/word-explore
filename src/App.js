import logo from './logo.svg';
import './App.css';
import "./fonts/SpaceGrotesk-Bold.ttf";
import "./fonts/SpaceGrotesk-Light.ttf";
import "./fonts/SpaceGrotesk-Medium.ttf";
import "./fonts/SpaceGrotesk-Regular.ttf";
import "./fonts/SpaceGrotesk-SemiBold.ttf";
import { useEffect, useRef, useState } from 'react';
import InputSection from './components/inputSection/InputSection';
import WordVectors from './wordVectors/WordVectors';
import Trajectory from './components/Trajectory/Trajectory';
import drawSVG from './d3/drawTrajectory';
import drawSupPoints from './d3/drawSupPoint';
import Trends from './components/Trends/Trends';
import drawTrend from './d3/drawTrend';
import selectPoint from './d3/selectPoint';
// import {word2vec} from "word2vec";

function App() {
  const [input, setInput] = useState("");
  const [VectorHandler, setVectorHandler] = useState(undefined);
  const [data, setData] = useState([]);
  const [supPoints, setSupPoints] = useState([]);
  const [trendInput, setTrendInput] = useState("");
  const [trendWords, setTrendWords] = useState([]);
  const [tooltipText, setTooltipText] = useState("TEXT");
  const [trendTooltipText, setTrendTooltipText] = useState("");
  const [useCosine, setUseCosine] = useState(false);
  const [selectingPoint, setSelectingPoint] = useState(false);

  useEffect(() => {
    if (VectorHandler === undefined) {
      const v = new WordVectors();
      v.loadVectors().then(() => {
        setVectorHandler(v);
      })
    }
  }, [VectorHandler])

  const clickToSelectPoint = (event) => {
    console.log(event);
    setSelectingPoint(false);
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const word = selectPoint([x,y], VectorHandler)
    trendWords.push({
        word: word.word,
        vector: word.vec
    })
    drawSupPoints(trendWords, setTooltipText)
  }

  const onClickSVG = (vec) => {
    const wordData = VectorHandler.getWordForVec(vec);
    supPoints.push(wordData)
    setSupPoints(supPoints)
    drawSupPoints(supPoints);
  }

  const visualize = () => {
    const v = [];
    input.toLowerCase()
      .replace( /\n/g, " " )
      .split(" ")
      .filter(s => s.length > 0)
      .filter(s => VectorHandler.getVecForWord(s))
      .forEach(word => {
        const vec = VectorHandler.getVecForWord(word)
        v.push({
          word,
          x: vec[0],
          y: vec[1]
        })
      })
    setData(v);
    // drawSVG("Trajectory-svg", data, setTooltipText, onClickSVG);
    drawSVG(v, setTooltipText);
    drawTrend(v, trendWords, setTrendTooltipText, useCosine);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='Header-text'>Poem Vectorizer <span className='Subheader-text'>An Application by Matt Reed</span></h1>
        <button 
          className='Visualize-button'
          onClick={visualize}
        >
          Visualize
        </button>
      </header>
      <div className='Data-container'>
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
            setTrendTooltipText={setTrendTooltipText}
            useCosine={useCosine}
            setUseCosine={setUseCosine}
            selectingPoint={selectingPoint}
            setSelectingPoint={setSelectingPoint}
            // onClickSVG={onClickSVG}
          />
        </div>
        <div className='Right-section'>
          <Trajectory 
            data={data} 
            tooltipText={tooltipText}
            setTooltipText={setTooltipText}
            onClickSVG={onClickSVG}
            visualize={visualize}
            selectingPoint={selectingPoint}
            clickToSelectPoint={clickToSelectPoint}
          />
        </div>
      </div>
      <div style={{
          display: "flex",
          flex: 1
        }}>
        <Trends
            data={data} 
            trendTooltipText={trendTooltipText}
            setTrendTooltipText={setTrendTooltipText}
            onClickSVG={onClickSVG}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
