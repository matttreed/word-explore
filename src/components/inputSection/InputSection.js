import { useEffect, useState } from 'react';
import drawSVG from '../../d3/drawTrajectory';
import './InputSection.css';

function InputSection(props) {
  const {
    poem, 
    setInput, 
    input,
    VectorHandler, 
    data, 
    setData, 
    setTooltipText, 
    onClickSVG, 
    reRenderSVG,
    trendInput,
    setTrendInput,
    trendWords,
    setTrendWords
  } = props;

  const setVectors = () => {
    const v = [];
    poem.toLowerCase()
      .replace( /\n/g, " " )
      .split(" ")
      .filter(s => s.length > 0)
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
    drawSVG("Trajectory-svg", v, setTooltipText)
  }

  const handleTrendWords = () => {
    trendWords.push(trendInput);
    setTrendWords(trendWords);
    setTrendInput("");
  }

  const getTrendWordBubbles = () => {
    return trendWords.map((word, i) => {
      return (
        <button
          className='Trend-word-button'
          key={i}
          onClick={() => {
            console.log(trendWords)
            trendWords.splice(i, 1);
            setTrendWords(trendWords);
            console.log(trendWords)
          }}
        >
          {word}
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
        <button 
          className='Save-button'
          onClick={setVectors}
        >
          Visualize
        </button>
        <div style={{height: "30px"}}/>
        <h1>
          Comparisons
        </h1>
        <p>
          Want to see trends over the length of your prose? Use the following interface to add words.
        </p>
        <div className='Trend-container'>
          <input
            className='Trend-input' 
            onChange={e => setTrendInput(e.target.value)} 
            placeholder={"enter poem here"}
            value={trendInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
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
    </div>
  );
}

export default InputSection;