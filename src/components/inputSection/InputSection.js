import { useEffect, useState } from 'react';
import drawSVG from '../../d3/drawTrajectory';
import drawTrend from '../../d3/drawTrend';
import './InputSection.css';
import * as d3 from "d3";
import drawSupPoints from '../../d3/drawSupPoint';
import cursor from "../../images/cursor.png";
import search from "../../images/search.webp";
import selectPoint from '../../d3/selectPoint';

function InputSection(props) {
  const {
    poem, 
    setInput, 
    input,
    VectorHandler, 
    data, 
    setData, 
    setTooltipText, 
    setTrendTooltipText,
    onClickSVG, 
    reRenderSVG,
    trendInput,
    setTrendInput,
    trendWords,
    setTrendWords,
    useCosine,
    setUseCosine,
    selectingPoint,
    setSelectingPoint
  } = props;


  const [errorMessage, setErrorMessage] = useState("");
  const [numTrendWords, setNumTrendWords] = useState(0);

  const handleCursorClick = () => {
    if (trendWords.length >= 9) {
      setErrorMessage("Sorry, you can only look at 9 trend words at a time.");
      return;
    }
    setSelectingPoint(true);
    // selectPoint()
  }

  const handleTrendWords = () => {
    const vec = VectorHandler.getVecForWord(trendInput)
    if (!vec) {
      setErrorMessage("Sorry, we could not find '" + trendInput + "' in our dictionary");
      return;
    }
    if (trendInput.length == 0) {
      return;
    }
    if (trendWords.length >= 9) {
      setErrorMessage("Sorry, you can only look at 9 trend words at a time.");
      return;
    }
    setErrorMessage("");
    trendWords.push({
      word: trendInput,
      vector: vec
    });
    setTrendWords(trendWords);
    setTrendInput("");
    setNumTrendWords(trendWords.length)
    drawSupPoints(trendWords, setTooltipText)
  }

  const getTrendWordBubbles = () => {
    return trendWords.map((word, i) => {
      return (
        <button
          className='Trend-word-button'
          key={i}
          onClick={() => {
            trendWords.splice(i, 1);
            setTrendWords(trendWords);
            setNumTrendWords(trendWords.length)
            drawSupPoints(trendWords, setTooltipText)
          }}
          // style={{backgroundColor: d3.schemeSet1[i % 9]}}
          style={{
            borderColor: d3.schemeSet1[i % 9],
            borderWidth: 2,
            color: "black",
            backgroundColor: d3.schemePastel1[i % 9]
          }}
        >
          {word.word}
        </ button>
      )
    })
  }

  return (
    <div className="Main-container">
      <div className="Vertical-container">
        <p>{!VectorHandler ? "loading vectors...": "2-dimensional word-vectors loaded"}</p>
        <h1>
          Welcome to Poem Vectorizer
        </h1>
        <p>
          This project looks at how we can use word vectors aesthetically to analyze poems and 
          to better understand the word vectors themselves. 
        </p>
        <textarea 
          className='Text-input' 
          onChange={e => setInput(e.target.value)} 
          placeholder={"enter poem here"}
          value={input}
        ></textarea>
        <div style={{height: "30px"}}/>
        <div className='Comparisons-container'>
          <h1>
            Comparisons
          </h1>
          <p>
            Want to see trends over the length of your prose? Use the following interface to add words.
          </p>
          <div className='Distance-container'>
            <button 
              className="Distance-button" 
              style={!useCosine ? {} : {backgroundColor: "#BFACE2"}}
              onClick={() => setUseCosine(false)}
            >
              Euclidean Distance
            </button>
            <button 
              className="Distance-button" 
              style={useCosine ? {} : {backgroundColor: "#BFACE2"}}
              onClick={() => setUseCosine(true)}
            >
              Cosine Distance
            </button>
          </div>
          {errorMessage && (<p style={{color: "red"}}>
            {errorMessage}
          </p>)}
          <div className='Trend-container'>
            <img 
              src={cursor} 
              className="Cursor-button" 
              onClick={handleCursorClick}
            />
            <input
              className='Trend-input' 
              onChange={e => {
                if (e.target.value.search(/^[a-zA-Z0-9]+$/) !== -1 || !e.target.value.length) {
                  setTrendInput(e.target.value)
                }
              }} 
              placeholder={"enter word here"}
              value={trendInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === " ") {
                  handleTrendWords()
                }
              }}
            ></input>
          {/* <button 
            className='Trend-button'
            onClick={handleTrendWords}
          > */}
            {/* Use */}
          {/* </button> */}
            {getTrendWordBubbles()}
        </div>
        </div>
        {/* <button 
          className='Save-button'
          onClick={setVectors}
        >
          Visualize
        </button> */}
      </div>
    </div>
  );
}

export default InputSection;